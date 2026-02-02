import React, { useState, useEffect } from 'react';
import { Plus, FileText, X, TrendingUp, TrendingDown } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface Transaction {
    id: string;
    date: string;
    description: string;
    type: 'Revenue' | 'Expense';
    amount: number;
    category: string;
}

const AccountManagement: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const [formData, setFormData] = useState({
        date: '',
        description: '',
        type: 'Revenue' as 'Revenue' | 'Expense',
        amount: 0,
        category: ''
    });

    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: '1', date: '2026-02-01', description: 'Client Payment - Tech Solutions', type: 'Revenue', amount: 150000, category: 'Sales' },
        { id: '2', date: '2026-02-01', description: 'Office Rent', type: 'Expense', amount: 50000, category: 'Operations' },
        { id: '3', date: '2026-01-30', description: 'Software Licenses', type: 'Expense', amount: 25000, category: 'Technology' },
        { id: '4', date: '2026-01-28', description: 'Consulting Services', type: 'Revenue', amount: 200000, category: 'Services' }
    ]);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const totalRevenue = transactions.filter(t => t.type === 'Revenue').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
    const netProfit = totalRevenue - totalExpenses;
    const totalTransactions = transactions.length;

    const resetForm = () => {
        setFormData({
            date: '',
            description: '',
            type: 'Revenue',
            amount: 0,
            category: ''
        });
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            ...formData
        };
        setTransactions([newTransaction, ...transactions]);
        setShowAddModal(false);
        resetForm();
        setNotification({ type: 'success', message: 'Transaction added successfully!' });
    };

    const handleGenerateReport = () => {
        setNotification({ type: 'success', message: 'Report generated successfully!' });
        console.log('Generating report with transactions:', transactions);
    };

    return (
        <AdminLayout title="Account Management" subtitle="Financial Intelligence">
            <div className={`space-y-8 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {notification && (
                    <div className={`fixed top-24 right-8 z-50 px-6 py-4 rounded-2xl shadow-lg animate-slide-in-right ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        <p className="font-bold">{notification.message}</p>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-black tracking-tight">Account Management</h2>
                    <div className="flex gap-3">
                        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
                            <Plus className="w-5 h-5" />
                            Add Transaction
                        </button>
                        <button onClick={handleGenerateReport} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
                            <FileText className="w-5 h-5" />
                            Generate Report
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, icon: '💰', bgColor: 'bg-green-50', iconBg: 'bg-green-100', textColor: 'text-green-600' },
                        { label: 'Total Expenses', value: `₹${(totalExpenses / 100000).toFixed(1)}L`, icon: '💸', bgColor: 'bg-red-50', iconBg: 'bg-red-100', textColor: 'text-red-600' },
                        { label: 'Net Profit', value: `₹${(netProfit / 100000).toFixed(1)}L`, icon: '📈', bgColor: 'bg-blue-50', iconBg: 'bg-blue-100', textColor: 'text-blue-600' },
                        { label: 'Total Transactions', value: totalTransactions.toString(), icon: '📊', bgColor: 'bg-purple-50', iconBg: 'bg-purple-100', textColor: 'text-purple-600' }
                    ].map((stat, i) => (
                        <div key={i} className={`${stat.bgColor} rounded-3xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.iconBg} rounded-2xl flex items-center justify-center text-2xl`}>{stat.icon}</div>
                            </div>
                            <div className={`text-3xl font-black mb-1 ${stat.textColor}`}>{stat.value}</div>
                            <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8">
                        <h3 className="text-2xl font-black mb-6">Revenue vs Expenses</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-bold text-gray-700">Revenue</span>
                                    <span className="text-sm font-bold text-green-600">₹{(totalRevenue / 100000).toFixed(2)}L</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="bg-green-500 h-3 rounded-full" style={{ width: `${(totalRevenue / (totalRevenue + totalExpenses)) * 100}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-bold text-gray-700">Expenses</span>
                                    <span className="text-sm font-bold text-red-600">₹{(totalExpenses / 100000).toFixed(2)}L</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="bg-red-500 h-3 rounded-full" style={{ width: `${(totalExpenses / (totalRevenue + totalExpenses)) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8">
                        <h3 className="text-2xl font-black mb-6">Financial Summary</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-700">Revenue Growth</div>
                                        <div className="text-xs text-gray-500">vs last month</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-black text-green-600">+15%</div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                        <TrendingDown className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-700">Expense Reduction</div>
                                        <div className="text-xs text-gray-500">vs last month</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-black text-red-600">-8%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
                    <div className="p-8 border-b border-gray-200">
                        <h3 className="text-2xl font-black">Recent Transactions</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">{new Date(transaction.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{transaction.description}</td>
                                        <td className="px-6 py-4"><span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">{transaction.category}</span></td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${transaction.type === 'Revenue' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {transaction.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm font-bold ${transaction.type === 'Revenue' ? 'text-green-600' : 'text-red-600'}`}>
                                                {transaction.type === 'Revenue' ? '+' : '-'}₹{(transaction.amount / 1000).toFixed(2)}K
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl">
                        <div className="sticky top-0 bg-gradient-to-r from-brand-blue-600 to-indigo-600 p-6 text-white flex justify-between items-center">
                            <h3 className="text-2xl font-black">Add New Transaction</h3>
                            <button onClick={() => { setShowAddModal(false); resetForm(); }} className="p-2 hover:bg-white/20 rounded-lg transition-colors"><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                                    <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as 'Revenue' | 'Expense' })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500">
                                        <option>Revenue</option>
                                        <option>Expense</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                    <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Amount (₹)</label>
                                    <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500" required />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl">Add Transaction</button>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AccountManagement;
