import React, { useState, useEffect } from 'react';

declare global {
    interface Window {
        lucide: any;
    }
}

interface Client {
    id: string;
    name: string;
    company: string;
    contact: string;
    email: string;
    phone: string;
    status: 'active' | 'follow-up' | 'prospect' | 'lead';
    lastContact: string;
    value: string;
    type: string;
    initials: string;
}

const CrmManagement: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState('Admin');
    const [clients, setClients] = useState<Client[]>([
        {
            id: '1',
            name: 'Acme Corporation',
            company: 'Enterprise',
            contact: 'John Smith',
            email: 'john@acme.com',
            phone: '+1 (555) 123-4567',
            status: 'active',
            lastContact: '2023-11-15',
            value: '$12,500',
            type: 'Enterprise',
            initials: 'AC'
        },
        {
            id: '2',
            name: 'Global Tech',
            company: 'Enterprise',
            contact: 'Sarah Johnson',
            email: 'sarah@globaltech.com',
            phone: '+1 (555) 987-6543',
            status: 'follow-up',
            lastContact: '2023-11-10',
            value: '$8,200',
            type: 'Enterprise',
            initials: 'GT'
        },
        {
            id: '3',
            name: 'Mega Networks',
            company: 'Business',
            contact: 'Michael Brown',
            email: 'michael@meganet.com',
            phone: '+1 (555) 456-7890',
            status: 'active',
            lastContact: '2023-11-18',
            value: '$15,600',
            type: 'Business',
            initials: 'MN'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const [newClient, setNewClient] = useState({
        name: '',
        email: '',
        company: '',
        contact: '',
        phone: '',
        status: 'active' as const
    });

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            window.location.href = '/pages/auth/login.html';
        }

        const user = localStorage.getItem('currentUser');
        if (user) {
            setCurrentUser(user);
        }

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [isSidebarOpen, isAddModalOpen, isDetailModalOpen]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = '/index.html';
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleAddClient = (e: React.FormEvent) => {
        e.preventDefault();
        const client: Client = {
            id: Math.random().toString(36).substr(2, 9),
            ...newClient,
            lastContact: new Date().toISOString().split('T')[0],
            value: '$0',
            type: 'Lead',
            initials: newClient.name.split(' ').map(n => n[0]).join('').toUpperCase().substr(0, 2)
        };
        setClients([...clients, client]);
        setIsAddModalOpen(false);
        setNewClient({ name: '', email: '', company: '', contact: '', phone: '', status: 'active' });
        alert(`Client ${client.name} has been added successfully!`);
    };

    const handleDeleteClient = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete client ${name}?`)) {
            setClients(clients.filter(c => c.id !== id));
            alert('Client has been deleted!');
        }
    };

    const handleViewClient = (client: Client) => {
        setSelectedClient(client);
        setIsDetailModalOpen(true);
    };

    const filteredClients = clients.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="bg-gray-50 min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <button onClick={toggleSidebar} className="md:hidden mr-4 p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
                                <i data-lucide="menu" className="h-6 w-6"></i>
                            </button>
                            <div className="flex-shrink-0 flex items-center">
                                <img src="../../assets/2.png" alt="Echoes Software Technologies" width="150" height="40" />
                            </div>
                        </div>
                        <nav className="hidden md:flex space-x-2">
                            <a href="/pages/admin/admin-dashboard.html" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 rounded-full transition-colors">
                                <i data-lucide="home" className="h-4 w-4 inline mr-2" /> Home
                            </a>
                            <a href="/pages/admin/admin-dashboard.html" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 rounded-full transition-colors">
                                <i data-lucide="grid" className="h-4 w-4 inline mr-2" /> Dashboard
                            </a>
                            <a href="/pages/admin/crm-management.html" className="px-4 py-2 text-sm font-medium bg-brand-blue text-white rounded-full transition-colors">
                                <i data-lucide="users" className="h-4 w-4 inline mr-2" /> CRM
                            </a>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:block text-sm text-gray-600">
                                Welcome, <span className="font-medium text-brand-blue">{currentUser}</span>
                            </div>
                            <button onClick={handleLogout} className="hidden md:flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition-colors">
                                <i data-lucide="log-out" className="h-4 w-4" /> <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`w-64 bg-white border-r border-gray-200 min-h-screen fixed md:static transition-transform duration-300 ease-in-out z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                    <div className="p-4 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-4 md:hidden">
                            <button onClick={toggleSidebar} className="p-2 rounded-full text-gray-700 hover:bg-gray-100">
                                <i data-lucide="x" className="h-5 w-5" />
                            </button>
                        </div>
                        <nav className="flex-1">
                            <a href="/pages/admin/crm-management.html" className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-brand-blue rounded-full">
                                <i data-lucide="users" className="h-5 w-5" /> <span>CRM Management</span>
                            </a>
                            <a href="/pages/admin/attendance-management.html" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                                <i data-lucide="calendar" className="h-5 w-5" /> <span>Attendance Management</span>
                            </a>
                            <a href="/pages/admin/employee-management.html" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                                <i data-lucide="user" className="h-5 w-5" /> <span>Employee Management</span>
                            </a>
                            <a href="/pages/auth/password-manager.html" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                                <i data-lucide="key" className="h-5 w-5" /> <span>Password Manager</span>
                            </a>
                        </nav>
                        <div className="pt-4 border-t border-gray-200">
                            <div className="p-4 bg-gray-50 rounded-2xl mb-4">
                                <div className="text-sm font-medium text-gray-900">{currentUser}</div>
                                <div className="text-xs text-gray-600">Logged in as admin</div>
                            </div>
                            <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-full transition-colors">
                                <i data-lucide="log-out" className="h-5 w-5" /> <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"></div>}

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">CRM Management</h1>
                            <button onClick={() => setIsAddModalOpen(true)} className="bg-brand-blue text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors">
                                Add New Client
                            </button>
                        </div>

                        {/* CRM Overview Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            {[
                                { val: '128', label: 'Total Clients', icon: 'users', color: 'bg-blue-100 text-brand-blue' },
                                { val: '24', label: 'New This Month', icon: 'trending-up', color: 'bg-green-100 text-green-600' },
                                { val: '$42.8K', label: 'Monthly Revenue', icon: 'dollar-sign', color: 'bg-yellow-100 text-yellow-600' },
                                { val: '96%', label: 'Satisfaction', icon: 'zap', color: 'bg-purple-100 text-purple-600' },
                            ].map((card, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                    <div className="flex items-center">
                                        <div className={`w-10 h-10 ${card.color} rounded-full flex items-center justify-center mr-3`}>
                                            <i data-lucide={card.icon} className="h-6 w-6"></i>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">{card.val}</p>
                                            <p className="text-sm text-gray-600">{card.label}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Client Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                                <h2 className="text-xl font-semibold text-gray-900">Client List</h2>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search clients..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                                        />
                                        <i data-lucide="search" className="absolute right-4 top-2.5 h-5 w-5 text-gray-400"></i>
                                    </div>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="active">Active</option>
                                        <option value="follow-up">Follow-up</option>
                                        <option value="prospect">Prospect</option>
                                        <option value="lead">Lead</option>
                                    </select>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredClients.map(client => (
                                            <tr key={client.id} onClick={() => handleViewClient(client)} className="cursor-pointer hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold">
                                                            {client.initials}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                                            <div className="text-sm text-gray-500">{client.company}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{client.contact}</div>
                                                    <div className="text-sm text-gray-500">{client.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${client.status === 'active' ? 'bg-green-100 text-green-800' :
                                                        client.status === 'follow-up' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {client.status.charAt(0) + client.status.slice(1).replace('-', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.lastContact}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.value}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {client.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button onClick={(e) => { e.stopPropagation(); alert('Edit Client ID: ' + client.id); }} className="text-brand-blue hover:text-blue-700 mr-3">Edit</button>
                                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteClient(client.id, client.name); }} className="text-red-600 hover:text-red-900">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Add Client Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Add New Client</h3>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <i data-lucide="x" className="h-6 w-6"></i>
                                </button>
                            </div>
                            <form onSubmit={handleAddClient} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                                    <input required value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" required value={newClient.email} onChange={e => setNewClient({ ...newClient, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                    <input required value={newClient.company} onChange={e => setNewClient({ ...newClient, company: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input type="tel" value={newClient.phone} onChange={e => setNewClient({ ...newClient, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                                    <input required value={newClient.contact} onChange={e => setNewClient({ ...newClient, contact: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select value={newClient.status} onChange={e => setNewClient({ ...newClient, status: e.target.value as any })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue">
                                        <option value="active">Active</option>
                                        <option value="prospect">Prospect</option>
                                        <option value="lead">Lead</option>
                                        <option value="follow-up">Follow-up</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-brand-blue text-white rounded-full hover:bg-blue-700">Add Client</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Client Details Modal */}
            {isDetailModalOpen && selectedClient && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Client Details</h3>
                                <button onClick={() => setIsDetailModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <i data-lucide="x" className="h-6 w-6"></i>
                                </button>
                            </div>
                            <div className="space-y-8">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-20 w-20 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-2xl mr-6 shadow-lg">
                                        {selectedClient.initials}
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-gray-900">{selectedClient.name}</h4>
                                        <p className="text-gray-600 text-lg">{selectedClient.company}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-gray-50 p-6 rounded-2xl">
                                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contact Information</h5>
                                        <div className="space-y-3">
                                            <div className="flex justify-between"><span className="text-gray-500">Name:</span> <span className="font-semibold">{selectedClient.contact}</span></div>
                                            <div className="flex justify-between"><span className="text-gray-500">Email:</span> <span className="font-semibold text-brand-blue">{selectedClient.email}</span></div>
                                            <div className="flex justify-between"><span className="text-gray-500">Phone:</span> <span className="font-semibold">{selectedClient.phone}</span></div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-2xl">
                                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Client Intelligence</h5>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Status:</span>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${selectedClient.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>{selectedClient.status.toUpperCase()}</span>
                                            </div>
                                            <div className="flex justify-between"><span className="text-gray-500">Type:</span> <span className="font-semibold">{selectedClient.type}</span></div>
                                            <div className="flex justify-between"><span className="text-gray-500">Value:</span> <span className="font-semibold text-green-600">{selectedClient.value}</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-2xl">
                                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Recent Activity Timeline</h5>
                                    <div className="space-y-4">
                                        {[
                                            { text: 'Contract renewal discussion', time: '2 days ago' },
                                            { text: 'Project completion milestone', time: '1 week ago' },
                                            { text: 'Initial consultation strategy', time: '1 month ago' },
                                        ].map((act, i) => (
                                            <div key={i} className="flex items-start">
                                                <div className="w-2.5 h-2.5 bg-brand-blue rounded-full mt-1.5 mr-4 shadow-sm"></div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">{act.text}</p>
                                                    <p className="text-xs text-gray-500">{act.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button onClick={() => setIsDetailModalOpen(false)} className="px-6 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50">Close</button>
                                    <button onClick={() => { setIsDetailModalOpen(false); setIsAddModalOpen(true); }} className="px-6 py-2 bg-brand-blue text-white rounded-full hover:bg-blue-700">Edit Client</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrmManagement;
