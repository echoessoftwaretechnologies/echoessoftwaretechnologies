import React, { useState, useEffect } from 'react';
import {
    Users, Search, Filter, Plus, MoreHorizontal,
    Mail, Phone, Building2, Calendar, DollarSign,
    TrendingUp, Zap, Trash2, Edit3, Eye, X, CheckCircle2,
    Clock, AlertCircle, Shield, Activity
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

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
    const [isLoaded, setIsLoaded] = useState(false);
    const [clients, setClients] = useState<Client[]>([
        {
            id: '1',
            name: 'Acme Corporation',
            company: 'Enterprise',
            contact: 'John Smith',
            email: 'john@acme.com',
            phone: '+91 81485 49511',
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
        setIsLoaded(true);
    }, []);

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
    };

    const handleDeleteClient = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete client ${name}?`)) {
            setClients(clients.filter(c => c.id !== id));
        }
    };

    const handleViewClient = (client: Client) => {
        setSelectedClient(client);
        setIsDetailModalOpen(true);
    };

    const filteredClients = clients.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'active': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'follow-up': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'prospect': return 'bg-brand-blue-500/10 text-brand-blue-400 border-brand-blue-500/20';
            case 'lead': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
            default: return 'bg-white/10 text-white border-white/20';
        }
    };

    return (
        <AdminLayout title="CRM Intelligence" subtitle="Client Relations Core">
            <div className={`space-y-12 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {/* Stats Tier */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Base', val: clients.length.toString(), icon: Users, delta: '+4.2%', color: 'brand-blue' },
                        { label: 'Conversion', val: '24.8%', icon: TrendingUp, delta: '+1.5%', color: 'emerald' },
                        { label: 'Avg Value', val: '$12,400', icon: DollarSign, delta: 'Stable', color: 'indigo' },
                        { label: 'Velocity', val: 'High', icon: Zap, delta: 'Healthy', color: 'purple' },
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
                            <h2 className="text-xl font-black uppercase tracking-widest text-navy-950 dark:text-white">Client Matrix</h2>
                            <p className="text-xs font-bold text-navy-500 uppercase tracking-widest mt-1">Personnel & Enterprise Records</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 dark:text-navy-600" />
                                <input
                                    type="text"
                                    placeholder="Execute search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-navy-950 dark:text-white placeholder:text-navy-400 dark:placeholder:text-navy-600 focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all"
                                />
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer"
                            >
                                <option value="all">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="follow-up">Follow-up</option>
                                <option value="prospect">Prospect</option>
                                <option value="lead">Lead</option>
                            </select>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-blue-900/20 active:scale-95"
                            >
                                <Plus className="w-4 h-4" /> Add Record
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-navy-50/50 dark:bg-white/[0.02]">
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Entity</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Intelligence</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Status</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Valuation</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-navy-100 dark:divide-white/5">
                                {filteredClients.map(client => (
                                    <tr key={client.id} className="group hover:bg-navy-50 dark:hover:bg-white/[0.02] transition-colors cursor-default">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-navy-100 dark:bg-navy-800 border border-navy-200 dark:border-white/10 flex items-center justify-center font-black text-brand-blue-600 dark:text-brand-blue-400 group-hover:border-brand-blue-500/50 transition-all shadow-inner">
                                                    {client.initials}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-navy-950 dark:text-white">{client.name}</div>
                                                    <div className="text-[10px] font-bold text-navy-500 uppercase tracking-widest mt-0.5">{client.company}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-xs font-black text-navy-600 dark:text-navy-300 group-hover:text-brand-blue-600 dark:group-hover:text-white transition-colors uppercase tracking-tight">
                                                <Mail className="w-3.5 h-3.5 text-navy-400/60 dark:text-navy-600" />
                                                {client.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-navy-500 dark:text-navy-600 uppercase tracking-widest mt-1">
                                                <Phone className="w-3.5 h-3.5 text-navy-400 dark:text-navy-700" />
                                                {client.phone}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(client.status)}`}>
                                                {client.status.replace('-', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-sm font-black text-navy-950 dark:text-white">{client.value}</div>
                                            <div className="text-[10px] font-bold text-navy-400 dark:text-navy-700 uppercase tracking-widest mt-0.5">{client.type}</div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleViewClient(client)} className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 border border-navy-200 dark:border-white/5 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:text-white hover:bg-brand-blue-600 transition-all shadow-sm">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 border border-navy-200 dark:border-white/5 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:text-white hover:bg-brand-blue-600 transition-all shadow-sm">
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDeleteClient(client.id, client.name)} className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 border border-navy-200 dark:border-white/5 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:text-white hover:bg-red-600 transition-all shadow-sm">
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

            {/* Add Record Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div
                        className="absolute inset-0 bg-navy-950/40 dark:bg-navy-950/80 backdrop-blur-md dark:backdrop-blur-xl animate-fade-in"
                        onClick={() => setIsAddModalOpen(false)}
                    />
                    <div className="bg-white dark:bg-navy-900 border border-navy-200 dark:border-white/10 w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-slide-up">
                        <div className="p-8 sm:p-10">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-navy-950 dark:text-white">Initialize Record.</h3>
                                    <p className="text-xs font-bold text-navy-500 uppercase tracking-widest mt-1">Personnel Admission Gateway</p>
                                </div>
                                <button onClick={() => setIsAddModalOpen(false)} className="w-12 h-12 rounded-2xl bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/5 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:text-brand-blue-600 dark:hover:text-white transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleAddClient} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Identity</label>
                                        <input required value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all placeholder:text-navy-300 dark:placeholder:text-navy-700" placeholder="Full legal name" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Network Address</label>
                                        <input type="email" required value={newClient.email} onChange={e => setNewClient({ ...newClient, email: e.target.value })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all placeholder:text-navy-300 dark:placeholder:text-navy-700" placeholder="secure@connection.sys" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Corporate Nexus</label>
                                    <input required value={newClient.company} onChange={e => setNewClient({ ...newClient, company: e.target.value })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all placeholder:text-navy-300 dark:placeholder:text-navy-700" placeholder="Entity assignment" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Communication Core</label>
                                        <input type="tel" value={newClient.phone} onChange={e => setNewClient({ ...newClient, phone: e.target.value })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all placeholder:text-navy-300 dark:placeholder:text-navy-700" placeholder="Terminal link" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">operational status</label>
                                        <select value={newClient.status} onChange={e => setNewClient({ ...newClient, status: e.target.value as any })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer">
                                            <option value="active">Active Duty</option>
                                            <option value="follow-up">Observation</option>
                                            <option value="prospect">Screening</option>
                                            <option value="lead">Discovery</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button type="submit" className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-blue-900/40 active:scale-95">
                                        Commit to Database
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Record Intelligence Modal */}
            {isDetailModalOpen && selectedClient && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div
                        className="absolute inset-0 bg-navy-950/40 dark:bg-navy-950/80 backdrop-blur-md dark:backdrop-blur-xl animate-fade-in"
                        onClick={() => setIsDetailModalOpen(false)}
                    />
                    <div className="bg-white dark:bg-navy-900 border border-navy-200 dark:border-white/10 w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-slide-up">
                        <div className="p-8 sm:p-10">
                            <div className="flex justify-between items-start mb-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-[2rem] bg-navy-100 dark:bg-navy-800 border border-navy-200 dark:border-white/10 text-brand-blue-600 dark:text-brand-blue-400 font-black text-2xl flex items-center justify-center shadow-inner">
                                        {selectedClient.initials}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-navy-950 dark:text-white leading-none">{selectedClient.name}.</h3>
                                        <div className="flex items-center gap-2 text-navy-500 font-bold uppercase tracking-widest text-[10px] mt-2">
                                            <Building2 className="w-3.5 h-3.5 text-navy-400" />
                                            {selectedClient.company}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsDetailModalOpen(false)} className="w-12 h-12 rounded-2xl bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/5 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:text-brand-blue-600 dark:hover:text-white transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="bg-navy-50 dark:bg-white/[0.02] border border-navy-100 dark:border-white/5 p-6 rounded-3xl">
                                    <h4 className="text-[10px] font-black text-navy-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Shield className="w-3.5 h-3.5 text-brand-blue-600 dark:text-brand-blue-400" /> Secure Communications
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-[9px] font-bold text-navy-400 dark:text-navy-600 uppercase tracking-widest mb-1 leading-none">Primary Link</div>
                                            <div className="text-sm font-black text-brand-blue-600 dark:text-brand-blue-400 leading-none">{selectedClient.email}</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-bold text-navy-400 dark:text-navy-600 uppercase tracking-widest mb-1 leading-none">Terminal Code</div>
                                            <div className="text-sm font-black text-navy-900 dark:text-white leading-none">{selectedClient.phone}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-navy-50 dark:bg-white/[0.02] border border-navy-100 dark:border-white/5 p-6 rounded-3xl">
                                    <h4 className="text-[10px] font-black text-navy-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Activity className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Operational Metrics
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div className="text-[9px] font-bold text-navy-400 dark:text-navy-600 uppercase tracking-widest leading-none">Current State</div>
                                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${getStatusStyle(selectedClient.status)} border`}>
                                                {selectedClient.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="text-[9px] font-bold text-navy-400 dark:text-navy-600 uppercase tracking-widest leading-none">Equity Value</div>
                                            <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 leading-none">{selectedClient.value}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-navy-50 dark:bg-white/[0.02] border border-navy-100 dark:border-white/5 p-6 rounded-3xl mb-10">
                                <h4 className="text-[10px] font-black text-navy-500 uppercase tracking-widest mb-6 leading-none">Network Activity Archive</h4>
                                <div className="space-y-6">
                                    {[
                                        { ev: 'SECURITY_BRIEFING_EXEC', t: '2 DAYS AGO', icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-500' },
                                        { ev: 'LEDGER_MODIFICATION', t: '1 WEEK AGO', icon: Clock, color: 'text-brand-blue-600 dark:text-brand-blue-500' },
                                        { ev: 'SYSTEM_SYNC_PULSE', t: '1 MONTH AGO', icon: AlertCircle, color: 'text-navy-400 dark:text-navy-600' },
                                    ].map((act, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <act.icon className={`w-4 h-4 ${act.color}`} />
                                            <div className="flex-1 pb-4 border-b border-navy-100 dark:border-white/5 last:border-0 last:pb-0">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-black text-navy-900 dark:text-white tracking-tight uppercase">{act.ev}</span>
                                                    <span className="text-[9px] font-bold text-navy-400 dark:text-navy-700 uppercase tracking-widest">{act.t}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={() => setIsDetailModalOpen(false)} className="flex-1 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/5 text-navy-500 dark:text-navy-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-navy-100 dark:hover:bg-white/10 hover:text-navy-900 dark:hover:text-white transition-all">
                                    Terminate View
                                </button>
                                <button onClick={() => { setIsDetailModalOpen(false); setIsAddModalOpen(true); }} className="flex-1 bg-brand-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-blue-700 transition-all shadow-lg shadow-brand-blue-900/20 active:scale-95">
                                    Modify Intelligence
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default CrmManagement;
