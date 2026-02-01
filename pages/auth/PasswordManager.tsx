import React, { useState, useEffect } from 'react';

declare global {
    interface Window {
        lucide: any;
    }
}

const PasswordManager: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [currentUser, setCurrentUser] = useState('Admin');

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
    }, [isSidebarOpen, isModalOpen]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = '/index.html';
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const passwords = [
        { id: 1, service: 'Google', url: 'google.com', username: 'user@example.com', category: 'Work', strength: 90, lastUpdated: '2023-11-15' },
        { id: 2, service: 'Facebook', url: 'facebook.com', username: 'user@example.com', category: 'Social', strength: 60, lastUpdated: '2023-10-22' },
        { id: 3, service: 'GitHub', url: 'github.com', username: 'developer', category: 'Work', strength: 95, lastUpdated: '2023-11-10' },
        { id: 4, service: 'Amazon', url: 'amazon.com', username: 'user@example.com', category: 'Personal', strength: 40, lastUpdated: '2023-09-15' },
    ];

    const filteredPasswords = passwords.filter(pw => {
        const matchesSearch = pw.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pw.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || pw.category.toLowerCase() === categoryFilter.toLowerCase();
        return matchesSearch && matchesCategory;
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
                            <a href="/pages/auth/password-manager.html" className="px-4 py-2 text-sm font-medium bg-brand-blue text-white rounded-full transition-colors">
                                <i data-lucide="key" className="h-4 w-4 inline mr-2" /> Password Manager
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
                            <a href="/pages/auth/password-manager.html" className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-brand-blue rounded-full">
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
                            <h1 className="text-3xl font-bold text-gray-900">Password Manager</h1>
                            <button onClick={toggleModal} className="bg-brand-blue text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors">
                                Add New Password
                            </button>
                        </div>

                        {/* Cards Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <i data-lucide="key" className="h-6 w-6 text-brand-blue" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">24</p>
                                        <p className="text-sm text-gray-600">Total Passwords</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <i data-lucide="shield-check" className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">18</p>
                                        <p className="text-sm text-gray-600">Secure Passwords</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                                        <i data-lucide="alert-triangle" className="h-6 w-6 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">4</p>
                                        <p className="text-sm text-gray-600">Weak Passwords</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                        <i data-lucide="refresh-cw" className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">2</p>
                                        <p className="text-sm text-gray-600">Expiring Soon</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stored Passwords Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                                <h2 className="text-xl font-semibold text-gray-900">Stored Passwords</h2>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search passwords..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                                        />
                                        <i data-lucide="search" className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                                    >
                                        <option value="all">All Categories</option>
                                        <option value="work">Work</option>
                                        <option value="personal">Personal</option>
                                        <option value="social">Social</option>
                                        <option value="finance">Finance</option>
                                    </select>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strength</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredPasswords.map(pw => (
                                            <tr key={pw.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold">
                                                            {pw.service.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{pw.service}</div>
                                                            <div className="text-sm text-gray-500">{pw.url}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{pw.username}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pw.category === 'Work' ? 'bg-blue-100 text-blue-800' :
                                                            pw.category === 'Social' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {pw.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2 min-w-[50px]">
                                                            <div className={`h-2 rounded-full ${pw.strength > 80 ? 'bg-green-600' : pw.strength > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${pw.strength}%` }}></div>
                                                        </div>
                                                        <span className={`text-sm ${pw.strength > 80 ? 'text-green-600' : pw.strength > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                            {pw.strength > 80 ? 'Strong' : pw.strength > 50 ? 'Medium' : 'Weak'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pw.lastUpdated}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button onClick={() => alert('View logic')} className="text-brand-blue hover:text-blue-700 mr-3">View</button>
                                                    <button onClick={() => alert('Edit logic')} className="text-gray-600 hover:text-gray-900">Edit</button>
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

            {/* Add Password Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Add New Password</h3>
                                <button onClick={toggleModal} className="text-gray-400 hover:text-gray-600">
                                    <i data-lucide="x" className="h-6 w-6" />
                                </button>
                            </div>
                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Saved!'); toggleModal(); }}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                                    <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Username/Email</label>
                                    <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input type="password" required className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue">
                                        <option value="work">Work</option>
                                        <option value="personal">Personal</option>
                                        <option value="social">Social</option>
                                        <option value="finance">Finance</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                                    <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-brand-blue" />
                                </div>
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button type="button" onClick={toggleModal} className="px-6 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-brand-blue text-white rounded-full hover:bg-blue-700">Save Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PasswordManager;
