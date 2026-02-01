import React, { useState, useEffect } from 'react';

declare global {
    interface Window {
        lucide: any;
    }
}

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState('Admin');
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
    }, [isSidebarOpen, isMarkModalOpen, isDetailModalOpen]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = '/index.html';
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleMarkAttendance = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd map employeeId to name/dept
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
        alert(`Attendance marked for ${name}`);
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
                            <a href="/pages/admin/attendance-management.html" className="px-4 py-2 text-sm font-medium bg-brand-blue text-white rounded-full transition-colors">
                                <i data-lucide="calendar" className="h-4 w-4 inline mr-2" /> Attendance
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
                            <a href="/pages/admin/crm-management.html" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                                <i data-lucide="users" className="h-5 w-5" /> <span>CRM Management</span>
                            </a>
                            <a href="/pages/admin/attendance-management.html" className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-brand-blue rounded-full">
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
                            <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
                            <button onClick={() => setIsMarkModalOpen(true)} className="bg-brand-blue text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors">
                                Mark Attendance
                            </button>
                        </div>

                        {/* Attendance Overview Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            {[
                                { val: '128', label: 'Total Employees', icon: 'user-check', color: 'bg-blue-100 text-brand-blue' },
                                { val: '122', label: 'Present Today', icon: 'check-circle', color: 'bg-green-100 text-green-600' },
                                { val: '4', label: 'Absent Today', icon: 'x-circle', color: 'bg-red-100 text-red-600' },
                                { val: '96%', label: 'Attendance Rate', icon: 'clock', color: 'bg-yellow-100 text-yellow-600' },
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

                        {/* Attendance Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                                <h2 className="text-xl font-semibold text-gray-900">Today's Attendance</h2>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search employees..."
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
                                        <option value="present">Present</option>
                                        <option value="absent">Absent</option>
                                        <option value="late">Late</option>
                                        <option value="half-day">Half Day</option>
                                    </select>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredRecords.map(record => (
                                            <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold">
                                                            {record.initials}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.department}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.checkIn}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.checkOut}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === 'present' ? 'bg-green-100 text-green-800' :
                                                            record.status === 'absent' ? 'bg-red-100 text-red-800' :
                                                                'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {record.status.charAt(0).toUpperCase() + record.status.slice(1).replace('-', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button onClick={() => handleViewDetail(record)} className="text-brand-blue hover:text-blue-700 mr-3">View</button>
                                                    <button onClick={() => alert('Edit record ID: ' + record.id)} className="text-gray-600 hover:text-gray-900">Edit</button>
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

            {/* Mark Attendance Modal */}
            {isMarkModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Mark Attendance</h3>
                                <button onClick={() => setIsMarkModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <i data-lucide="x" className="h-6 w-6"></i>
                                </button>
                            </div>
                            <form onSubmit={handleMarkAttendance} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                                    <select required value={newRecord.employeeId} onChange={e => setNewRecord({ ...newRecord, employeeId: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue">
                                        <option value="">Select Employee</option>
                                        <option value="1">John Doe</option>
                                        <option value="2">Sarah Johnson</option>
                                        <option value="3">Michael Brown</option>
                                        <option value="4">Alice Parker</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <input type="date" required value={newRecord.date} onChange={e => setNewRecord({ ...newRecord, date: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Time</label>
                                    <input type="time" value={newRecord.checkIn} onChange={e => setNewRecord({ ...newRecord, checkIn: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Time</label>
                                    <input type="time" value={newRecord.checkOut} onChange={e => setNewRecord({ ...newRecord, checkOut: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select value={newRecord.status} onChange={e => setNewRecord({ ...newRecord, status: e.target.value as any })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue">
                                        <option value="present">Present</option>
                                        <option value="absent">Absent</option>
                                        <option value="late">Late</option>
                                        <option value="half-day">Half Day</option>
                                        <option value="on-leave">On Leave</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button type="button" onClick={() => setIsMarkModalOpen(false)} className="px-6 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-brand-blue text-white rounded-full hover:bg-blue-700">Mark Attendance</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Attendance Details Modal */}
            {isDetailModalOpen && selectedRecord && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Attendance Details</h3>
                                <button onClick={() => setIsDetailModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <i data-lucide="x" className="h-6 w-6"></i>
                                </button>
                            </div>
                            <div className="space-y-8">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-20 w-20 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-2xl mr-6 shadow-lg">
                                        {selectedRecord.initials}
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-gray-900">{selectedRecord.employeeName}</h4>
                                        <p className="text-gray-600 text-lg">{selectedRecord.department}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-gray-50 p-6 rounded-2xl">
                                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Attendance Information</h5>
                                        <div className="space-y-3">
                                            <div className="flex justify-between"><span className="text-gray-500">Date:</span> <span className="font-semibold">2023-11-15</span></div>
                                            <div className="flex justify-between"><span className="text-gray-500">Check-in:</span> <span className="font-semibold text-brand-blue">{selectedRecord.checkIn}</span></div>
                                            <div className="flex justify-between"><span className="text-gray-500">Check-out:</span> <span className="font-semibold">{selectedRecord.checkOut}</span></div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-2xl">
                                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Status Information</h5>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Status:</span>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${selectedRecord.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>{selectedRecord.status.toUpperCase()}</span>
                                            </div>
                                            <div className="flex justify-between"><span className="text-gray-500">Working Hours:</span> <span className="font-semibold">8.5 hours</span></div>
                                            <div className="flex justify-between"><span className="text-gray-500">Late Arrival:</span> <span className="font-semibold text-yellow-600">2 minutes</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-2xl">
                                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Recent Attendance</h5>
                                    <div className="space-y-4">
                                        {[
                                            { date: 'Nov 14, 2023', status: 'Present', color: 'bg-green-100 text-green-800', info: 'Check-in: 09:00 AM | Check-out: 06:00 PM' },
                                            { date: 'Nov 13, 2023', status: 'Late', color: 'bg-yellow-100 text-yellow-800', info: 'Check-in: 09:15 AM | Check-out: 06:00 PM' },
                                            { date: 'Nov 12, 2023', status: 'Present', color: 'bg-green-100 text-green-800', info: 'Check-in: 08:58 AM | Check-out: 05:52 PM' },
                                        ].map((record, i) => (
                                            <div key={i} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-semibold text-gray-900">{record.date}</span>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${record.color}`}>{record.status}</span>
                                                </div>
                                                <p className="text-xs text-gray-500">{record.info}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button onClick={() => setIsDetailModalOpen(false)} className="px-6 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50">Close</button>
                                    <button onClick={() => { setIsDetailModalOpen(false); setIsMarkModalOpen(true); }} className="px-6 py-2 bg-brand-blue text-white rounded-full hover:bg-blue-700">Edit Attendance</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceManagement;
