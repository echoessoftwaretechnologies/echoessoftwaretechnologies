import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Menu, X, Home, FileText, Users, Calendar, User, Key, LogOut, Download, Plus, Trash2
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    price: number;
}

const InvoiceGenerator: React.FC = () => {
    const navigate = useNavigate();
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<string>('Admin');

    // Form State
    const [formData, setFormData] = useState({
        companyName: 'ECHOES SOFTWARE TECHNOLOGIES',
        companyAddress: '',
        companyCity: '',
        companyZip: '',
        companyCountry: '',
        companyEmail: '',
        companyPhone: '',
        companyTaxId: '637-96X-XXX',
        companyGstNo: '',
        clientName: '',
        clientAddress: '',
        clientCity: '',
        clientZip: '',
        clientCountry: '',
        clientEmail: '',
        clientPhone: '',
        invoiceNumber: 'INV-001',
        invoiceDate: new Date().toISOString().split('T')[0],
        purchaseOrder: '',
        projectRef: '',
        currency: 'USD',
        taxRate: 10,
        discount: 0,
        paymentTerms: 'net_30',
        notes: '',
        terms: '',
        bankDetails: ''
    });

    const [items, setItems] = useState<InvoiceItem[]>([
        { id: Math.random().toString(36).substr(2, 9), description: '', quantity: 1, price: 0 }
    ]);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        if (loggedIn !== 'true') {
            // navigate('/login'); // Temporarily commented to allow development without auth
        }
        const user = localStorage.getItem('currentUser');
        if (user) setCurrentUser(user);
    }, [navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const addItem = () => {
        setItems(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), description: '', quantity: 1, price: 0 }]);
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    const calculateSubtotal = () => {
        return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    };

    const calculateDiscount = (subtotal: number) => {
        return subtotal * (formData.discount / 100);
    };

    const calculateTax = (discountedSubtotal: number) => {
        return discountedSubtotal * (formData.taxRate / 100);
    };

    const generatePDF = async () => {
        if (!invoiceRef.current) return;

        const canvas = await html2canvas(invoiceRef.current, {
            scale: 2,
            useCORS: true,
            logging: false
        } as any);

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save('echoes_invoice.pdf');
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const getDueDate = () => {
        if (!formData.invoiceDate) return '';
        const date = new Date(formData.invoiceDate);
        let daysToAdd = 0;
        switch (formData.paymentTerms) {
            case 'due_on_receipt': daysToAdd = 0; break;
            case 'net_15': daysToAdd = 15; break;
            case 'net_30': daysToAdd = 30; break;
            case 'net_60': daysToAdd = 60; break;
            case 'net_90': daysToAdd = 90; break;
        }
        date.setDate(date.getDate() + daysToAdd);
        return formatDate(date.toISOString().split('T')[0]);
    };

    const currencySymbols: Record<string, string> = { 'USD': '$', 'EUR': '€', 'GBP': '£', 'INR': '₹' };
    const currencySymbol = currencySymbols[formData.currency] || '$';

    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscount(subtotal);
    const discountedSubtotal = subtotal - discountAmount;
    const taxAmount = calculateTax(discountedSubtotal);
    const total = discountedSubtotal + taxAmount;

    return (
        <div className="bg-gray-50 min-h-screen font-pop">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden mr-4 p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
                                <Menu className="h-6 w-6" />
                            </button>
                            <div className="flex-shrink-0 flex items-center">
                                <img src="/assets/2.png" alt="Echoes" width="150" height="40" />
                            </div>
                        </div>
                        <nav className="hidden md:flex space-x-2">
                            <Link to="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex items-center">
                                <Home className="h-4 w-4 mr-2" /> Home
                            </Link>
                            <span className="px-4 py-2 text-sm font-medium bg-[#1864ff] text-white rounded-full transition-colors flex items-center">
                                <FileText className="h-4 w-4 mr-2" /> Invoice Generator
                            </span>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:block text-sm text-gray-600">
                                Welcome, <span className="font-medium text-[#1864ff]">{currentUser}</span>
                            </div>
                            <button onClick={handleLogout} className="hidden md:flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition-colors">
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`w-64 bg-white border-r border-gray-200 min-h-screen fixed md:static z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-4 md:hidden">
                            <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-full text-gray-700 hover:bg-gray-100">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <nav className="space-y-1">
                            {[
                                { name: 'CRM Management', icon: Users, path: '/crm' },
                                { name: 'Attendance Management', icon: Calendar, path: '/attendance' },
                                { name: 'Employee Management', icon: User, path: '/employees' },
                                { name: 'Password Manager', icon: Key, path: '/passwords' },
                                { name: 'Invoice Generator', icon: FileText, path: '/invoice-generator', active: true }
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-full transition-colors ${item.active ? 'bg-[#1864ff] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-8 pt-4 border-t border-gray-200">
                            <div className="p-4 bg-gray-50 rounded-2xl mb-4">
                                <div className="text-sm font-medium text-gray-900">{currentUser}</div>
                                <div className="text-xs text-gray-600">Logged in as admin</div>
                            </div>
                            <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-full transition-colors">
                                <LogOut className="h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {isSidebarOpen && <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <h1 className="text-3xl font-bold text-gray-900">Invoice Generator</h1>
                            <button onClick={generatePDF} className="bg-[#1864ff] text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                                <Download className="h-5 w-5 mr-2" />
                                Download Invoice PDF
                            </button>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            {/* Form Section */}
                            <div className="xl:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Invoice Details</h2>

                                <div className="space-y-6">
                                    {/* Company Info */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Information</label>
                                        <input type="text" id="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Company Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none mb-2" />
                                        <input type="text" id="companyAddress" value={formData.companyAddress} onChange={handleInputChange} placeholder="Company Address" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none mb-2" />
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            <input type="text" id="companyCity" value={formData.companyCity} onChange={handleInputChange} placeholder="City" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none" />
                                            <input type="text" id="companyZip" value={formData.companyZip} onChange={handleInputChange} placeholder="ZIP" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none" />
                                        </div>
                                        <input type="text" id="companyCountry" value={formData.companyCountry} onChange={handleInputChange} placeholder="Country" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none mb-2" />
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            <input type="email" id="companyEmail" value={formData.companyEmail} onChange={handleInputChange} placeholder="Email" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none" />
                                            <input type="tel" id="companyPhone" value={formData.companyPhone} onChange={handleInputChange} placeholder="Phone" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none" />
                                        </div>
                                        <input type="text" id="companyTaxId" value={formData.companyTaxId} onChange={handleInputChange} placeholder="Tax ID" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none mb-2" />
                                        <input type="text" id="companyGstNo" value={formData.companyGstNo} onChange={handleInputChange} placeholder="GST Number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none" />
                                    </div>

                                    {/* Bill To */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Bill To</label>
                                        <input type="text" id="clientName" value={formData.clientName} onChange={handleInputChange} placeholder="Client Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none mb-2" />
                                        <input type="text" id="clientAddress" value={formData.clientAddress} onChange={handleInputChange} placeholder="Client Address" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none mb-2" />
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            <input type="text" id="clientCity" value={formData.clientCity} onChange={handleInputChange} placeholder="City" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none" />
                                            <input type="text" id="clientZip" value={formData.clientZip} onChange={handleInputChange} placeholder="ZIP" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none" />
                                        </div>
                                        <input type="text" id="clientCountry" value={formData.clientCountry} onChange={handleInputChange} placeholder="Country" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none mb-2" />
                                        <div className="grid grid-cols-2 gap-2">
                                            <input type="email" id="clientEmail" value={formData.clientEmail} onChange={handleInputChange} placeholder="Email" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none" />
                                            <input type="tel" id="clientPhone" value={formData.clientPhone} onChange={handleInputChange} placeholder="Phone" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] focus:border-transparent outline-none" />
                                        </div>
                                    </div>

                                    {/* Invoice Meta */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                                            <input type="text" id="invoiceNumber" value={formData.invoiceNumber} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                            <input type="date" id="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] outline-none" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Order</label>
                                            <input type="text" id="purchaseOrder" value={formData.purchaseOrder} onChange={handleInputChange} placeholder="PO Number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Reference</label>
                                            <input type="text" id="projectRef" value={formData.projectRef} onChange={handleInputChange} placeholder="Project Ref" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] outline-none" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2 text-xs">Currency</label>
                                            <select id="currency" value={formData.currency} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] outline-none">
                                                <option value="USD">USD ($)</option>
                                                <option value="EUR">EUR (€)</option>
                                                <option value="GBP">GBP (£)</option>
                                                <option value="INR">INR (₹)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2 text-xs">Tax %</label>
                                            <input type="number" id="taxRate" value={formData.taxRate} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2 text-xs">Disc %</label>
                                            <input type="number" id="discount" value={formData.discount} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] outline-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
                                        <select id="paymentTerms" value={formData.paymentTerms} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] outline-none">
                                            <option value="due_on_receipt">Due on Receipt</option>
                                            <option value="net_15">Net 15 Days</option>
                                            <option value="net_30">Net 30 Days</option>
                                            <option value="net_60">Net 60 Days</option>
                                            <option value="net_90">Net 90 Days</option>
                                        </select>
                                    </div>

                                    {/* Items */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
                                        <div className="space-y-2">
                                            {items.map((item) => (
                                                <div key={item.id} className="grid grid-cols-12 gap-2">
                                                    <input
                                                        type="text"
                                                        value={item.description}
                                                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                                        placeholder="Description"
                                                        className="col-span-5 p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] outline-none"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                                                        placeholder="Qty"
                                                        className="col-span-2 p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] outline-none"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={item.price}
                                                        onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                                                        placeholder="Price"
                                                        className="col-span-3 p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] outline-none"
                                                    />
                                                    <button onClick={() => removeItem(item.id)} className="col-span-2 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={addItem} className="mt-3 text-[#1864ff] hover:text-blue-700 font-medium flex items-center text-sm">
                                            <Plus className="h-4 w-4 mr-1" /> Add Item
                                        </button>
                                    </div>

                                    <textarea id="notes" value={formData.notes} onChange={handleInputChange} placeholder="Additional Notes..." rows={2} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] outline-none" />
                                    <textarea id="terms" value={formData.terms} onChange={handleInputChange} placeholder="Terms & Conditions..." rows={2} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] outline-none" />
                                    <textarea id="bankDetails" value={formData.bankDetails} onChange={handleInputChange} placeholder="Bank Details..." rows={2} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1864ff] outline-none" />
                                </div>
                            </div>

                            {/* Preview Section */}
                            <div className="xl:col-span-2">
                                <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6 no-print">Invoice Preview</h2>

                                    {/* The Actual Invoice to Print */}
                                    <div ref={invoiceRef} className="mx-auto bg-white" style={{ width: '210mm', minHeight: '297mm', padding: '15mm' }}>
                                        <div className="bg-[#1864ff] text-white p-8 -mx-[15mm] -mt-[15mm] mb-10 flex justify-between items-center">
                                            <div>
                                                <h1 className="text-4xl font-bold tracking-tight">INVOICE</h1>
                                                <p className="text-xl mt-2 font-medium">{formData.companyName}</p>
                                                {formData.companyGstNo && <p className="text-sm opacity-90 mt-1">GST NO: {formData.companyGstNo}</p>}
                                            </div>
                                            <div className="text-right">
                                                <img src="/assets/inv-logo.png" alt="Echoes" width="120" className="mb-4 brightness-0 invert inline-block" />
                                                <div className="text-sm opacity-90 leading-relaxed">
                                                    <p>{formData.companyAddress}</p>
                                                    <p>{formData.companyCity}{formData.companyCity && formData.companyZip ? ', ' : ''}{formData.companyZip}</p>
                                                    <p>{formData.companyCountry}</p>
                                                    <p>{formData.companyEmail}</p>
                                                    <p>{formData.companyPhone}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-12 mb-10">
                                            <div>
                                                <h3 className="text-[#1864ff] font-bold uppercase tracking-wider text-xs border-b-2 border-blue-50 pb-2 mb-4">Bill To</h3>
                                                <p className="font-bold text-xl text-gray-900 mb-2">{formData.clientName || 'Client Name'}</p>
                                                <div className="text-sm text-gray-600 leading-relaxed">
                                                    <p>{formData.clientAddress}</p>
                                                    <p>{formData.clientCity}{formData.clientCity && formData.clientZip ? ', ' : ''}{formData.clientZip}</p>
                                                    <p>{formData.clientCountry}</p>
                                                    <div className="mt-3">
                                                        <p>{formData.clientEmail}</p>
                                                        <p>{formData.clientPhone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-[#1864ff] font-bold uppercase tracking-wider text-xs border-b-2 border-blue-50 pb-2 mb-4 text-right">Invoice Details</h3>
                                                <div className="space-y-2 text-sm">
                                                    {[
                                                        { label: 'Invoice Number', value: formData.invoiceNumber },
                                                        { label: 'Date', value: formatDate(formData.invoiceDate) },
                                                        { label: 'Due Date', value: getDueDate(), highlight: true },
                                                        { label: 'Purchase Order', value: formData.purchaseOrder },
                                                        { label: 'Project Ref', value: formData.projectRef },
                                                        { label: 'Currency', value: formData.currency },
                                                        { label: 'Tax ID', value: formData.companyTaxId }
                                                    ].filter(item => item.value).map((item, idx) => (
                                                        <div key={idx} className="flex justify-between">
                                                            <span className="text-gray-500 font-medium">{item.label}:</span>
                                                            <span className={`font-semibold ${item.highlight ? 'text-red-600' : 'text-gray-900'}`}>{item.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-10">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="bg-gray-50 border-y border-gray-100 italic">
                                                        <th className="text-left py-4 px-4 font-bold text-gray-700">Description</th>
                                                        <th className="text-right py-4 px-4 font-bold text-gray-700">Qty</th>
                                                        <th className="text-right py-4 px-4 font-bold text-gray-700">Unit Price</th>
                                                        <th className="text-right py-4 px-4 font-bold text-gray-700">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {items.map((item, idx) => (
                                                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                                            <td className="py-4 px-4 text-gray-800 font-medium">{item.description || 'Item Description'}</td>
                                                            <td className="py-4 px-4 text-right text-gray-600 italic">{item.quantity}</td>
                                                            <td className="py-4 px-4 text-right text-gray-600">{currencySymbol}{item.price.toFixed(2)}</td>
                                                            <td className="py-4 px-4 text-right font-bold text-gray-900">{currencySymbol}{(item.quantity * item.price).toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot className="border-t-2 border-[#1864ff]">
                                                    <tr className="border-b border-gray-50">
                                                        <td colSpan={3} className="py-4 px-4 text-right font-semibold text-gray-600">Subtotal:</td>
                                                        <td className="py-4 px-4 text-right font-bold text-gray-900">{currencySymbol}{subtotal.toFixed(2)}</td>
                                                    </tr>
                                                    {formData.discount > 0 && (
                                                        <tr className="border-b border-gray-50">
                                                            <td colSpan={3} className="py-4 px-4 text-right text-gray-500">Discount ({formData.discount}%):</td>
                                                            <td className="py-4 px-4 text-right font-medium text-green-600">-{currencySymbol}{discountAmount.toFixed(2)}</td>
                                                        </tr>
                                                    )}
                                                    <tr className="border-b border-gray-50">
                                                        <td colSpan={3} className="py-4 px-4 text-right text-gray-500">Tax ({formData.taxRate}%):</td>
                                                        <td className="py-4 px-4 text-right font-medium text-gray-900">{currencySymbol}{taxAmount.toFixed(2)}</td>
                                                    </tr>
                                                    <tr className="bg-blue-50/50">
                                                        <td colSpan={3} className="py-6 px-4 text-right text-xl font-bold text-[#1864ff]">TOTAL ({formData.currency}):</td>
                                                        <td className="py-6 px-4 text-right text-xl font-black text-[#1864ff]">{currencySymbol}{total.toFixed(2)}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>

                                        <div className="grid grid-cols-2 gap-12 mb-10">
                                            <div>
                                                <h3 className="text-[#1864ff] font-bold uppercase tracking-wider text-xs border-b-2 border-blue-50 pb-2 mb-4">Notes</h3>
                                                <p className="text-sm text-gray-600 leading-relaxed italic">{formData.notes}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-[#1864ff] font-bold uppercase tracking-wider text-xs border-b-2 border-blue-50 pb-2 mb-4">Terms & Conditions</h3>
                                                <p className="text-xs text-gray-500 leading-relaxed font-medium">{formData.terms}</p>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 pt-8 mt-10">
                                            <div className="grid grid-cols-2 gap-12">
                                                <div>
                                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center text-sm">
                                                        <div className="w-1 h-4 bg-[#1864ff] mr-2"></div>
                                                        Bank Details
                                                    </h3>
                                                    <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed mb-6 italic">{formData.bankDetails}</p>

                                                    <div className="mt-8">
                                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Scan to Pay</h4>
                                                        <div className="inline-block p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                                            <img src="/assets/upi_scanner.png" alt="UPI" className="w-32 h-32 object-contain" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-end text-sm">
                                                        Authorized Signature
                                                        <div className="w-1 h-4 bg-[#1864ff] ml-2"></div>
                                                    </h3>
                                                    <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/30 h-32 flex items-center justify-center mb-2">
                                                        <img src="/assets/signature.png" alt="Sig" className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all" />
                                                    </div>
                                                    <p className="text-xs text-gray-400 font-medium">Digital Signature Authorized</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-16 pt-8 border-t-2 border-gray-100 text-center">
                                            <p className="text-2xl font-black text-gray-900 mb-2 italic tracking-tight">Thank you for your business!</p>
                                            <p className="text-sm text-gray-500 font-medium">For inquiries, contact: <span className="text-[#1864ff]">{formData.companyEmail || 'connect@echoess.in'}</span></p>
                                            <p className="text-[10px] text-gray-400 mt-6 uppercase tracking-widest font-bold">Generated by Echoes Software Technologies • www.echoess.in</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Poppins';
                    src: url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
                }
                .font-pop { font-family: 'Poppins', sans-serif; }
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; }
                }
            ` }} />
        </div>
    );
};

export default InvoiceGenerator;
