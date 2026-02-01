import React, { useState, useEffect, useRef } from 'react';

declare global {
    interface Window {
        lucide: any;
        Chart: any;
    }
}

const AdminDashboard: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState('Admin');
    const attendanceChartRef = useRef<HTMLCanvasElement>(null);
    const clientGrowthChartRef = useRef<HTMLCanvasElement>(null);

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

        // Initialize Charts
        if (window.Chart) {
            if (attendanceChartRef.current) {
                new window.Chart(attendanceChartRef.current, {
                    type: 'line',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'Attendance Rate',
                            data: [95, 92, 98, 90, 88, 75, 80],
                            borderColor: '#1864ff',
                            backgroundColor: 'rgba(24, 100, 255, 0.1)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { display: true }
                        },
                        scales: {
                            y: {
                                beginAtZero: false,
                                min: 70,
                                max: 100
                            }
                        }
                    }
                });
            }

            if (clientGrowthChartRef.current) {
                new window.Chart(clientGrowthChartRef.current, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: 'New Clients',
                            data: [12, 19, 15, 22, 18, 25],
                            backgroundColor: '#1864ff',
                            borderColor: '#1864ff',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { display: true }
                        },
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });
            }
        }
    }, [isSidebarOpen]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = '/index.html';
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
                            <a href="/pages/admin/admin-dashboard.html" className="px-4 py-2 text-sm font-medium bg-brand-blue text-white rounded-full transition-colors">
                                <i data-lucide="home" className="h-4 w-4 inline mr-2" /> Home
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
                            <a href="/pages/admin/employee-management.html" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                                <i data-lucide="user" className="h-5 w-5" /> <span>Employee Management</span>
                            </a>
                            <a href="/pages/auth/password-manager.html" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                                <i data-lucide="key" className="h-5 w-5" /> <span>Password Manager</span>
                            </a>
                            {/* Assuming invoice generator will be in tools */}
                            <a href="/pages/tools/invoice-generator.html" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                                <i data-lucide="file-text" className="h-5 w-5" /> <span>Invoice Generator</span>
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <a href="/pages/admin/crm-management.html" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <i data-lucide="users" className="h-6 w-6 text-brand-blue"></i>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">CRM Management</h3>
                                </div>
                                <p className="text-gray-600">Manage customer relationships, sales pipeline, and client interactions.</p>
                            </a>

                            <a href="/pages/admin/attendance-management.html" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <i data-lucide="calendar" className="h-6 w-6 text-brand-blue"></i>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Attendance Management</h3>
                                </div>
                                <p className="text-gray-600">Track employee attendance, schedules, and time management.</p>
                            </a>

                            <a href="/pages/admin/employee-management.html" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <i data-lucide="user" className="h-6 w-6 text-brand-blue"></i>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Employee Management</h3>
                                </div>
                                <p className="text-gray-600">Manage employee profiles, permissions, and performance metrics.</p>
                            </a>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">System Overview</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                        <div className="text-2xl font-bold text-brand-blue">128</div>
                                        <div className="text-sm text-gray-600">Total Employees</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                        <div className="text-2xl font-bold text-brand-blue">42</div>
                                        <div className="text-sm text-gray-600">Active Clients</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                        <div className="text-2xl font-bold text-brand-blue">96%</div>
                                        <div className="text-sm text-gray-600">Attendance Rate</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                        <div className="text-2xl font-bold text-brand-blue">24</div>
                                        <div className="text-sm text-gray-600">Pending Tasks</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">System Health</span>
                                            <span className="text-sm font-medium text-green-600">98%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">Data Security</span>
                                            <span className="text-sm font-medium text-green-600">100%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">Performance</span>
                                            <span className="text-sm font-medium text-yellow-600">85%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                                <div className="space-y-4">
                                    {[
                                        { text: 'New client John Smith added to CRM', time: '2 minutes ago' },
                                        { text: 'Employee Sarah Johnson marked attendance', time: '15 minutes ago' },
                                        { text: 'New task assigned to Development Team', time: '1 hour ago' },
                                        { text: 'System maintenance scheduled for tomorrow', time: '2 hours ago' },
                                    ].map((act, i) => (
                                        <div key={i} className="flex items-start">
                                            <div className="w-2 h-2 bg-brand-blue rounded-full mt-2 mr-3"></div>
                                            <div>
                                                <p className="text-sm text-gray-900">{act.text}</p>
                                                <p className="text-xs text-gray-500">{act.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
                                <div className="space-y-4">
                                    {[
                                        { title: 'Team Meeting', desc: '10:00 AM - Conference Room', tag: 'Today', tagColor: 'bg-blue-100 text-blue-800' },
                                        { title: 'Client Presentation', desc: '2:00 PM - Client Office', tag: 'Today', tagColor: 'bg-green-100 text-green-800' },
                                        { title: 'Project Deadline', desc: '5:00 PM - Online', tag: 'Tomorrow', tagColor: 'bg-yellow-100 text-yellow-800' },
                                        { title: 'Quarterly Review', desc: '9:00 AM - Main Hall', tag: 'Jan 15', tagColor: 'bg-gray-100 text-gray-800' },
                                    ].map((ev, i) => (
                                        <div key={i} className="p-3 border border-gray-200 rounded-2xl">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{ev.title}</h4>
                                                    <p className="text-sm text-gray-600">{ev.desc}</p>
                                                </div>
                                                <span className={`text-sm ${ev.tagColor} px-2 py-1 rounded`}>{ev.tag}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Charts</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <canvas ref={attendanceChartRef} />
                                </div>
                                <div>
                                    <canvas ref={clientGrowthChartRef} />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
