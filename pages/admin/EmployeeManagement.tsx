import React, { useState, useEffect } from 'react';
import {
    Users, UserPlus, UserCheck, TrendingUp, Search, Plus,
    MoreHorizontal, Mail, Phone, Building2, Calendar,
    Trash2, Edit3, Eye, X, Shield, Activity, Briefcase
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    department: string;
    status: 'active' | 'probation' | 'on-leave' | 'terminated';
    joinDate: string;
    initials: string;
    phone?: string;
}

const EmployeeManagement: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([
        { id: '1', firstName: 'John', lastName: 'Doe', email: 'johndoe@echoes.com', position: 'Senior Developer', department: 'Engineering', status: 'active', joinDate: '2022-03-15', initials: 'JD', phone: '+91 81485 49511' },
        { id: '2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarahj@echoes.com', position: 'Marketing Manager', department: 'Marketing', status: 'active', joinDate: '2021-07-22', initials: 'SJ', phone: '+1 (555) 234-5678' },
        { id: '3', firstName: 'Michael', lastName: 'Brown', email: 'michaelb@echoes.com', position: 'Sales Director', department: 'Sales', status: 'active', joinDate: '2020-11-05', initials: 'MB', phone: '+1 (555) 345-6789' },
        { id: '4', firstName: 'Alice', lastName: 'Parker', email: 'alicep@echoes.com', position: 'HR Specialist', department: 'HR', status: 'active', joinDate: '2023-01-10', initials: 'AP', phone: '+1 (555) 456-7890' }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const [newEmployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        department: '',
        startDate: new Date().toISOString().split('T')[0],
        status: 'active' as const,
        phone: ''
    });

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleAddEmployee = (e: React.FormEvent) => {
        e.preventDefault();
        const employee: Employee = {
            id: Math.random().toString(36).substr(2, 9),
            firstName: newEmployee.firstName,
            lastName: newEmployee.lastName,
            email: newEmployee.email,
            position: newEmployee.position,
            department: newEmployee.department,
            status: newEmployee.status,
            joinDate: newEmployee.startDate,
            initials: (newEmployee.firstName[0] + newEmployee.lastName[0]).toUpperCase(),
            phone: newEmployee.phone
        };

        setEmployees([...employees, employee]);
        setIsAddModalOpen(false);
        setNewEmployee({ firstName: '', lastName: '', email: '', position: '', department: '', startDate: new Date().toISOString().split('T')[0], status: 'active', phone: '' });
    };

    const handleViewDetail = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsDetailModalOpen(true);
    };

    const filteredEmployees = employees.filter(e => {
        const matchesSearch = `${e.firstName} ${e.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = departmentFilter === 'all' || e.department.toLowerCase() === departmentFilter.toLowerCase();
        return matchesSearch && matchesDept;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'active': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'probation': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'on-leave': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
            case 'terminated': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-white/10 text-white border-white/20';
        }
    };

    return (
        <AdminLayout title="Human Capital" subtitle="Personnel & Talent Matrix">
            <div className={`space-y-12 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {/* Stats Tier */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Force', val: '128', icon: Users, delta: '+8', color: 'brand-blue' },
                        { label: 'Active Duty', val: '122', icon: UserCheck, delta: '95%', color: 'emerald' },
                        { label: 'Onboarding', val: '6', icon: UserPlus, delta: 'High', color: 'indigo' },
                        { label: 'Retention', val: '94%', icon: TrendingUp, delta: '+2.1%', color: 'purple' },
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
                            <h2 className="text-xl font-black uppercase tracking-widest text-navy-950 dark:text-white">Personnel Directory</h2>
                            <p className="text-xs font-bold text-navy-500 uppercase tracking-widest mt-1">Enterprise Human Capital Matrix</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 dark:text-navy-600" />
                                <input
                                    type="text"
                                    placeholder="Search identity or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-navy-950 dark:text-white placeholder:text-navy-400 dark:placeholder:text-navy-600 focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all"
                                />
                            </div>
                            <select
                                value={departmentFilter}
                                onChange={(e) => setDepartmentFilter(e.target.value)}
                                className="bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer"
                            >
                                <option value="all" className="bg-navy-900">All Departments</option>
                                <option value="engineering" className="bg-navy-900">Engineering</option>
                                <option value="marketing" className="bg-navy-900">Marketing</option>
                                <option value="sales" className="bg-navy-900">Sales</option>
                                <option value="hr" className="bg-navy-900">HR Hub</option>
                                <option value="finance" className="bg-navy-900">Finance</option>
                            </select>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="bg-brand-blue-600 hover:bg-brand-blue-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-blue-900/20 active:scale-95"
                            >
                                <Plus className="w-4 h-4" /> Recruit Talent
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-navy-50/50 dark:bg-white/[0.02]">
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Identity</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Role & Nexus</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Status</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Admission</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-navy-100 dark:divide-white/5">
                                {filteredEmployees.map(emp => (
                                    <tr key={emp.id} className="group hover:bg-navy-50 dark:hover:bg-white/[0.02] transition-colors cursor-default">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-navy-100 dark:bg-navy-800 border border-navy-200 dark:border-white/10 flex items-center justify-center font-black text-brand-blue-600 dark:text-brand-blue-400 group-hover:border-brand-blue-500/50 transition-all shadow-inner">
                                                    {emp.initials}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-navy-950 dark:text-white">{emp.firstName} {emp.lastName}</div>
                                                    <div className="text-[10px] font-bold text-navy-500 uppercase tracking-widest mt-0.5">{emp.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-sm font-black text-navy-600 dark:text-navy-300 group-hover:text-brand-blue-600 dark:group-hover:text-white transition-colors uppercase tracking-tight">{emp.position}</div>
                                            <div className="text-[10px] font-bold text-navy-500/60 dark:text-navy-700 uppercase tracking-widest mt-0.5">{emp.department}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(emp.status)}`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-xs font-black text-navy-600 dark:text-navy-300 group-hover:text-brand-blue-600 dark:group-hover:text-white transition-colors uppercase tracking-tight">{emp.joinDate}</div>
                                            <div className="text-[10px] font-bold text-navy-500/60 dark:text-navy-700 uppercase tracking-widest mt-0.5">EMP_ID_00{emp.id}</div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleViewDetail(emp)} className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 border border-navy-200 dark:border-white/5 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:text-white hover:bg-brand-blue-600 transition-all shadow-sm">
                                                    <Eye className="w-4 h-4" />
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

            {/* Recruit Talent Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div
                        className="absolute inset-0 bg-navy-950/80 backdrop-blur-xl animate-fade-in"
                        onClick={() => setIsAddModalOpen(false)}
                    />
                    <div className="bg-navy-900 border border-white/10 w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-slide-up">
                        <div className="p-8 sm:p-10">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-white">Talent Admission.</h3>
                                    <p className="text-xs font-bold text-navy-500 uppercase tracking-widest mt-1">Human Capital Ingestion Portal</p>
                                </div>
                                <button onClick={() => setIsAddModalOpen(false)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-navy-400 hover:text-white transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleAddEmployee} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">First Designation</label>
                                        <input required value={newEmployee.firstName} onChange={e => setNewEmployee({ ...newEmployee, firstName: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all" placeholder="Given name" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Last Designation</label>
                                        <input required value={newEmployee.lastName} onChange={e => setNewEmployee({ ...newEmployee, lastName: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all" placeholder="Surname" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Network Identity</label>
                                    <input type="email" required value={newEmployee.email} onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all" placeholder="secure@echoes.sys" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Functional Role</label>
                                        <input required value={newEmployee.position} onChange={e => setNewEmployee({ ...newEmployee, position: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all" placeholder="Title assigning" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Operational Nexus</label>
                                        <select required value={newEmployee.department} onChange={e => setNewEmployee({ ...newEmployee, department: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer">
                                            <option value="" className="bg-navy-900">Select Department</option>
                                            <option value="Engineering" className="bg-navy-900">Engineering</option>
                                            <option value="Marketing" className="bg-navy-900">Marketing</option>
                                            <option value="Sales" className="bg-navy-900">Sales</option>
                                            <option value="HR" className="bg-navy-900">Human Capital</option>
                                            <option value="Finance" className="bg-navy-900">Finance</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Admission Date</label>
                                        <input type="date" required value={newEmployee.startDate} onChange={e => setNewEmployee({ ...newEmployee, startDate: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Initial Status</label>
                                        <select value={newEmployee.status} onChange={e => setNewEmployee({ ...newEmployee, status: e.target.value as any })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer">
                                            <option value="active" className="bg-navy-900">Active Duty</option>
                                            <option value="probation" className="bg-navy-900">Probation Screening</option>
                                            <option value="on-leave" className="bg-navy-900">Authorized Leave</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button type="submit" className="w-full bg-brand-blue-600 hover:bg-brand-blue-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-blue-900/40 active:scale-95">
                                        COMMIT PERSONNEL
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Personnel Intelligence Modal */}
            {isDetailModalOpen && selectedEmployee && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div
                        className="absolute inset-0 bg-navy-950/80 backdrop-blur-xl animate-fade-in"
                        onClick={() => setIsDetailModalOpen(false)}
                    />
                    <div className="bg-navy-900 border border-white/10 w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-slide-up">
                        <div className="p-8 sm:p-10">
                            <div className="flex justify-between items-start mb-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-[2rem] bg-navy-800 border border-white/10 text-brand-blue-400 font-black text-2xl flex items-center justify-center shadow-inner">
                                        {selectedEmployee.initials}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-white leading-none">{selectedEmployee.firstName} {selectedEmployee.lastName}.</h3>
                                        <div className="flex items-center gap-2 text-navy-500 font-bold uppercase tracking-widest text-[10px] mt-2">
                                            <Briefcase className="w-3.5 h-3.5" />
                                            {selectedEmployee.position}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsDetailModalOpen(false)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-navy-400 hover:text-white transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl">
                                    <h4 className="text-[10px] font-black text-navy-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Shield className="w-3.5 h-3.5 text-brand-blue-400" /> Identity Intelligence
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-[9px] font-bold text-navy-600 uppercase tracking-widest mb-1 leading-none">Nexus Mail</div>
                                            <div className="text-sm font-black text-brand-blue-400 leading-none">{selectedEmployee.email}</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-bold text-navy-600 uppercase tracking-widest mb-1 leading-none">Terminal Link</div>
                                            <div className="text-sm font-black text-white leading-none">{selectedEmployee.phone || 'DATA_NULL'}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl">
                                    <h4 className="text-[10px] font-black text-navy-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Activity className="w-3.5 h-3.5 text-indigo-400" /> Employment Metrics
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div className="text-[9px] font-bold text-navy-600 uppercase tracking-widest leading-none">Operational State</div>
                                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${getStatusStyle(selectedEmployee.status)} border`}>
                                                {selectedEmployee.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="text-[9px] font-bold text-navy-600 uppercase tracking-widest leading-none">Nexus Sync</div>
                                            <div className="text-sm font-black text-emerald-400 leading-none">{selectedEmployee.joinDate}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl mb-10">
                                <h4 className="text-[10px] font-black text-navy-500 uppercase tracking-widest mb-6 leading-none">Recent Influence Archive</h4>
                                <div className="space-y-6">
                                    {[
                                        { ev: 'CORE_MILESTONE_EXEC', t: '2 DAYS AGO', desc: 'Successful deployment of Tier-1 infrastructure' },
                                        { ev: 'NEXUS_SYNC_MEETING', t: '1 WEEK AGO', desc: 'Strategy alignment with enterprise director' },
                                        { ev: 'INTEL_REVIEW_SUBMIT', t: '2 WEEKS AGO', desc: 'Quarterly optimization metrics filed' },
                                    ].map((act, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-1.5 h-8 bg-brand-blue-500/20 rounded-full mt-1"></div>
                                            <div className="flex-1 pb-4 border-b border-white/5">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs font-black text-white tracking-tight uppercase">{act.ev}</span>
                                                    <span className="text-[9px] font-black text-navy-700 uppercase tracking-widest">{act.t}</span>
                                                </div>
                                                <p className="text-[10px] font-bold text-navy-500 uppercase tracking-wide leading-tight">{act.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={() => setIsDetailModalOpen(false)} className="flex-1 bg-white/5 border border-white/5 text-navy-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
                                    Terminate View
                                </button>
                                <button onClick={() => { setIsDetailModalOpen(false); setIsAddModalOpen(true); }} className="flex-1 bg-brand-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-blue-500 transition-all shadow-lg shadow-brand-blue-900/20 active:scale-95">
                                    Modify Record
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default EmployeeManagement;
