import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, ArrowLeft, RefreshCw, KeyRound, Smartphone } from 'lucide-react';

const TwoFactorSetup: React.FC = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);
    const [secret, setSecret] = useState('');
    const [username, setUsername] = useState('admin');
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoaded(true);
        const urlParams = new URLSearchParams(window.location.search);
        const un = urlParams.get('username') || 'admin';
        const rem = urlParams.get('remember') === 'true';
        setUsername(un);

        const newSecret = generateSecret();
        setSecret(newSecret);

        // Store temporary data
        localStorage.setItem('tempSecret', newSecret);
        localStorage.setItem('tempUsername', un);
        localStorage.setItem('rememberChoice', rem.toString());

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev <= 1 ? 30 : prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (secret && (window as any).QRCode) {
            const issuer = 'Echoes Software Technologies';
            const account = `${issuer}:${username}`;
            const encodedSecret = encodeURIComponent(secret);
            const issuerParam = encodeURIComponent(issuer);
            const totpUrl = `otpauth://totp/${account}?secret=${encodedSecret}&issuer=${issuerParam}`;

            const qrContainer = document.getElementById('qrCode');
            if (qrContainer) {
                qrContainer.innerHTML = '';
                new (window as any).QRCode(qrContainer, {
                    text: totpUrl,
                    width: 200,
                    height: 200,
                    colorDark: "#1864ff",
                    colorLight: "#0a0c10",
                    correctLevel: (window as any).QRCode.CorrectLevel.H
                });
            }
        }
    }, [secret, username]);

    const generateSecret = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        let s = '';
        for (let i = 0; i < 16; i++) {
            s += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return s;
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (verificationCode.length === 6 && /^\d{6}$/.test(verificationCode)) {
            const un = localStorage.getItem('tempUsername');
            const rem = localStorage.getItem('rememberChoice') === 'true';

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', un || 'admin');

            if (rem) {
                localStorage.setItem('rememberedUser', un || 'admin');
            } else {
                localStorage.removeItem('rememberedUser');
            }

            // Clean up temporary data
            localStorage.removeItem('tempSecret');
            localStorage.removeItem('tempUsername');
            localStorage.removeItem('rememberChoice');

            // Redirect using navigate
            navigate('/admin/dashboard');
        } else {
            alert('Invalid verification code.');
            setVerificationCode('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-navy-950 relative overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-brand-blue-600/10 blur-[130px] rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-indigo-900/20 blur-[130px] rounded-full animate-pulse-slow" style={{ animationDelay: '3s' }}></div>

            <div className={`w-full max-w-lg z-10 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                    {/* Brand Header */}
                    <div className="flex justify-center mb-10">
                        <img src="/assets/2.png" alt="Echoes Tech" className="w-[160px] brightness-0 invert opacity-80" />
                    </div>

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-brand-blue-500/10 border border-brand-blue-500/20 mb-6 shadow-2xl">
                            <Smartphone className="w-10 h-10 text-brand-blue-400 animate-bounce-slow" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-3">Two-Factor Authentication</h1>
                        <p className="text-navy-300 font-medium px-4">Secure your endpoint using Google Authenticator</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 mb-10 items-center bg-white/[0.02] p-8 rounded-3xl border border-white/5 shadow-inner">
                        <div className="flex-shrink-0">
                            <div id="qrCode" className="bg-white p-3 rounded-2xl border-4 border-brand-blue-500/30 overflow-hidden shadow-2xl shadow-brand-blue-900/20">
                                {/* QR Code rendered here with dark background */}
                            </div>
                        </div>

                        <div className="flex flex-col flex-1 text-center md:text-left">
                            <div className="mb-6">
                                <span className="text-xs font-bold text-navy-400 uppercase tracking-[0.2em] mb-2 block">Manual Key</span>
                                <div className="flex items-center gap-3 p-4 bg-brand-blue-950/40 rounded-2xl border border-brand-blue-500/20 group hover:border-brand-blue-400/40 transition-colors">
                                    <KeyRound className="w-5 h-5 text-brand-blue-400" />
                                    <code className="text-brand-blue-100 font-mono text-lg tracking-widest leading-none">{secret}</code>
                                </div>
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <div className="relative w-10 h-10 flex items-center justify-center">
                                    <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                                        <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/5" />
                                        <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="3" className="text-brand-blue-500 transition-all duration-1000" style={{ strokeDasharray: '113', strokeDashoffset: (113 - (timeLeft / 30) * 113).toString() }} />
                                    </svg>
                                    <span className="text-[10px] font-black text-white">{timeLeft}</span>
                                </div>
                                <span className="text-sm font-bold text-navy-200 tracking-wide">TOKEN ROTATION</span>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-8" onSubmit={handleFormSubmit}>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-navy-200 uppercase tracking-[0.15em]">Verification Code</label>
                                <span className="text-[10px] font-black bg-brand-blue-500/20 text-brand-blue-400 px-2 py-1 rounded-md border border-brand-blue-500/30 uppercase">Required</span>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    maxLength={6}
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="w-full bg-white/[0.05] border border-white/10 text-white py-5 rounded-2xl focus:ring-4 focus:ring-brand-blue-500/20 focus:border-brand-blue-500 transition-all outline-none text-center text-4xl font-black tracking-[0.5em] placeholder:text-navy-700 placeholder:tracking-normal"
                                    placeholder="000 000"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <div className="w-1.5 h-1.5 bg-brand-blue-500 animate-ping rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full group relative overflow-hidden bg-brand-blue-600 hover:bg-brand-blue-500 text-white font-black py-5 px-6 rounded-2xl transition-all duration-500 shadow-2xl shadow-brand-blue-900/40 active:scale-[0.98] uppercase tracking-[0.2em]"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-shimmer"></div>
                            <span className="relative flex items-center justify-center gap-3">
                                SECURE BYPASS
                                <ShieldCheck className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                            </span>
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 flex flex-col gap-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="flex items-center justify-center gap-2 w-full py-4 px-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.08] text-navy-300 hover:text-white font-bold transition-all border border-white/5 hover:border-white/10 group uppercase text-xs tracking-widest"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Return to Entry Point
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center flex items-center justify-center gap-6">
                    <p className="text-navy-500 text-[10px] font-black uppercase tracking-[0.3em]">
                        Encryption: SHA-256 HMAC
                    </p>
                    <div className="w-1 h-1 bg-navy-700 rounded-full"></div>
                    <p className="text-navy-500 text-[10px] font-black uppercase tracking-[0.3em]">
                        Endpoint: {username}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TwoFactorSetup;
