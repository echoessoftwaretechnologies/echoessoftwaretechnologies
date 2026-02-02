import React, { useState, useEffect } from 'react';
import {
    Key, Shield, AlertTriangle, RefreshCw, Search, Plus,
    Eye, Edit3, Trash2, X, ExternalLink, ShieldCheck,
    Clock, Lock, Globe, User
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface Password {
    id: number;
    service: string;
    url: string;
    username: string;
    category: 'Work' | 'Social' | 'Personal' | 'Finance';
    strength: number;
    lastUpdated: string;
}

const PasswordManager: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const passwords: Password[] = [
        { id: 1, service: 'Google', url: 'google.com', username: 'user@example.com', category: 'Work', strength: 90, lastUpdated: '2023-11-15' },
        { id: 2, service: 'Facebook', url: 'facebook.com', username: 'user@example.com', category: 'Social', strength: 60, lastUpdated: '2023-10-22' },
        { id: 3, service: 'GitHub', url: 'github.com', username: 'developer', category: 'Work', strength: 95, lastUpdated: '2023-11-10' },
        { id: 4, service: 'Amazon', url: 'amazon.com', username: 'user@example.com', category: 'Personal', strength: 40, lastUpdated: '2023-09-15' },
    ];

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const filteredPasswords = passwords.filter(pw => {
        const matchesSearch = pw.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pw.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || pw.category.toLowerCase() === categoryFilter.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    const getStrengthColor = (strength: number) => {
        if (strength > 80) return 'text-emerald-400';
        if (strength > 50) return 'text-amber-400';
        return 'text-red-400';
    };

    const getStrengthBg = (strength: number) => {
        if (strength > 80) return 'bg-emerald-500';
        if (strength > 50) return 'bg-amber-500';
        return 'bg-red-500';
    };

    return (
        <AdminLayout title="Vault Access" subtitle="Security & Credential Core">
            <div className={`space-y-12 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {/* Stats Tier */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Vault', val: '24', icon: Key, delta: 'Synced', color: 'brand-blue' },
                        { label: 'Fortified', val: '18', icon: ShieldCheck, delta: '75%', color: 'emerald' },
                        { label: 'Vulnerabilities', val: '4', icon: AlertTriangle, delta: 'Critical', color: 'red' },
                        { label: 'Rotation Req.', val: '2', icon: RefreshCw, delta: 'Active', color: 'indigo' },
                    ].map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="bg-white dark:bg-white/[0.03] backdrop-blur-2xl border border-navy-200 dark:border-white/10 p-6 rounded-[2rem] group hover:bg-navy-50 dark:hover:bg-white/[0.05] hover:border-brand-blue-500/30 dark:hover:border-white/20 transition-all duration-500 active:scale-[0.98] shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-navy-50 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-navy-200 dark:border-white/10 group-hover:scale-110 transition-transform duration-500">
                                        <Icon className="w-6 h-6 text-brand-blue-600 dark:text-brand-blue-400" />
                                    </div>
                                    <div className="text-[10px] font-black px-2 py-1 rounded-lg bg-brand-blue-50 dark:bg-white/5 border border-brand-blue-100 dark:border-white/10 text-brand-blue-600 dark:text-brand-blue-300 uppercase">{stat.delta}</div>
                                </div>
                                <div className="text-3xl font-black mb-1 text-navy-950 dark:text-white">{stat.val}</div>
                                <div className="text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <div className="bg-white dark:bg-white/[0.02] border border-navy-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-xl shadow-navy-200/20 dark:shadow-navy-950/50">
                    <div className="p-8 border-b border-navy-100 dark:border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-widest text-navy-950 dark:text-white">Credential Matrix</h2>
                            <p className="text-xs font-bold text-navy-500 uppercase tracking-widest mt-1">Encrypted Access Records</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 dark:text-navy-600" />
                                <input
                                    type="text"
                                    placeholder="Search service or identity..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-navy-950 dark:text-white placeholder:text-navy-400 dark:placeholder:text-navy-600 focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all"
                                />
                            </div>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer"
                            >
                                <option value="all">All Categories</option>
                                <option value="work">Work Domain</option>
                                <option value="personal">Personal Space</option>
                                <option value="social">Social Networks</option>
                                <option value="finance">Financial Hub</option>
                            </select>
                            <button
                                onClick={toggleModal}
                                className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-blue-900/20 active:scale-95"
                            >
                                <Plus className="w-4 h-4" /> Secure Entry
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-navy-50/50 dark:bg-white/[0.02]">
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Service Nexus</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Identity</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Classification</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Integrity</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-navy-100 dark:divide-white/5">
                                {filteredPasswords.map(pw => (
                                    <tr key={pw.id} className="group hover:bg-navy-50 dark:hover:bg-white/[0.02] transition-colors cursor-default">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-navy-100 dark:bg-navy-800 border border-navy-200 dark:border-white/10 flex items-center justify-center font-black text-brand-blue-600 dark:text-brand-blue-400 group-hover:border-brand-blue-500/50 transition-all shadow-inner">
                                                    {pw.service.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-navy-950 dark:text-white">{pw.service}</div>
                                                    <div className="text-[10px] font-bold text-navy-500 uppercase tracking-widest mt-0.5">{pw.url}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-xs font-black text-navy-600 dark:text-navy-300 group-hover:text-brand-blue-600 dark:group-hover:text-white transition-colors uppercase tracking-tight">{pw.username}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-lg border border-navy-200 dark:border-white/10 bg-navy-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-navy-500 dark:text-navy-300`}>
                                                {pw.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-2 max-w-[120px]">
                                                <div className="h-1 w-full bg-navy-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                    <div className={`h-full ${getStrengthBg(pw.strength)}`} style={{ width: `${pw.strength}%` }}></div>
                                                </div>
                                                <div className={`text-[10px] font-black uppercase tracking-widest ${getStrengthColor(pw.strength)}`}>
                                                    {pw.strength > 80 ? 'Fortified' : pw.strength > 50 ? 'Intermediate' : 'Vulnerable'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 border border-navy-200 dark:border-white/5 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:text-white hover:bg-brand-blue-600 transition-all shadow-sm">
                                                    <Lock className="w-4 h-4" />
                                                </button>
                                                <button className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 border border-navy-200 dark:border-white/5 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:text-white hover:bg-brand-blue-600 transition-all shadow-sm">
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 border border-navy-200 dark:border-white/5 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:text-white hover:bg-red-600 transition-all shadow-sm">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Secure Entry Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div
                        className="absolute inset-0 bg-navy-950/40 dark:bg-navy-950/80 backdrop-blur-md dark:backdrop-blur-xl animate-fade-in"
                        onClick={toggleModal}
                    />
                    <div className="bg-white dark:bg-navy-900 border border-navy-200 dark:border-white/10 w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-slide-up">
                        <div className="p-8 sm:p-10">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-navy-950 dark:text-white">Commit Entry.</h3>
                                    <p className="text-xs font-bold text-navy-500 uppercase tracking-widest mt-1">Encrypted Record Provisioning</p>
                                </div>
                                <button onClick={toggleModal} className="w-12 h-12 rounded-2xl bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/5 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:text-brand-blue-600 dark:hover:text-white transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toggleModal(); }}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Service Origin</label>
                                        <input required className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all placeholder:text-navy-300 dark:placeholder:text-navy-700" placeholder="Nexus entity" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Domain Link</label>
                                        <input className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all placeholder:text-navy-300 dark:placeholder:text-navy-700" placeholder="service.domain" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Identity Code</label>
                                    <input required className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all placeholder:text-navy-300 dark:placeholder:text-navy-700" placeholder="user@access.sys" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Classification Pool</label>
                                        <select className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer">
                                            <option value="work">Work Domain</option>
                                            <option value="personal">Personal Space</option>
                                            <option value="social">Social Networks</option>
                                            <option value="finance">Financial Hub</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Access Key</label>
                                        <input type="password" required className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all placeholder:text-navy-300 dark:placeholder:text-navy-700" placeholder="********" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Secure Annotations</label>
                                    <textarea rows={3} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-[1.5rem] px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all placeholder:text-navy-300 dark:placeholder:text-navy-700" placeholder="Optional meta data..." />
                                </div>

                                <div className="pt-6">
                                    <button type="submit" className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-blue-900/40 active:scale-95">
                                        COMMIT TO VAULT
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default PasswordManager;
