import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

declare global {
    interface Window {
        lucide: any;
    }
}

const Solutions: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div className="bg-white text-gray-900 selection:bg-brand-blue-100 selection:text-brand-blue-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <header className="fixed top-0 w-full z-[100] transition-all duration-500 bg-white/80 backdrop-blur-2xl border-b border-navy-100/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 hover:opacity-80 transition-opacity">
                                <img src="/assets/2.png" alt="Echoes Software Technologies" width="160" height="45" />
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center gap-12">
                            {['Home', 'Solutions', 'Services', 'About', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className={`text-sm font-black uppercase tracking-[0.2em] transition-all relative group nav-blip ${item === 'Solutions' ? 'text-brand-blue-600 active' : 'text-navy-900 hover:text-brand-blue-600'}`}
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
                            <button className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-navy-50 dark:bg-navy-900 text-navy-900 dark:text-white active:scale-90 transition-transform" onClick={toggleMobileMenu}>
                                <i data-lucide="menu" className="w-7 h-7"></i>
                            </button>
                        </div>
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
                                    className={`text-3xl font-black uppercase tracking-tighter transition-all ${item === 'Solutions' ? 'text-brand-blue-600 pl-4 border-l-4 border-brand-blue-600' : 'text-navy-950 hover:text-brand-blue-600'}`}
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

            <main>
                <section className="mesh-gradient relative overflow-hidden pt-24 pb-20 lg:pt-40 lg:pb-32">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-brand-blue-100/40 rounded-full blur-[140px] animate-float-slow"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-blue-200/20 rounded-full blur-[140px] animate-float-slow" style={{ animationDelay: '-5s' }}></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16 animate-slide-up">
                            <div className="inline-flex items-center space-x-3 px-5 py-2.5 bg-white/60 backdrop-blur-md text-brand-blue-700 rounded-full text-sm font-bold tracking-wider border border-white shadow-sm mb-10">
                                <span className="uppercase tracking-[0.2em]">INNOVATION AT SCALE</span>
                            </div>
                            <h1 className="text-6xl lg:text-8xl font-extrabold text-navy-950 leading-[1] tracking-tight text-balance mb-10">
                                Our Software <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-600 via-brand-blue-500 to-brand-blue-800 animate-shimmer" style={{ backgroundSize: '200% auto' }}>Solutions</span>
                            </h1>
                            <p className="text-2xl text-navy-600 max-w-3xl mx-auto leading-relaxed font-light">
                                Comprehensive enterprise-grade software ecosystems designed to automate precision, scale intelligence, and dominate market competition.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-navy-50/50 py-32 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-brand-blue-100 rounded-full blur-[120px]"></div>
                        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-brand-blue-50 rounded-full blur-[120px]"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-24 space-y-6 animate-slide-up">
                            <h2 className="text-brand-blue-600 font-black tracking-[0.3em] text-sm uppercase">ENTERPRISE ARCHITECTURE</h2>
                            <h3 className="text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight">Ecosystem Capabilities</h3>
                            <p className="text-2xl text-navy-600 max-w-2xl mx-auto font-light leading-relaxed">
                                Our comprehensive suite of software solutions is engineered to exceed global enterprise requirements for scale, security, and intelligence.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                {
                                    title: "Scalable Cloud Architecture",
                                    desc: "Built on enterprise-grade cloud infrastructure that scales seamlessly from startup to Fortune 500.",
                                    icon: "cloud",
                                    features: ["Auto-scaling capabilities", "99.99% uptime guarantee", "Global CDN distribution"]
                                },
                                {
                                    title: "Advanced Security Framework",
                                    desc: "Military-grade security protocols and compliance standards that protect your most sensitive data assets.",
                                    icon: "shield",
                                    features: ["End-to-end encryption", "SOC 2 Type II compliant", "Multi-factor authentication"]
                                },
                                {
                                    title: "Intelligent Analytics",
                                    desc: "AI-powered analytics and real-time insights that transform raw data into actionable business intelligence.",
                                    icon: "bar-chart-3",
                                    features: ["Real-time dashboards", "Predictive modeling", "Enterprise data lake"]
                                }
                            ].map((sol, i) => (
                                <div key={i} className="group bg-white p-12 rounded-[3.5rem] border border-navy-100 shadow-glass hover:shadow-premium transition-all duration-500 hover-lift relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue-500 to-brand-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="w-20 h-20 bg-brand-blue-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-brand-blue-600 transition-all duration-500 shadow-sm">
                                        <i data-lucide={sol.icon} className="w-10 h-10 text-brand-blue-600 group-hover:text-white transition-colors"></i>
                                    </div>
                                    <h3 className="text-2xl font-black text-navy-950 mb-6 uppercase tracking-tight group-hover:text-brand-blue-600 transition-colors">{sol.title}</h3>
                                    <p className="text-lg text-navy-600 leading-relaxed mb-8 font-light">{sol.desc}</p>
                                    <ul className="space-y-4">
                                        {sol.features.map((feat, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm font-bold text-navy-700 uppercase tracking-widest">
                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue-500"></div>
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-40 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-32 space-y-6">
                            <h2 className="text-brand-blue-600 font-black tracking-[0.2em] text-sm uppercase">STRATEGIC DELIVERY</h2>
                            <h3 className="text-5xl lg:text-7xl font-extrabold text-navy-950 tracking-tight leading-[1.1]">Comprehensive Ecosystems</h3>
                            <p className="text-2xl text-navy-600 max-w-3xl mx-auto font-light leading-relaxed">
                                We specialize in the end-to-end engineering of sophisticated digital platforms that define industry standards.
                            </p>
                        </div>

                        <div className="space-y-40">
                            {[
                                {
                                    title: "Custom Software Engineering",
                                    desc: "Bespoke digital foundations engineered with military precision. We build high-performance, resilient ecosystems tailored to unique enterprise architecture.",
                                    image: "assets/Custom Software Engineering.png",
                                    points: ["Next-Gen Web & Mobile Platforms", "Mission-Critical Enterprise Systems", "High-Throughput API Orchestration"],
                                    reverse: false
                                },
                                {
                                    title: "Technology Strategy & Consulting",
                                    desc: "Navigate the complexity of digital evolution with elite technical advisory. We optimize your technology stack to maximize speed, security, and market impact.",
                                    image: "assets/Technology Strategy & Consulting.png",
                                    points: ["Global Digital Roadmap Planning", "Architectural Integrity Audits", "Scalability & Performance Strategy"],
                                    reverse: true
                                }
                            ].map((item, i) => (
                                <div key={i} className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-20 items-center`}>
                                    <div className="w-full lg:w-1/2 relative group">
                                        <div className="absolute -inset-4 bg-brand-blue-500/10 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                        <div className="relative overflow-hidden rounded-[3.5rem] shadow-2xl border border-navy-100">
                                            <img src={item.image} alt={item.title} className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-1000" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent"></div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/2 space-y-10">
                                        <h4 className="text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">{item.title}</h4>
                                        <p className="text-xl text-navy-600 font-light leading-relaxed">{item.desc}</p>
                                        <div className="grid gap-6">
                                            {item.points.map((point, idx) => (
                                                <div key={idx} className="flex items-center gap-6 p-6 rounded-3xl bg-navy-50/50 border border-navy-100 group hover:bg-brand-blue-600 transition-all duration-500 hover:-translate-y-1">
                                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-brand-blue-500">
                                                        <i data-lucide="check" className="w-6 h-6 text-brand-blue-600 group-hover:text-white"></i>
                                                    </div>
                                                    <span className="text-lg font-bold text-navy-800 uppercase tracking-widest text-xs group-hover:text-white transition-colors">{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-3 gap-10 mt-40">
                            {[
                                { title: "Elite 24/7 Support", desc: "Constant vigil over your digital assets with round-the-clock technical excellence.", icon: "headphones" },
                                { title: "Defense-First Security", desc: "Military-grade protocols integrated into every layer of your application ecosystem.", icon: "shield-check" },
                                { title: "Ultra-Rapid Deployment", desc: "Agile methodologies optimized for sub-millisecond market response and iterative dominance.", icon: "zap" }
                            ].map((card, i) => (
                                <div key={i} className="bg-navy-50/50 p-10 rounded-[3rem] border border-navy-100 text-center space-y-6 hover:bg-white hover:shadow-premium transition-all duration-500 hover-lift group">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-brand-blue-600 transition-colors">
                                        <i data-lucide={card.icon} className="w-8 h-8 text-brand-blue-600 group-hover:text-white transition-colors"></i>
                                    </div>
                                    <h5 className="text-xl font-black text-navy-950 uppercase tracking-tight group-hover:text-brand-blue-600 transition-colors">{card.title}</h5>
                                    <p className="text-navy-600 font-light leading-relaxed">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Ready to Transform Section */}
                <section className="bg-navy-950 py-40 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                        <div className="absolute top-[-10%] right-[10%] w-[50%] h-[50%] bg-brand-blue-500 rounded-full blur-[180px] animate-float-slow"></div>
                        <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[50%] bg-brand-blue-300 rounded-full blur-[180px] animate-float-slow" style={{ animationDelay: '-3s' }}></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="glass-dark p-16 lg:p-32 rounded-[4rem] border border-white/10 text-center space-y-16 shadow-2xl">
                            <div className="max-w-4xl mx-auto space-y-8">
                                <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter text-balance">
                                    Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-400 to-brand-blue-200">Scale Your Vision?</span>
                                </h2>
                                <p className="text-2xl text-navy-200 leading-relaxed font-light">
                                    Join the elite circle of enterprises powered by Echoes Software Technologies. <br className="hidden lg:block" />
                                    Let's build the future of your digital ecosystem today.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                                <a href="https://forms.gle/K3LySpfU6YYvQKGj9" target="_blank" rel="noopener noreferrer"
                                    className="w-full sm:w-auto premium-gradient text-white font-black px-12 py-6 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-premium shadow-2xl shadow-brand-blue-900/40 text-center text-xl uppercase tracking-widest">
                                    Schedule Consultation
                                </a>
                                <a href="https://forms.gle/JNS54uLpgQXWP8NZ9" target="_blank" rel="noopener noreferrer"
                                    className="w-full sm:w-auto glass-dark hover:bg-white/10 text-white font-black px-12 py-6 rounded-full transition-all duration-500 border border-white/20 text-center text-xl uppercase tracking-widest">
                                    Request Ecosystem Demo
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-navy-950 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-brand-blue-600 via-brand-blue-400 to-brand-blue-800"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
                        <div className="col-span-1 md:col-span-2 space-y-10">
                            <div>
                                <img src="/assets/3.png" alt="Echoes Software Technologies" className="h-12 mb-8" />
                                <p className="text-navy-300 mb-10 max-w-md text-xl font-light leading-relaxed">
                                    Precision-engineered software solutions for the global enterprise. Defining the future of digital ecosystems.
                                </p>
                            </div>
                            <div className="flex space-x-6">
                                {[
                                    { icon: "linkedin", href: "https://www.linkedin.com/company/echoes-software-solutions/posts/?feedView=all" },
                                    { icon: "message-circle", href: "https://wa.me/918148549511" },
                                    { icon: "instagram", href: "https://www.instagram.com/echoes_software_technologies/" }
                                ].map((social, i) => (
                                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                                        className="w-14 h-14 rounded-2xl glass-dark flex items-center justify-center text-white hover:bg-brand-blue-600 transition-all duration-500 hover:-translate-y-2 border border-white/10 shadow-lg">
                                        <i data-lucide={social.icon} className="w-6 h-6"></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-black mb-10 text-white uppercase tracking-[0.3em] border-l-4 border-brand-blue-500 pl-4">Solutions</h3>
                            <ul className="space-y-6">
                                {["Enterprise Software", "Cloud Solutions", "Custom Development", "Integration Services"].map((item, i) => (
                                    <li key={i}>
                                        <Link to="/solutions" className="text-navy-400 hover:text-white transition-all flex items-center group text-lg font-light">
                                            <i data-lucide="arrow-right" className="w-5 h-5 mr-3 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all"></i>
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-black mb-10 text-white uppercase tracking-[0.3em] border-l-4 border-brand-blue-500 pl-4">Company</h3>
                            <ul className="space-y-6">
                                {["About Us", "Careers", "News", "Contact"].map((item, i) => (
                                    <li key={i}>
                                        <Link to={item === "Contact" ? "/contact" : item === "About Us" ? "/about" : "#"}
                                            className="text-navy-400 hover:text-white transition-all flex items-center group text-lg font-light">
                                            <i data-lucide="arrow-right" className="w-5 h-5 mr-3 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all"></i>
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/5 mt-32 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-navy-500 text-sm font-bold uppercase tracking-widest">© 2026 Echoes Software Technologies. Precision Built.</p>
                        <div className="flex space-x-12">
                            {["Privacy Policy", "Terms of Service", "Security"].map((item, i) => (
                                <Link key={i} to={item === "Security" ? "#" : `/${item.toLowerCase().replace(/ /g, '-')}`}
                                    className="text-navy-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-[0.2em]">
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-xl animate-fade-in">
                    <div className="flex justify-end p-6">
                        <button onClick={toggleMobileMenu} className="text-white hover:text-brand-blue-400 transition-colors">
                            <i data-lucide="x" className="w-8 h-8"></i>
                        </button>
                    </div>
                    <nav className="flex flex-col items-center justify-center space-y-12 h-3/4">
                        <Link to="/" className="text-3xl font-black text-white hover:text-brand-blue-400 uppercase tracking-widest" onClick={toggleMobileMenu}>Home</Link>
                        <Link to="/solutions" className="text-3xl font-black text-brand-blue-400 uppercase tracking-widest" onClick={toggleMobileMenu}>Solutions</Link>
                        <Link to="/services" className="text-3xl font-black text-white hover:text-brand-blue-400 uppercase tracking-widest" onClick={toggleMobileMenu}>Services</Link>
                        <Link to="/about" className="text-3xl font-black text-white hover:text-brand-blue-400 uppercase tracking-widest" onClick={toggleMobileMenu}>About</Link>
                        <Link to="/contact" className="text-3xl font-black text-white hover:text-brand-blue-400 uppercase tracking-widest" onClick={toggleMobileMenu}>Contact</Link>
                        <button
                            onClick={handleGetStarted}
                            className="premium-gradient text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xl shadow-2xl"
                        >
                            Login
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Solutions;
