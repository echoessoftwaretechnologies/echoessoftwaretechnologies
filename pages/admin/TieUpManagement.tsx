import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, AlertTriangle, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface TieUp {
    id: string;
    company: string;
    contact: string;
    type: string;
    status: 'Active' | 'Inactive';
    startDate: string;
    endDate: string;
    expectedRevenue: number;
    actualRevenue: number;
    expiringWarning?: boolean;
}

const TieUpManagement: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTieUp, setSelectedTieUp] = useState<TieUp | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const [formData, setFormData] = useState({
        company: '',
        contact: '',
        type: 'Technology',
        status: 'Active' as 'Active' | 'Inactive',
        startDate: '',
        endDate: '',
        expectedRevenue: 0,
        actualRevenue: 0
    });

    const [tieUps, setTieUps] = useState<TieUp[]>([
        {
            id: '1',
            company: 'Tech Solutions Inc.',
            contact: 'John Davis',
            type: 'Technology',
            status: 'Active',
            startDate: '15/1/2024',
            endDate: '15/1/2025',
            expectedRevenue: 500000,
            actualRevenue: 350000,
            expiringWarning: true
        },
        {
            id: '2',
            company: 'Marketing Pro Ltd.',
            contact: 'Sarah Wilson',
            type: 'Marketing',
            status: 'Active',
            startDate: '1/3/2024',
            endDate: '31/12/2024',
            expectedRevenue: 300000,
            actualRevenue: 280000,
            expiringWarning: true
        }
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

    const totalTieUps = tieUps.length;
    const activeTieUps = tieUps.filter(t => t.status === 'Active').length;
    const expiringTieUps = tieUps.filter(t => t.expiringWarning).length;
    const totalRevenue = tieUps.reduce((sum, t) => sum + t.actualRevenue, 0);

    const filteredTieUps = tieUps.filter(tieUp => {
        const matchesSearch = tieUp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tieUp.contact.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All Status' || tieUp.status === statusFilter;
        const matchesType = typeFilter === 'All Types' || tieUp.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    const resetForm = () => {
        setFormData({
            company: '',
            contact: '',
            type: 'Technology',
            status: 'Active',
            startDate: '',
            endDate: '',
            expectedRevenue: 0,
            actualRevenue: 0
        });
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newTieUp: TieUp = {
            id: Date.now().toString(),
            ...formData
        };
        setTieUps([...tieUps, newTieUp]);
        setShowAddModal(false);
        resetForm();
        setNotification({ type: 'success', message: 'Tie-up added successfully!' });
    };

    const handleEdit = (tieUp: TieUp) => {
        setSelectedTieUp(tieUp);
        setFormData({
            company: tieUp.company,
            contact: tieUp.contact,
            type: tieUp.type,
            status: tieUp.status,
            startDate: tieUp.startDate,
            endDate: tieUp.endDate,
            expectedRevenue: tieUp.expectedRevenue,
            actualRevenue: tieUp.actualRevenue
        });
        setShowEditModal(true);
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedTieUp) {
            setTieUps(tieUps.map(t => t.id === selectedTieUp.id ? { ...selectedTieUp, ...formData } : t));
            setShowEditModal(false);
            setSelectedTieUp(null);
            resetForm();
            setNotification({ type: 'success', message: 'Tie-up updated successfully!' });
        }
    };

    const handleDelete = () => {
        if (selectedTieUp) {
            setTieUps(tieUps.filter(t => t.id !== selectedTieUp.id));
            setShowDeleteModal(false);
            setSelectedTieUp(null);
            setNotification({ type: 'success', message: 'Tie-up deleted successfully!' });
        }
    };

    const openDeleteModal = (tieUp: TieUp) => {
        setSelectedTieUp(tieUp);
        setShowDeleteModal(true);
    };

    const TieUpForm = ({ onSubmit, buttonText }: { onSubmit: (e: React.FormEvent) => void, buttonText: string }) => (
        <form onSubmit={onSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                    <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contact Person</label>
                    <input
                        type="text"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                    >
                        <option>Technology</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                        <option>Consulting</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                    >
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                    <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                    <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Expected Revenue (₹)</label>
                    <input
                        type="number"
                        value={formData.expectedRevenue}
                        onChange={(e) => setFormData({ ...formData, expectedRevenue: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Actual Revenue (₹)</label>
                    <input
                        type="number"
                        value={formData.actualRevenue}
                        onChange={(e) => setFormData({ ...formData, actualRevenue: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                        required
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
                {buttonText}
            </button>
        </form>
    );

    return (
        <AdminLayout title="Tie-ups Management" subtitle="Partnership Intelligence">
            <div className={`space-y-8 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {/* Notification */}
                {notification && (
                    <div className={`fixed top-24 right-8 z-50 px-6 py-4 rounded-2xl shadow-lg animate-slide-in-right ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                        <p className="font-bold">{notification.message}</p>
                    </div>
                )}

                {/* Header with Add Button */}
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-black tracking-tight">Tie-ups Management</h2>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Tie-up
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Tie-ups', value: totalTieUps.toString(), icon: '🤝', bgColor: 'bg-blue-50', iconBg: 'bg-blue-100', textColor: 'text-blue-600' },
                        { label: 'Active Tie-ups', value: activeTieUps.toString(), icon: '📈', bgColor: 'bg-green-50', iconBg: 'bg-green-100', textColor: 'text-green-600' },
                        { label: 'Revenue Generated', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, icon: '💰', bgColor: 'bg-yellow-50', iconBg: 'bg-yellow-100', textColor: 'text-yellow-600' },
                        { label: 'Expiring Soon', value: expiringTieUps.toString(), icon: '📅', bgColor: 'bg-purple-50', iconBg: 'bg-purple-100', textColor: 'text-purple-600' }
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

                {/* Tie-ups List Section */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
                    <div className="p-8 border-b border-gray-200">
                        <h3 className="text-2xl font-black mb-6">Tie-ups List</h3>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="text" placeholder="Search tie-ups..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent" />
                            </div>
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500 font-semibold">
                                <option>All Status</option><option>Active</option><option>Inactive</option>
                            </select>
                            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500 font-semibold">
                                <option>All Types</option><option>Technology</option><option>Marketing</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Company</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Start Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">End Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Revenue</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredTieUps.map((tieUp) => (
                                    <tr key={tieUp.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-brand-blue-100 rounded-xl flex items-center justify-center"><span className="text-brand-blue-600 font-black text-sm">🤝</span></div>
                                                <div><div className="font-bold text-navy-900">{tieUp.company}</div><div className="text-sm text-gray-500">{tieUp.contact}</div></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${tieUp.type === 'Technology' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{tieUp.type}</span></td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${tieUp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{tieUp.status}</span>
                                                {tieUp.expiringWarning && (<div className="flex items-center gap-1 text-yellow-600" title="Expiring Soon"><AlertTriangle className="w-4 h-4" /><span className="text-xs font-bold">Expiring soon</span></div>)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">{tieUp.startDate}</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">{tieUp.endDate}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm"><div className="font-bold text-gray-900">Expected: ₹{(tieUp.expectedRevenue / 100000).toFixed(2)}L</div><div className="font-semibold text-green-600">Actual: ₹{(tieUp.actualRevenue / 100000).toFixed(2)}L</div></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleEdit(tieUp)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="Edit"><Edit2 className="w-4 h-4 text-blue-600" /></button>
                                                <button onClick={() => openDeleteModal(tieUp)} className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4 text-red-600" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-gradient-to-r from-brand-blue-600 to-indigo-600 p-6 text-white flex justify-between items-center">
                            <h3 className="text-2xl font-black">Add New Tie-up</h3>
                            <button onClick={() => { setShowAddModal(false); resetForm(); }} className="p-2 hover:bg-white/20 rounded-lg transition-colors"><X className="w-6 h-6" /></button>
                        </div>
                        <TieUpForm onSubmit={handleAdd} buttonText="Add Tie-up" />
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-gradient-to-r from-brand-blue-600 to-indigo-600 p-6 text-white flex justify-between items-center">
                            <h3 className="text-2xl font-black">Edit Tie-up</h3>
                            <button onClick={() => { setShowEditModal(false); setSelectedTieUp(null); resetForm(); }} className="p-2 hover:bg-white/20 rounded-lg transition-colors"><X className="w-6 h-6" /></button>
                        </div>
                        <TieUpForm onSubmit={handleUpdate} buttonText="Update Tie-up" />
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedTieUp && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
                        <div className="p-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle className="w-8 h-8 text-red-600" /></div>
                            <h3 className="text-2xl font-black text-center mb-2">Delete Tie-up?</h3>
                            <p className="text-gray-600 text-center mb-6">Are you sure you want to delete <strong>{selectedTieUp.company}</strong>? This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button onClick={() => { setShowDeleteModal(false); setSelectedTieUp(null); }} className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-bold transition-all">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default TieUpManagement;
