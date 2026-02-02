import React, { useState, useEffect } from 'react';
import {
    Users, Calendar, Clock, CheckCircle2, XCircle,
    Search, Plus, Eye, Edit3, Trash2, X, AlertCircle,
    Filter, ArrowRight, Activity
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface AttendanceRecord {
    id: string;
    employeeName: string;
    department: string;
    checkIn: string;
    checkOut: string;
    status: 'present' | 'absent' | 'late' | 'half-day' | 'on-leave';
    initials: string;
}

const AttendanceManagement: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [records, setRecords] = useState<AttendanceRecord[]>([
        { id: '1', employeeName: 'John Doe', department: 'Engineering', checkIn: '09:02 AM', checkOut: '06:05 PM', status: 'present', initials: 'JD' },
        { id: '2', employeeName: 'Sarah Johnson', department: 'Marketing', checkIn: '08:58 AM', checkOut: '05:52 PM', status: 'present', initials: 'SJ' },
        { id: '3', employeeName: 'Michael Brown', department: 'Sales', checkIn: '09:15 AM', checkOut: '06:10 PM', status: 'present', initials: 'MB' },
        { id: '4', employeeName: 'Alice Parker', department: 'HR', checkIn: '-', checkOut: '-', status: 'absent', initials: 'AP' }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isMarkModalOpen, setIsMarkModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);

    const [newRecord, setNewRecord] = useState({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        checkIn: '',
        checkOut: '',
        status: 'present' as const
    });

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleMarkAttendance = (e: React.FormEvent) => {
        e.preventDefault();
        const names = ['John Doe', 'Sarah Johnson', 'Michael Brown', 'Alice Parker'];
        const name = names[parseInt(newRecord.employeeId) - 1] || 'New Employee';

        const record: AttendanceRecord = {
            id: Math.random().toString(36).substr(2, 9),
            employeeName: name,
            department: 'General',
            checkIn: newRecord.checkIn || '-',
            checkOut: newRecord.checkOut || '-',
            status: newRecord.status,
            initials: name.split(' ').map(n => n[0]).join('').toUpperCase().substr(0, 2)
        };

        setRecords([...records, record]);
        setIsMarkModalOpen(false);
        setNewRecord({ employeeId: '', date: new Date().toISOString().split('T')[0], checkIn: '', checkOut: '', status: 'present' });
    };

    const handleViewDetail = (record: AttendanceRecord) => {
        setSelectedRecord(record);
        setIsDetailModalOpen(true);
    };

    const filteredRecords = records.filter(r => {
        const matchesSearch = r.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.department.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'present': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'absent': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'late': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'half-day': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
            case 'on-leave': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            default: return 'bg-white/10 text-white border-white/20';
        }
    };

    return (
        <AdminLayout title="Attendance Core" subtitle="Operational Logistics">
            <div className={`space-y-12 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {/* Stats Tier */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Force Capacity', val: '128', icon: Users, delta: 'Full', color: 'brand-blue' },
                        { label: 'Operational', val: '122', icon: CheckCircle2, delta: '95.3%', color: 'emerald' },
                        { label: 'Out of Sync', val: '4', icon: XCircle, delta: 'Minimal', color: 'red' },
                        { label: 'Uptime Index', val: '98.4%', icon: Clock, delta: '+1.2%', color: 'indigo' },
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
                            <h2 className="text-xl font-black uppercase tracking-widest text-navy-950 dark:text-white">Attendance Ledger</h2>
                            <p className="text-xs font-bold text-navy-500 uppercase tracking-widest mt-1">Real-time force presence tracking</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 dark:text-navy-600" />
                                <input
                                    type="text"
                                    placeholder="Employee name or department..."
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
                                <option value="present">Present</option>
                                <option value="absent">Absent</option>
                                <option value="late">Late Arrival</option>
                                <option value="half-day">Half Ops</option>
                            </select>
                            <button
                                onClick={() => setIsMarkModalOpen(true)}
                                className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-blue-900/20 active:scale-95"
                            >
                                <Plus className="w-4 h-4" /> Log Presence
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-navy-50/50 dark:bg-white/[0.02]">
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Personnel</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Department</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Time-In</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Time-Out</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Status</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-navy-100 dark:divide-white/5">
                                {filteredRecords.map(record => (
                                    <tr key={record.id} className="group hover:bg-navy-50 dark:hover:bg-white/[0.02] transition-colors cursor-default">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-navy-100 dark:bg-navy-800 border border-navy-200 dark:border-white/10 flex items-center justify-center font-black text-brand-blue-600 dark:text-brand-blue-400 group-hover:border-brand-blue-500/50 transition-all shadow-inner">
                                                    {record.initials}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-navy-950 dark:text-white">{record.employeeName}</div>
                                                    <div className="text-[10px] font-bold text-navy-500/60 dark:text-navy-700 uppercase tracking-widest mt-0.5">ID_00{record.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-sm font-black text-navy-600 dark:text-navy-300 group-hover:text-brand-blue-600 dark:group-hover:text-white transition-colors uppercase tracking-tight">{record.department}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-xs font-black text-navy-900 dark:text-white font-black">
                                                <ArrowRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400 rotate-45" />
                                                {record.checkIn}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-xs font-black text-navy-900 dark:text-white font-black">
                                                <ArrowRight className="w-3 h-3 text-red-600 dark:text-red-400 -rotate-45" />
                                                {record.checkOut}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(record.status)}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleViewDetail(record)} className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 border border-navy-200 dark:border-white/5 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:text-white hover:bg-brand-blue-600 transition-all shadow-sm">
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

            {/* Mark Presence Modal */}
            {isMarkModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div
                        className="absolute inset-0 bg-navy-950/80 backdrop-blur-xl animate-fade-in"
                        onClick={() => setIsMarkModalOpen(false)}
                    />
                    <div className="bg-navy-900 border border-white/10 w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-slide-up">
                        <div className="p-8 sm:p-10">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-white">Presence Logging.</h3>
                                    <p className="text-xs font-bold text-navy-500 uppercase tracking-widest mt-1">Personnel Time-Tracking Gateway</p>
                                </div>
                                <button onClick={() => setIsMarkModalOpen(false)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-navy-400 hover:text-white transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleMarkAttendance} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Identity Assignment</label>
                                    <select required value={newRecord.employeeId} onChange={e => setNewRecord({ ...newRecord, employeeId: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer">
                                        <option value="" className="bg-navy-900">Select Personnel</option>
                                        <option value="1" className="bg-navy-900">John Doe (Engineering)</option>
                                        <option value="2" className="bg-navy-900">Sarah Johnson (Marketing)</option>
                                        <option value="3" className="bg-navy-900">Michael Brown (Sales)</option>
                                        <option value="4" className="bg-navy-900">Alice Parker (HR)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Cycle Date</label>
                                    <input type="date" required value={newRecord.date} onChange={e => setNewRecord({ ...newRecord, date: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Entry Timestamp</label>
                                        <input type="time" value={newRecord.checkIn} onChange={e => setNewRecord({ ...newRecord, checkIn: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Exit Timestamp</label>
                                        <input type="time" value={newRecord.checkOut} onChange={e => setNewRecord({ ...newRecord, checkOut: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Status Classification</label>
                                    <select value={newRecord.status} onChange={e => setNewRecord({ ...newRecord, status: e.target.value as any })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer">
                                        <option value="present" className="bg-navy-900">Present Ops</option>
                                        <option value="absent" className="bg-navy-900">Absent State</option>
                                        <option value="late" className="bg-navy-900">Late Synced</option>
                                        <option value="half-day" className="bg-navy-900">Half Cycle</option>
                                        <option value="on-leave" className="bg-navy-900">Authorized Leave</option>
                                    </select>
                                </div>

                                <div className="pt-6">
                                    <button type="submit" className="w-full bg-brand-blue-600 hover:bg-brand-blue-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-blue-900/40 active:scale-95">
                                        Log to Database
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Record Intelligence Modal */}
            {isDetailModalOpen && selectedRecord && (
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
                                        {selectedRecord.initials}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-white leading-none">{selectedRecord.employeeName}.</h3>
                                        <div className="flex items-center gap-2 text-navy-500 font-bold uppercase tracking-widest text-[10px] mt-2">
                                            <Users className="w-3.5 h-3.5" />
                                            {selectedRecord.department}
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
                                        <Clock className="w-3.5 h-3.5 text-brand-blue-400" /> Duty Timing
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-[9px] font-bold text-navy-600 uppercase tracking-widest mb-1 leading-none">Entry Time</div>
                                            <div className="text-sm font-black text-white leading-none">{selectedRecord.checkIn}</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-bold text-navy-600 uppercase tracking-widest mb-1 leading-none">Exit Time</div>
                                            <div className="text-sm font-black text-white leading-none">{selectedRecord.checkOut}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl">
                                    <h4 className="text-[10px] font-black text-navy-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Activity className="w-3.5 h-3.5 text-indigo-400" /> Performance Index
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div className="text-[9px] font-bold text-navy-600 uppercase tracking-widest leading-none">State</div>
                                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${getStatusStyle(selectedRecord.status)} border`}>
                                                {selectedRecord.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="text-[9px] font-bold text-navy-600 uppercase tracking-widest leading-none">Duration</div>
                                            <div className="text-sm font-black text-emerald-400 leading-none">8.5 HRS</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl mb-10">
                                <h4 className="text-[10px] font-black text-navy-500 uppercase tracking-widest mb-6 leading-none">Duty History Matrix</h4>
                                <div className="space-y-6">
                                    {[
                                        { date: 'NOVEMBER 14', status: 'PRESENT', ev: 'SYNC_STABLE', icon: CheckCircle2, color: 'text-emerald-500' },
                                        { date: 'NOVEMBER 13', status: 'LATE', ev: 'DELAY_DETECTED', icon: AlertCircle, color: 'text-amber-500' },
                                        { date: 'NOVEMBER 12', status: 'PRESENT', ev: 'SYNC_STABLE', icon: CheckCircle2, color: 'text-emerald-500' },
                                    ].map((act, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <act.icon className={`w-4 h-4 ${act.color}`} />
                                            <div className="flex-1 pb-4 border-b border-white/5">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black text-white tracking-tight uppercase">{act.status}</span>
                                                        <span className="text-[9px] font-black text-navy-700 uppercase tracking-widest">{act.ev}</span>
                                                    </div>
                                                    <span className="text-[9px] font-black text-navy-700 uppercase tracking-widest">{act.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={() => setIsDetailModalOpen(false)} className="flex-1 bg-white/5 border border-white/5 text-navy-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
                                    Terminate View
                                </button>
                                <button onClick={() => { setIsDetailModalOpen(false); setIsMarkModalOpen(true); }} className="flex-1 bg-brand-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-blue-500 transition-all shadow-lg shadow-brand-blue-900/20 active:scale-95">
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

export default AttendanceManagement;
