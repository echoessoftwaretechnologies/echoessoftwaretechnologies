import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Users, Calendar, User as UserIcon, Key, FileText,
    LayoutDashboard, LogOut, Menu, X, Bell, Search,
    Activity, Shield, Globe, Handshake, Building2, Wallet, CalendarCheck
} from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState('Admin');
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsLoaded(true);
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            navigate('/login');
        }

        const user = localStorage.getItem('currentUser');
        if (user) {
            setCurrentUser(user);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Users, label: 'CRM / Sales', path: '/admin/crm-management' },
        { icon: Calendar, label: 'Attendance', path: '/admin/attendance-management' },
        { icon: UserIcon, label: 'Human Resources', path: '/admin/employee-management' },
        { icon: Handshake, label: 'Tie-up Management', path: '/admin/tie-up-management' },
        { icon: Building2, label: 'Branch Management', path: '/admin/branch-management' },
        { icon: Wallet, label: 'Account Management', path: '/admin/account-management' },
        { icon: CalendarCheck, label: 'Meeting Arrangement', path: '/admin/meeting-arrangement' },
        { icon: Key, label: 'Password Safe', path: '/password-manager' },
        { icon: FileText, label: 'Invoice Studio', path: '/admin/invoice-generator' },
    ];

    return (
        <div className="min-h-screen bg-navy-50 dark:bg-navy-950 font-sans selection:bg-brand-blue-500/30 transition-colors duration-500">
            {/* Sidebar Desktop */}
            <aside className={`fixed top-0 left-0 h-full w-72 bg-white/80 dark:bg-navy-900/50 backdrop-blur-3xl border-r border-navy-200 dark:border-white/5 z-[60] transition-all duration-500 ease-soft ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex flex-col h-full px-6 py-8">
                    <div className="flex items-center gap-3 px-2 mb-12">
                        <div className="w-10 h-10 bg-brand-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue-900/40">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <img src="/assets/2.png" alt="Echoes" className="w-[120px] dark:brightness-0 dark:invert opacity-90" />
                    </div>

                    <nav className="flex-1 space-y-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {menuItems.map((item, idx) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        navigate(item.path);
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-brand-blue-600/10 text-brand-blue-600 dark:text-brand-blue-400 border border-brand-blue-500/20 shadow-inner' : 'text-navy-600 dark:text-navy-300 hover:text-brand-blue-600 dark:hover:text-white hover:bg-brand-blue-50 dark:hover:bg-white/5 border border-transparent'}`}
                                >
                                    <Icon className={`w-5 h-5 transition-transform duration-500 group-hover:scale-110 ${isActive ? 'text-brand-blue-600 dark:text-brand-blue-400' : 'text-navy-400 dark:text-navy-400'}`} />
                                    <span className="font-bold text-sm tracking-wide uppercase">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    <div className="mt-auto pt-8 border-t border-navy-100 dark:border-white/5">
                        <div className="p-4 bg-navy-50 dark:bg-white/[0.03] border border-navy-100 dark:border-white/5 rounded-2xl mb-4 group hover:bg-navy-100 dark:hover:bg-white/[0.05] transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-navy-800 flex items-center justify-center text-navy-900 dark:text-navy-400 font-black border border-navy-200 dark:border-white/10 group-hover:border-brand-blue-500/50 group-hover:text-brand-blue-600 dark:group-hover:text-brand-blue-400 transition-all">
                                    {currentUser[0]}
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-black text-navy-900 dark:text-white">{currentUser}</div>
                                    <div className="text-[10px] font-bold text-navy-500 uppercase tracking-widest leading-none mt-1">SUPER_ADMIN</div>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500/70 hover:text-red-500 hover:bg-red-500/5 transition-all group border border-transparent hover:border-red-500/20">
                            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold text-sm tracking-wide uppercase">Terminate Session</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Wrapper */}
            <div className={`lg:pl-72 transition-all duration-500 ${isSidebarOpen ? 'blur-sm lg:blur-none' : ''}`}>
                {/* Header */}
                <header className="h-20 bg-white/80 dark:bg-navy-950/50 backdrop-blur-xl border-b border-navy-100 dark:border-white/5 sticky top-0 z-50 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden w-10 h-10 rounded-xl bg-navy-50 dark:bg-navy-900 flex items-center justify-center text-navy-900 dark:text-white border border-navy-200 dark:border-white/10">
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="hidden sm:flex items-center gap-3 text-navy-500 dark:text-navy-400">
                            <LayoutDashboard className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">System Matrix / {title}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 dark:text-navy-500" />
                            <input className="bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-navy-900 dark:text-white placeholder:text-navy-400 dark:placeholder:text-navy-600 focus:outline-none focus:ring-1 focus:ring-brand-blue-500 w-64 transition-all" placeholder="Search system core..." />
                        </div>
                        <ThemeToggle />
                        <button className="relative w-10 h-10 rounded-xl bg-navy-50 dark:bg-navy-900 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:text-brand-blue-600 dark:hover:text-white transition-colors border border-navy-200 dark:border-white/10">
                            <Bell className="w-5 h-5" />
                            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-blue-500 rounded-full border-2 border-white dark:border-navy-900"></div>
                        </button>
                        <button onClick={() => navigate('/')} className="px-5 py-2 rounded-full bg-brand-blue-600/10 text-brand-blue-600 dark:text-brand-blue-400 border border-brand-blue-500/30 text-xs font-black uppercase tracking-widest hover:bg-brand-blue-600 hover:text-white transition-all">
                            Live Site
                        </button>
                    </div>
                </header>

                <main className={`p-8 lg:p-12 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="max-w-[1400px] mx-auto space-y-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="text-left">
                                <div className="flex items-center gap-2 text-brand-blue-600 dark:text-brand-blue-400 font-black text-xs uppercase tracking-[0.3em] mb-3">
                                    <Shield className="w-3.5 h-3.5 fill-brand-blue-400/20" />
                                    {subtitle || 'Operational Core'}
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none text-navy-950 dark:text-white">{title}.</h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-white dark:bg-white/5 border border-navy-100 dark:border-white/5 p-4 rounded-2xl shadow-sm">
                                    <div className="text-[10px] font-bold text-navy-500 uppercase tracking-widest mb-1 leading-none">Status</div>
                                    <div className="text-xl font-black text-brand-blue-600 dark:text-brand-blue-400 leading-none flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-brand-blue-500 animate-pulse"></div>
                                        ACTIVE
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-navy-900 dark:text-white">
                            {children}
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-[55] lg:hidden animate-fade-in"
                />
            )}
        </div>
    );
};

export default AdminLayout;
