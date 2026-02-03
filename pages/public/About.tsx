import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

declare global {
    interface Window {
        lucide: any;
    }
}

const About: React.FC = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [isMobileMenuOpen]);

    const openContactModal = () => setIsContactModalOpen(true);
    const closeContactModal = () => setIsContactModalOpen(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
                                className={`text-sm font-black uppercase tracking-[0.2em] transition-all relative group nav-blip ${item === 'About' ? 'text-brand-blue-600 active' : 'text-navy-900 hover:text-brand-blue-600'}`}
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
                                    className={`text-3xl font-black uppercase tracking-tighter transition-all ${item === 'About' ? 'text-brand-blue-600 pl-4 border-l-4 border-brand-blue-600' : 'text-navy-950 hover:text-brand-blue-600'}`}
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
                <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-navy-950">
                    <div className="absolute inset-0">
                        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-blue-600/30 rounded-full blur-[150px] animate-float-slow"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-blue-400/20 rounded-full blur-[150px] animate-float-slow" style={{ animationDelay: '-3s' }}></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-10">
                        <div className="inline-block px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in-down">
                            <span className="text-brand-blue-400 font-black tracking-[0.3em] text-xs uppercase">OUR STORY</span>
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter animate-slide-up">
                            Defining the <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-400 to-brand-blue-100">Future of Tech</span>
                        </h1>
                        <p className="text-2xl text-navy-200 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in delay-500">
                            We are Echoes Software Technologies. A collective of elite engineers and visionaries building enterprise-grade legacies.
                        </p>
                    </div>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                        <i data-lucide="chevron-down" className="w-8 h-8 text-white/30"></i>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-40 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <h2 className="text-brand-blue-600 font-black tracking-[0.3em] text-sm uppercase">OUR MISSION</h2>
                                    <h3 className="text-5xl lg:text-7xl font-extrabold text-navy-950 tracking-tight leading-[1.1]">Engineering <span className="text-brand-blue-600">Enterprise Excellence</span></h3>
                                </div>
                                <div className="space-y-8">
                                    <p className="text-2xl text-navy-600 font-light leading-relaxed">
                                        Echoes Software Technologies exists at the intersection of complex problem solving and sophisticated engineering. Our mission is to architect digital foundations that empower global enterprises to define their industry standards.
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-8">
                                        <div className="p-8 rounded-3xl bg-navy-50/50 border border-navy-100 space-y-4">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                <i data-lucide="shield-check" className="w-6 h-6 text-brand-blue-600"></i>
                                            </div>
                                            <h4 className="text-sm font-black text-navy-950 uppercase tracking-widest">ISO 27001 Certified</h4>
                                        </div>
                                        <div className="p-8 rounded-3xl bg-navy-50/50 border border-navy-100 space-y-4">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                <i data-lucide="clock" className="w-6 h-6 text-brand-blue-600"></i>
                                            </div>
                                            <h4 className="text-sm font-black text-navy-950 uppercase tracking-widest">24/7 Global Support</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-brand-blue-500/10 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="relative overflow-hidden rounded-[3.5rem] shadow-2xl border border-navy-100 aspect-square">
                                    <img src="assets/our mission.png" alt="Our mission" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-40 bg-navy-50/50 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-32 space-y-6">
                            <h2 className="text-brand-blue-600 font-black tracking-[0.3em] text-sm uppercase">CORE PHILOSOPHY</h2>
                            <h3 className="text-5xl lg:text-7xl font-extrabold text-navy-950 tracking-tight leading-[1.1]">The Echoes Standard</h3>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                { title: "Excellence", desc: "We don't meet standards; we define them. Every line of code is an exercise in technical perfection.", icon: "award" },
                                { title: "Innovation", desc: "Iterating on the impossible. We leverage sub-millisecond market response and elite AI orchestration.", icon: "cpu" },
                                { title: "Integrity", desc: "Absolute transparency. We operate with defense-first security protocols and radical honesty.", icon: "file-check" }
                            ].map((val, i) => (
                                <div key={i} className="group bg-white p-12 rounded-[3.5rem] border border-navy-100 shadow-glass hover:shadow-premium transition-all duration-500 hover-lift relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue-500 to-brand-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="w-20 h-20 bg-brand-blue-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-brand-blue-600 transition-all duration-500">
                                        <i data-lucide={val.icon} className="w-10 h-10 text-brand-blue-600 group-hover:text-white"></i>
                                    </div>
                                    <h3 className="text-3xl font-black text-navy-950 mb-6 uppercase tracking-tight group-hover:text-brand-blue-600 transition-colors">{val.title}</h3>
                                    <p className="text-xl text-navy-600 leading-relaxed font-light">{val.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-40 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-10">
                            <div className="max-w-2xl space-y-6">
                                <h2 className="text-brand-blue-600 font-black tracking-[0.3em] text-sm uppercase text-left">STRATEGIC ADVANTAGE</h2>
                                <h3 className="text-5xl lg:text-7xl font-extrabold text-navy-950 tracking-tight leading-[1.1] text-left">Why Global Leaders <span className="text-brand-blue-600">Choose Us</span></h3>
                            </div>
                            <p className="text-2xl text-navy-600 max-w-xl font-light leading-relaxed text-left lg:text-right">
                                From startup acceleration to Fortune 500 digital evolution, we provide the elite technical edge.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Proven Delivery", desc: "Over 150+ successful enterprise deployments with optimized sub-millisecond performance.", icon: "check-circle" },
                                { title: "AI-First Vision", desc: "Deep integration of machine learning and neural networks into core business logic.", icon: "brain" },
                                { title: "Client Focused", desc: "Dedicated architecture teams that function as a seamless extension of your organization.", icon: "users" },
                                { title: "Security First", desc: "Defense-grade security protocols (SOC 2, ISO 27001) integrated from Day 0.", icon: "lock" },
                                { title: "Hyper-Scalable", desc: "Architecture designed to scale from 10 to 10M concurrent users without friction.", icon: "trending-up" },
                                { title: "24/7 Vigilance", desc: "Constant monitoring and elite technical assistance across every global timezone.", icon: "activity" }
                            ].map((item, i) => (
                                <div key={i} className="p-10 rounded-[3rem] bg-navy-50/30 border border-navy-100 hover:bg-white hover:shadow-premium transition-all duration-500 hover-lift group">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-brand-blue-600 transition-colors">
                                        <i data-lucide={item.icon} className="w-7 h-7 text-brand-blue-600 group-hover:text-white transition-colors"></i>
                                    </div>
                                    <h4 className="text-xl font-black text-navy-950 uppercase tracking-tight mb-4 group-hover:text-brand-blue-600 transition-colors">{item.title}</h4>
                                    <p className="text-navy-600 font-light leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Founder Section */}
                <section className="py-40 bg-navy-50/50 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-24 items-center">
                            <div className="relative group">
                                <div className="absolute -inset-10 bg-brand-blue-500/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <div className="relative aspect-square rounded-[4rem] overflow-hidden border-8 border-white shadow-premium">
                                    <img src="/assets/ukaasha_founder.png" alt="Mohamed Ukaasha, Founder" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-12 left-12">
                                        <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Mohamed Ukaasha</h3>
                                        <p className="text-brand-blue-400 font-extrabold tracking-widest text-sm uppercase">CHIEF EXECUTIVE VISIONARY</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-6">
                                    <h2 className="text-brand-blue-600 font-black tracking-[0.3em] text-sm uppercase">THE VISIONARY</h2>
                                    <h3 className="text-5xl lg:text-7xl font-extrabold text-navy-950 tracking-tight leading-[1.1]">Architecting the <span className="text-brand-blue-600">Next Decades</span></h3>
                                </div>
                                <p className="text-2xl text-navy-600 font-light leading-relaxed">
                                    With over 15 years of deep tech leadership, Mohamed Ukaasha founded Echoes with a singular focus: to eliminate the friction between enterprise ambition and technical execution.
                                </p>
                                <div className="p-10 rounded-[3rem] bg-white border border-navy-100 shadow-glass space-y-6">
                                    <p className="text-navy-600 italic">"Our goal isn't just to build software. We're building the digital legacies that will govern how industries operate for the next fifty years."</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-px bg-brand-blue-600"></div>
                                        <span className="text-sm font-black text-navy-950 uppercase tracking-widest">M. Ukaasha, Founder</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leadership Section */}
                <section className="py-40 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        {/* <div className="text-center mb-32 space-y-6">
                            <h2 className="text-brand-blue-600 font-black tracking-[0.3em] text-sm uppercase">EXECUTIVE LEADERSHIP</h2>
                            <h3 className="text-5xl lg:text-7xl font-extrabold text-navy-950 tracking-tight leading-[1.1]">The Minds Behind <span className="text-brand-blue-600">the Magic</span></h3>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { name: "Thalha", role: "Senior Content Creator", img: "/assets/thalha_scc.png" },
                                { name: "Mohammed Mufeez", role: "Graphic Designer", img: "/assets/mufeez_gd.png" },
                                { name: "Jamal Abdul", role: "AI Director", img: "/assets/jamal_aid.png" },
                                { name: "Abdul Raafih", role: "HR Manager", img: "/assets/abdul_raafih_hr.png" }
                            ].map((member, i) => (
                                <div key={i} className="group relative">
                                    <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 border border-navy-100 shadow-lg group-hover:shadow-premium transition-all duration-500">
                                        <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <h4 className="text-2xl font-black text-navy-950 uppercase tracking-tighter mb-2 group-hover:text-brand-blue-600 transition-colors">{member.name}</h4>
                                    <p className="text-brand-blue-600 font-extrabold tracking-widest text-xs uppercase">{member.role}</p>
                                </div>
                            ))}
                        </div> */}
                    </div>
                </section>

                {/* Ready to Transform Section */}
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

            {/* Contact Modal Integration */}
            {isContactModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-0">
                    <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" onClick={closeContactModal}></div>
                    <div className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-3xl overflow-hidden animate-slide-up">
                        <div className="p-12">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-3xl font-black text-navy-950 uppercase tracking-tighter">Get in Touch</h3>
                                    <p className="text-navy-500 font-light pt-2">Our architecture team will respond within 4 hours.</p>
                                </div>
                                <button onClick={closeContactModal} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-navy-50 text-navy-900 hover:bg-navy-100 transition-colors">
                                    <i data-lucide="x" className="w-6 h-6"></i>
                                </button>
                            </div>
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase text-navy-400 tracking-widest pl-2">Full Name</label>
                                        <input type="text" className="w-full bg-navy-50 border-none rounded-2xl px-6 py-4 text-navy-950 focus:ring-2 focus:ring-brand-blue-600 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase text-navy-400 tracking-widest pl-2">Professional Email</label>
                                        <input type="email" className="w-full bg-navy-50 border-none rounded-2xl px-6 py-4 text-navy-950 focus:ring-2 focus:ring-brand-blue-600 transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-navy-400 tracking-widest pl-2">Project Vision</label>
                                    <textarea rows={4} className="w-full bg-navy-50 border-none rounded-2xl px-6 py-4 text-navy-950 focus:ring-2 focus:ring-brand-blue-600 transition-all resize-none"></textarea>
                                </div>
                                <button className="w-full premium-gradient text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-blue-500/20 hover:scale-[1.02] transition-all">
                                    Initialize Briefing
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;
