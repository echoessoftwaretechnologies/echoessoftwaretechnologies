import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

declare global {
    interface Window {
        lucide: any;
    }
}

const Contact: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        company: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const state = location.state as { subject?: string } | null;
        if (state?.subject) {
            setFormData(prev => ({ ...prev, subject: state.subject || '' }));
            // Clear location state to prevent flickering or re-filling on refresh/navigate back
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { firstName, lastName, phone, email, company, subject, message } = formData;

        const whatsappMessage = `Hey, I'm ${firstName} ${lastName} and my company name is ${company}.

Regarding the subject about ${subject}, I'm contacting you for:
${message}

My contact details:
Phone: ${phone}
Email: ${email}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/918148549511?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div className="bg-white min-h-screen selection:bg-brand-blue-100 selection:text-brand-blue-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {/* Navigation */}
            <header className="fixed top-0 w-full z-[100] transition-all duration-500 bg-white/80 backdrop-blur-2xl border-b border-navy-100/50">
                <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <img src="/assets/2.png" alt="Echoes Logo" className="h-10 w-auto" />
                    </Link>

                    <nav className="hidden md:flex items-center gap-12">
                        {['Home', 'Solutions', 'Services', 'About', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className={`text-sm font-black uppercase tracking-[0.2em] transition-all relative group nav-blip ${item === 'Contact' ? 'text-brand-blue-600 active' : 'text-navy-900 hover:text-brand-blue-600'}`}
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={handleGetStarted}
                            className="hidden md:flex premium-gradient text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-brand-blue-500/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            Login
                        </button>
                        <button onClick={toggleMobileMenu} className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-navy-50 dark:bg-navy-900 text-navy-900 dark:text-white active:scale-90 transition-transform">
                            <i data-lucide="menu" className="w-6 h-6"></i>
                        </button>
                    </div>
                </div>
            </header>

            {/* Premium Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[200] md:hidden">
                    <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm animate-fade-in" onClick={toggleMobileMenu} />
                    <div className="absolute top-0 right-0 w-3/4 h-full bg-white shadow-2xl animate-slide-in-right flex flex-col">
                        <div className="p-8 flex justify-between items-center border-b border-navy-50">
                            <img src="/assets/2.png" alt="Echoes Logo" className="h-8 w-auto" />
                            <button onClick={toggleMobileMenu} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-navy-50 text-navy-900 active:rotate-90 transition-transform duration-300">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                        <nav className="flex-1 px-8 py-12 flex flex-col gap-10">
                            {['Home', 'Solutions', 'Services', 'About', 'Contact'].map((item, i) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    onClick={toggleMobileMenu}
                                    className={`text-3xl font-black uppercase tracking-tighter transition-all ${item === 'Contact' ? 'text-brand-blue-600 pl-4 border-l-4 border-brand-blue-600' : 'text-navy-950 hover:text-brand-blue-600'}`}
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                        <div className="p-8 border-t border-navy-50 space-y-8">
                            <button onClick={handleGetStarted} className="w-full premium-gradient text-white py-5 rounded-3xl font-black uppercase tracking-widest">Login</button>
                        </div>
                    </div>
                </div>
            )}

            <main className="pt-24">
                {/* Hero Section */}
                <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-navy-950">
                    <div className="absolute inset-0">
                        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-blue-600/30 rounded-full blur-[150px] animate-float-slow"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-blue-400/20 rounded-full blur-[150px] animate-float-slow" style={{ animationDelay: '-3s' }}></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-10">
                        <div className="inline-block px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in-down">
                            <span className="text-brand-blue-400 font-black tracking-[0.3em] text-xs uppercase">GET IN TOUCH</span>
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter animate-slide-up">
                            Initialize <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-400 to-brand-blue-100">Global Dialogue</span>
                        </h1>
                        <p className="text-2xl text-navy-200 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in delay-500">
                            Partner with elite architecture teams to build your enterprise legacy.
                        </p>
                    </div>
                </section>

                {/* Form & Info Section */}
                <section className="py-40 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid lg:grid-cols-12 gap-24">
                            {/* Left Column: Contact Info */}
                            <div className="lg:col-span-5 space-y-16">
                                <div className="space-y-6">
                                    <h2 className="text-brand-blue-600 font-black tracking-[0.3em] text-sm uppercase">CONTACT CHANNELS</h2>
                                    <h3 className="text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">Direct Access to <span className="text-brand-blue-600">Expertise</span></h3>
                                </div>

                                <div className="space-y-8">
                                    {[
                                        { title: "Our Headquarters", content: "Covai Main Road, Karur, Tamil Nadu, India", icon: "map-pin" },
                                        { title: "Secure Communications", content: "+91 81485 49511\n+91 63796 44145", icon: "phone" },
                                        { title: "Digital Correspondence", content: "connect@echoess.in", icon: "mail" },
                                        { title: "Operational Hours", content: "Monday - Friday: 09:00 - 18:00 PST", icon: "clock" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-8 group">
                                            <div className="w-16 h-16 bg-navy-50 rounded-2xl flex-shrink-0 flex items-center justify-center group-hover:bg-brand-blue-600 transition-all duration-500">
                                                <i data-lucide={item.icon} className="w-8 h-8 text-brand-blue-600 group-hover:text-white"></i>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-black text-navy-400 uppercase tracking-widest">{item.title}</h4>
                                                <p className="text-xl text-navy-950 font-medium whitespace-pre-line leading-relaxed">{item.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: Premium Form */}
                            <div className="lg:col-span-7">
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-brand-blue-500/10 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="relative bg-white p-12 lg:p-16 rounded-[3.5rem] border border-navy-100 shadow-glass">
                                        <form className="space-y-8" onSubmit={handleSubmit}>
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label htmlFor="firstName" className="text-xs font-black uppercase text-navy-400 tracking-widest pl-2">First Name</label>
                                                    <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full bg-navy-50 border-none rounded-2xl px-6 py-4 text-navy-950 focus:ring-2 focus:ring-brand-blue-600 transition-all" />
                                                </div>
                                                <div className="space-y-3">
                                                    <label htmlFor="lastName" className="text-xs font-black uppercase text-navy-400 tracking-widest pl-2">Last Name</label>
                                                    <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full bg-navy-50 border-none rounded-2xl px-6 py-4 text-navy-950 focus:ring-2 focus:ring-brand-blue-600 transition-all" />
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label htmlFor="phone" className="text-xs font-black uppercase text-navy-400 tracking-widest pl-2">Secure Phone</label>
                                                    <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-navy-50 border-none rounded-2xl px-6 py-4 text-navy-950 focus:ring-2 focus:ring-brand-blue-600 transition-all" />
                                                </div>
                                                <div className="space-y-3">
                                                    <label htmlFor="email" className="text-xs font-black uppercase text-navy-400 tracking-widest pl-2">Corporate Email</label>
                                                    <input type="email" id="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-navy-50 border-none rounded-2xl px-6 py-4 text-navy-950 focus:ring-2 focus:ring-brand-blue-600 transition-all" />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label htmlFor="subject" className="text-xs font-black uppercase text-navy-400 tracking-widest pl-2">Inquiry Focus</label>
                                                <input type="text" id="subject" value={formData.subject} onChange={handleInputChange} required className="w-full bg-navy-50 border-none rounded-2xl px-6 py-4 text-navy-950 focus:ring-2 focus:ring-brand-blue-600 transition-all" />
                                            </div>
                                            <div className="space-y-3">
                                                <label htmlFor="message" className="text-xs font-black uppercase text-navy-400 tracking-widest pl-2">Project Vision</label>
                                                <textarea id="message" value={formData.message} onChange={handleInputChange} required rows={5} className="w-full bg-navy-50 border-none rounded-2xl px-6 py-4 text-navy-950 focus:ring-2 focus:ring-brand-blue-600 transition-all resize-none"></textarea>
                                            </div>
                                            <button type="submit" className="w-full premium-gradient text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                                                Initiate Transmission
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Global Offices Section */}
                <section className="py-40 bg-navy-50/50 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-24 space-y-6">
                            <h2 className="text-brand-blue-600 font-black tracking-[0.3em] text-sm uppercase">GLOBAL PRESENCE</h2>
                            <h3 className="text-5xl lg:text-7xl font-extrabold text-navy-950 tracking-tight leading-[1.1]">Strategic <span className="text-brand-blue-600">Command Centers</span></h3>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                { city: "Karur", country: "India", address: "Covai Main Road, Karur, Tamil Nadu", phone: "+91 81485 49511" },
                                { city: "Coimbatore", country: "India", address: "Thomas Street, Coimbatore, Tamil Nadu", phone: "+91 63796 44145" },
                                { city: "Coimbatore", country: "India", address: "Anna Salai, Coimbatore, Tamil Nadu", phone: "+91 63796 44145" }
                            ].map((office, i) => (
                                <div key={i} className="group bg-white p-12 rounded-[3.5rem] border border-navy-100 shadow-glass hover:shadow-premium transition-all duration-500 hover-lift relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue-500 to-brand-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="w-20 h-20 bg-brand-blue-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-brand-blue-600 transition-all duration-500">
                                        <i data-lucide="globe" className="w-10 h-10 text-brand-blue-600 group-hover:text-white"></i>
                                    </div>
                                    <h3 className="text-3xl font-black text-navy-950 mb-2 uppercase tracking-tight group-hover:text-brand-blue-600 transition-colors">{office.city}</h3>
                                    <p className="text-brand-blue-600 font-extrabold tracking-widest text-xs uppercase mb-8">{office.country}</p>
                                    <div className="space-y-4 pt-6 border-t border-navy-100">
                                        <p className="text-navy-600 font-light leading-relaxed">{office.address}</p>
                                        <p className="text-navy-950 font-bold">{office.phone}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Ready to Transform Section (Shared) */}
                <section className="bg-navy-950 py-40 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-blue-600/20 rounded-full blur-[120px]"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    </div>

                    <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-12">
                        <h2 className="text-5xl lg:text-8xl font-black text-white leading-tight tracking-tighter">
                            Ready to Build Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-400 to-brand-blue-100">Legacy?</span>
                        </h2>
                        <p className="text-2xl text-navy-200 font-light max-w-3xl mx-auto leading-relaxed">
                            Join the ranks of global leaders who have scaled their operations with our elite engineering team.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8">
                            <a href="https://forms.gle/K3LySpfU6YYvQKGj9" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-12 py-5 bg-white text-navy-950 font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10">
                                Schedule Consultation
                            </a>
                            <a href="https://forms.gle/JNS54uLpgQXWP8NZ9" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-12 py-5 bg-white/5 border border-white/20 text-white font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all backdrop-blur-md">
                                Request Demo
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-navy-950 text-white relative overflow-hidden pt-32 pb-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
                        <div className="md:col-span-4 space-y-10">
                            <img src="/assets/3.png" alt="Echoes Logo" className="h-10 w-auto" />
                            <p className="text-navy-300 text-lg leading-relaxed font-light">
                                Architecting elite enterprise solutions for global leaders. Our engineering legacy defines the future of digital infrastructure.
                            </p>
                            <div className="flex gap-6">
                                {[
                                    { icon: "linkedin", url: "https://www.linkedin.com/company/echoes-software-solutions/" },
                                    { icon: "instagram", url: "https://www.instagram.com/echoes_software_technologies/" },
                                    { icon: "message-circle", url: "https://wa.me/+918148549511" }
                                ].map((social) => (
                                    <a key={social.icon} href={social.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-brand-blue-600 hover:border-brand-blue-600 transition-all duration-300 group">
                                        <i data-lucide={social.icon} className="w-5 h-5 text-navy-300 group-hover:text-white"></i>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-8">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-blue-400">Navigation</h4>
                            <ul className="space-y-4">
                                {['Home', 'Solutions', 'Services', 'About', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-navy-300 hover:text-white transition-colors font-medium">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-3 space-y-8">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-blue-400">Solutions</h4>
                            <ul className="space-y-4">
                                {['Enterprise Architecture', 'AI & Neural Systems', 'Defense-Grade Security', 'Hyper-Scalable Cloud'].map((item) => (
                                    <li key={item}>
                                        <Link to="/solutions" className="text-navy-300 hover:text-white transition-colors font-medium">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-3 space-y-10">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-blue-400">Newsletter</h4>
                            <p className="text-navy-300 font-light">Join our elite list for architecture insights.</p>
                            <div className="relative group">
                                <input type="email" placeholder="Professional Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-blue-600 transition-all" />
                                <button className="absolute right-2 top-2 bottom-2 px-6 bg-brand-blue-600 rounded-xl text-white font-black text-xs uppercase tracking-widest hover:bg-brand-blue-500 transition-all">Join</button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-navy-400 text-sm font-light">© 2026 Echoes Software Technologies. All rights reserved.</p>
                        <div className="flex gap-12">
                            <Link to="/privacy-policy" className="text-navy-400 hover:text-white text-sm font-medium transition-colors">Privacy Policy</Link>
                            <Link to="/terms-of-service" className="text-navy-400 hover:text-white text-sm font-medium transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-xl animate-fade-in">
                    <div className="flex justify-end p-6 pt-10">
                        <button onClick={toggleMobileMenu} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 text-white">
                            <i data-lucide="x" className="w-8 h-8"></i>
                        </button>
                    </div>
                    <nav className="flex flex-col items-center justify-center gap-12 h-[70vh]">
                        {['Home', 'Solutions', 'Services', 'About', 'Contact'].map((item, i) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                onClick={toggleMobileMenu}
                                className="text-4xl font-black text-white hover:text-brand-blue-400 transition-all uppercase tracking-tighter"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Contact;
