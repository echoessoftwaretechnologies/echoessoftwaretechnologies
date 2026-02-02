import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, MapPin, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface Branch {
    id: string;
    name: string;
    description: string;
    location: string;
    manager: string;
    employees: number;
    status: 'ACTIVE' | 'INACTIVE';
}

const BranchManagement: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        manager: '',
        employees: 0,
        status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE'
    });

    const [branches, setBranches] = useState<Branch[]>([
        {
            id: '1',
            name: 'Head Office',
            description: 'Main corporate office',
            location: 'Mumbai, Maharashtra',
            manager: 'Rajesh Kumar',
            employees: 45,
            status: 'ACTIVE'
        },
        {
            id: '2',
            name: 'Delhi Branch',
            description: 'Northern region office',
            location: 'New Delhi, Delhi',
            manager: 'Priya Sharma',
            employees: 32,
            status: 'ACTIVE'
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

    const totalBranches = branches.length;
    const totalEmployees = branches.reduce((sum, b) => sum + b.employees, 0);
    const activeBranches = branches.filter(b => b.status === 'ACTIVE').length;
    const growthRate = 75;

    const filteredBranches = branches.filter(branch => {
        const matchesSearch = branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            branch.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All Status' || branch.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            location: '',
            manager: '',
            employees: 0,
            status: 'ACTIVE'
        });
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newBranch: Branch = {
            id: Date.now().toString(),
            ...formData
        };
        setBranches([...branches, newBranch]);
        setShowAddModal(false);
        resetForm();
        setNotification({ type: 'success', message: 'Branch added successfully!' });
    };

    const handleEdit = (branch: Branch) => {
        setSelectedBranch(branch);
        setFormData({
            name: branch.name,
            description: branch.description,
            location: branch.location,
            manager: branch.manager,
            employees: branch.employees,
            status: branch.status
        });
        setShowEditModal(true);
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedBranch) {
            setBranches(branches.map(b => b.id === selectedBranch.id ? { ...selectedBranch, ...formData } : b));
            setShowEditModal(false);
            setSelectedBranch(null);
            resetForm();
            setNotification({ type: 'success', message: 'Branch updated successfully!' });
        }
    };

    const BranchForm = ({ onSubmit, buttonText }: { onSubmit: (e: React.FormEvent) => void, buttonText: string }) => (
        <form onSubmit={onSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Branch Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500" required />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500" required />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                    <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500" required />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Manager</label>
                    <input type="text" value={formData.manager} onChange={(e) => setFormData({ ...formData, manager: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500" required />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Employees</label>
                    <input type="number" value={formData.employees} onChange={(e) => setFormData({ ...formData, employees: Number(e.target.value) })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500" required />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as 'ACTIVE' | 'INACTIVE' })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500">
                        <option>ACTIVE</option>
                        <option>INACTIVE</option>
                    </select>
                </div>
            </div>
            <button type="submit" className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl">{buttonText}</button>
        </form>
    );

    return (
        <AdminLayout title="Branch Management" subtitle="Location Intelligence">
            <div className={`space-y-8 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {notification && (
                    <div className={`fixed top-24 right-8 z-50 px-6 py-4 rounded-2xl shadow-lg animate-slide-in-right ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        <p className="font-bold">{notification.message}</p>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-black tracking-tight">Branch Management</h2>
                    <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
                        <Plus className="w-5 h-5" />
                        Add New Branch
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Branches', value: totalBranches.toString(), icon: '🏢', bgColor: 'bg-blue-50', iconBg: 'bg-blue-100', textColor: 'text-blue-600' },
                        { label: 'Total Employees', value: totalEmployees.toString(), icon: '👥', bgColor: 'bg-green-50', iconBg: 'bg-green-100', textColor: 'text-green-600' },
                        { label: 'Active Branches', value: activeBranches.toString(), icon: '📍', bgColor: 'bg-yellow-50', iconBg: 'bg-yellow-100', textColor: 'text-yellow-600' },
                        { label: 'Growth Rate', value: `${growthRate}%`, icon: '📈', bgColor: 'bg-purple-50', iconBg: 'bg-purple-100', textColor: 'text-purple-600' }
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

                <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
                    <div className="p-8 border-b border-gray-200">
                        <h3 className="text-2xl font-black mb-6">Branch List</h3>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="text" placeholder="Search branches..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent" />
                            </div>
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-500 font-semibold">
                                <option>All Status</option><option>ACTIVE</option><option>INACTIVE</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Branch</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Manager</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Employees</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredBranches.map((branch) => (
                                    <tr key={branch.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center"><span className="text-blue-600 font-black text-sm">🏢</span></div>
                                                <div><div className="font-bold text-navy-900">{branch.name}</div><div className="text-sm text-gray-500">{branch.description}</div></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"><div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><MapPin className="w-4 h-4 text-gray-400" />{branch.location}</div></td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">{branch.manager}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{branch.employees}</td>
                                        <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${branch.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{branch.status}</span></td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleEdit(branch)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="Edit"><Edit2 className="w-4 h-4 text-blue-600" /></button>
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
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-gradient-to-r from-brand-blue-600 to-indigo-600 p-6 text-white flex justify-between items-center">
                            <h3 className="text-2xl font-black">Add New Branch</h3>
                            <button onClick={() => { setShowAddModal(false); resetForm(); }} className="p-2 hover:bg-white/20 rounded-lg transition-colors"><X className="w-6 h-6" /></button>
                        </div>
                        <BranchForm onSubmit={handleAdd} buttonText="Add Branch" />
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-gradient-to-r from-brand-blue-600 to-indigo-600 p-6 text-white flex justify-between items-center">
                            <h3 className="text-2xl font-black">Edit Branch</h3>
                            <button onClick={() => { setShowEditModal(false); setSelectedBranch(null); resetForm(); }} className="p-2 hover:bg-white/20 rounded-lg transition-colors"><X className="w-6 h-6" /></button>
                        </div>
                        <BranchForm onSubmit={handleUpdate} buttonText="Update Branch" />
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default BranchManagement;
