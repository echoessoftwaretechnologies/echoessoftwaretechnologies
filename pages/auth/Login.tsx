import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowRight, Globe, ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const authenticateUser = (un: string, pw: string) => {
        const validCredentials = [
            { username: 'admin@echoess.in', password: 'Echoes!Tech$Secure^Cloud_91' },
            { username: 'user@echoess.in', password: 'Echoes!Tech$Secure^Cloud_91' }
        ];

        return validCredentials.some(cred =>
            cred.username === un && cred.password === pw
        );
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (authenticateUser(username, password)) {
            // Redirect to 2FA verification page using navigate
            navigate(`/two-factor-setup?username=${encodeURIComponent(username)}&remember=${remember}`);
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-navy-950 relative overflow-hidden font-sans selection:bg-brand-blue-500/30">
            {/* Animated Mesh Gradients */}
            <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-brand-blue-600/20 blur-[120px] rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-navy-800/30 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

            <div className={`w-full max-w-md z-10 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Link to="/" className="flex justify-center mb-10 group transition-transform duration-500 hover:scale-105">
                    <img src="/assets/2.png" alt="Echoes Software Technologies" className="w-[180px] brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
                </Link>

                <div className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
                    {/* Inner Glass Glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-blue-500/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-blue-500/10 border border-brand-blue-500/20 mb-4 shadow-inner">
                            <ShieldCheck className="w-8 h-8 text-brand-blue-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Admin Access</h1>
                        <p className="text-navy-300 font-medium">Secure authentication for enterprise core</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-navy-200 uppercase tracking-widest ml-1">Username</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-navy-400 group-focus-within/input:text-brand-blue-400 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white/[0.05] border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-brand-blue-500/50 focus:border-brand-blue-500 transition-all outline-none placeholder:text-navy-500"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-navy-200 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-navy-400 group-focus-within/input:text-brand-blue-400 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/[0.05] border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-brand-blue-500/50 focus:border-brand-blue-500 transition-all outline-none placeholder:text-navy-500"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        className="sr-only p-2"
                                    />
                                    <div className={`w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${remember ? 'bg-brand-blue-600 border-brand-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-transparent border-white/20'}`}>
                                        {remember && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-navy-300 group-hover:text-white transition-colors">Remember device</span>
                            </label>
                            <button type="button" className="text-sm font-bold text-brand-blue-400 hover:text-brand-blue-300 transition-colors uppercase tracking-wider">Reset</button>
                        </div>

                        <button
                            type="submit"
                            className="w-full group relative overflow-hidden bg-brand-blue-600 hover:bg-brand-blue-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-brand-blue-900/20 active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer"></div>
                            <span className="relative flex items-center justify-center">
                                Authenticate System
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 flex flex-col gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all border border-white/10 hover:border-white/20"
                        >
                            <Globe className="w-4 h-4 text-brand-blue-400" />
                            Return to Website
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-navy-400 text-sm font-medium">
                        System encrypted with AES-256. <span className="text-navy-300">Need support?</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
