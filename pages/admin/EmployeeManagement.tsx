import React, { useState, useEffect } from 'react';

declare global {
    interface Window {
        lucide: any;
    }
}

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState('Admin');
    const [employees, setEmployees] = useState<Employee[]>([
        { id: '1', firstName: 'John', lastName: 'Doe', email: 'johndoe@echoes.com', position: 'Senior Developer', department: 'Engineering', status: 'active', joinDate: '2022-03-15', initials: 'JD', phone: '+1 (555) 123-4567' },
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
        alert(`Employee ${employee.firstName} ${employee.lastName} added successfully!`);
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
                            <a href="/pages/admin/employee-management.html" className="px-4 py-2 text-sm font-medium bg-brand-blue text-white rounded-full transition-colors">
                                <i data-lucide="user" className="h-4 w-4 inline mr-2" /> Employees
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
                            <a href="/pages/admin/attendance-management.html" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                                <i data-lucide="calendar" className="h-5 w-5" /> <span>Attendance Management</span>
                            </a>
                            <a href="/pages/admin/employee-management.html" className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-brand-blue rounded-full">
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
                            <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
                            <button onClick={() => setIsAddModalOpen(true)} className="bg-brand-blue text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors">
                                Add New Employee
                            </button>
                        </div>

                        {/* Employee Overview Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            {[
                                { val: '128', label: 'Total Employees', icon: 'users', color: 'bg-blue-100 text-brand-blue' },
                                { val: '122', label: 'Active Employees', icon: 'user-check', color: 'bg-green-100 text-green-600' },
                                { val: '6', label: 'Pending Onboarding', icon: 'user-plus', color: 'bg-yellow-100 text-yellow-600' },
                                { val: '94%', label: 'Satisfaction', icon: 'trending-up', color: 'bg-purple-100 text-purple-600' },
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

                        {/* Employee Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                                <h2 className="text-xl font-semibold text-gray-900">Employee Directory</h2>
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
                                        value={departmentFilter}
                                        onChange={(e) => setDepartmentFilter(e.target.value)}
                                        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                                    >
                                        <option value="all">All Departments</option>
                                        <option value="engineering">Engineering</option>
                                        <option value="marketing">Marketing</option>
                                        <option value="sales">Sales</option>
                                        <option value="hr">HR</option>
                                        <option value="finance">Finance</option>
                                    </select>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredEmployees.map(emp => (
                                            <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold">
                                                            {emp.initials}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{emp.firstName} {emp.lastName}</div>
                                                            <div className="text-sm text-gray-500">{emp.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{emp.position}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{emp.department}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${emp.status === 'active' ? 'bg-green-100 text-green-800' :
                                                            emp.status === 'probation' ? 'bg-yellow-100 text-yellow-800' :
                                                                emp.status === 'on-leave' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {emp.status.charAt(0).toUpperCase() + emp.status.slice(1).replace('-', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.joinDate}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button onClick={() => alert('Edit employee ID: ' + emp.id)} className="text-brand-blue hover:text-blue-700 mr-3">Edit</button>
                                                    <button onClick={() => handleViewDetail(emp)} className="text-gray-600 hover:text-gray-900">View</button>
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

            {/* Add Employee Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Add New Employee</h3>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <i data-lucide="x" className="h-6 w-6"></i>
                                </button>
                            </div>
                            <form onSubmit={handleAddEmployee} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input type="text" required value={newEmployee.firstName} onChange={e => setNewEmployee({ ...newEmployee, firstName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input type="text" required value={newEmployee.lastName} onChange={e => setNewEmployee({ ...newEmployee, lastName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" required value={newEmployee.email} onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                                        <input type="text" required value={newEmployee.position} onChange={e => setNewEmployee({ ...newEmployee, position: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                        <select required value={newEmployee.department} onChange={e => setNewEmployee({ ...newEmployee, department: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue">
                                            <option value="">Select Department</option>
                                            <option value="Engineering">Engineering</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Sales">Sales</option>
                                            <option value="HR">HR</option>
                                            <option value="Finance">Finance</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                        <input type="date" required value={newEmployee.startDate} onChange={e => setNewEmployee({ ...newEmployee, startDate: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select value={newEmployee.status} onChange={e => setNewEmployee({ ...newEmployee, status: e.target.value as any })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue">
                                            <option value="active">Active</option>
                                            <option value="probation">Probation</option>
                                            <option value="on-leave">On Leave</option>
                                            <option value="terminated">Terminated</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input type="tel" value={newEmployee.phone} onChange={e => setNewEmployee({ ...newEmployee, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                                </div>
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-brand-blue text-white rounded-full hover:bg-blue-700">Add Employee</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Employee Details Modal */}
            {isDetailModalOpen && selectedEmployee && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Employee Details</h3>
                                <button onClick={() => setIsDetailModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <i data-lucide="x" className="h-6 w-6"></i>
                                </button>
                            </div>
                            <div className="space-y-8">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-20 w-20 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-2xl mr-6 shadow-lg">
                                        {selectedEmployee.initials}
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-gray-900">{selectedEmployee.firstName} {selectedEmployee.lastName}</h4>
                                        <p className="text-gray-600 text-lg">{selectedEmployee.position}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-gray-50 p-6 rounded-2xl">
                                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contact Information</h5>
                                        <div className="space-y-3">
                                            <div className="flex justify-between"><span className="text-gray-500">Email:</span> <span className="font-semibold text-brand-blue">{selectedEmployee.email}</span></div>
                                            <div className="flex justify-between"><span className="text-gray-500">Phone:</span> <span className="font-semibold">{selectedEmployee.phone || 'N/A'}</span></div>
                                            <div className="flex justify-between"><span className="text-gray-500">Department:</span> <span className="font-semibold">{selectedEmployee.department}</span></div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-2xl">
                                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Employment Details</h5>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Status:</span>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${selectedEmployee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>{selectedEmployee.status.toUpperCase()}</span>
                                            </div>
                                            <div className="flex justify-between"><span className="text-gray-500">Start Date:</span> <span className="font-semibold">{selectedEmployee.joinDate}</span></div>
                                            <div className="flex justify-between"><span className="text-gray-500">Employee ID:</span> <span className="font-semibold">EMP-{selectedEmployee.id.padStart(3, '0')}</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-2xl">
                                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Recent Activity</h5>
                                    <div className="space-y-4">
                                        {[
                                            { title: 'Completed project milestone', time: '2 days ago' },
                                            { title: 'Attended team meeting', time: '1 week ago' },
                                            { title: 'Submitted performance review', time: '2 weeks ago' },
                                        ].map((activity, i) => (
                                            <div key={i} className="flex items-start">
                                                <div className="w-2 h-2 bg-brand-blue rounded-full mt-2 mr-3 shadow-sm shadow-blue-200"></div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button onClick={() => setIsDetailModalOpen(false)} className="px-6 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50">Close</button>
                                    <button onClick={() => { setIsDetailModalOpen(false); setIsAddModalOpen(true); }} className="px-6 py-2 bg-brand-blue text-white rounded-full hover:bg-blue-700">Edit Employee</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeManagement;
