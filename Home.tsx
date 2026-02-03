import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

declare global {
    interface Window {
        lucide: any;
    }
}

const Home: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [isMobileMenuOpen, isContactModalOpen]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const openContactModal = () => setIsContactModalOpen(true);
    const closeContactModal = () => setIsContactModalOpen(false);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log('Form submitted:', Object.fromEntries(formData.entries()));
        alert('Thank you for your message! We will contact you soon.');
        closeContactModal();
    };

    const handleLoginClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="bg-white text-navy-900 scroll-smooth selection:bg-brand-blue-100 selection:text-brand-blue-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <header className="fixed top-0 w-full z-[100] transition-all duration-500 bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 hover:opacity-80 transition-opacity">
                                <img src="./assets/2.png" alt="Echoes Software Technologies" width="160" height="45" />
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center gap-12">
                            {['Home', 'Solutions', 'Services', 'About', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className={`text-sm font-black uppercase tracking-[0.2em] transition-all relative group nav-blip ${item === 'Home' ? 'text-brand-blue-600 active' : 'text-navy-700 hover:text-brand-blue-600'}`}
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex items-center gap-6">
                            <button
                                onClick={handleLoginClick}
                                className="hidden md:flex premium-gradient text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-blue-500/25 hover:shadow-xl hover:shadow-brand-blue-500/35 hover:scale-105 active:scale-95 transition-all"
                            >
                                Login
                            </button>
                            <button className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-100 text-navy-900 hover:bg-gray-200 active:scale-90 transition-all" onClick={toggleMobileMenu}>
                                <i data-lucide="menu" className="w-7 h-7"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Premium Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[200] md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-navy-900/30 backdrop-blur-sm animate-fade-in"
                        onClick={toggleMobileMenu}
                    />

                    {/* Drawer */}
                    <div className="absolute top-0 right-0 w-3/4 h-full bg-white shadow-2xl animate-slide-in-right flex flex-col">
                        <div className="p-8 flex justify-between items-center border-b border-gray-200">
                            <img src="./assets/2.png" alt="Echoes Logo" className="h-8 w-auto" />
                            <button
                                onClick={toggleMobileMenu}
                                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-100 text-navy-900 hover:bg-gray-200 active:rotate-90 transition-all duration-300"
                            >
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>

                        <nav className="flex-1 px-8 py-12 flex flex-col gap-10">
                            {['Home', 'Solutions', 'Services', 'About', 'Contact'].map((item, i) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    onClick={toggleMobileMenu}
                                    className={`text-3xl font-black uppercase tracking-tighter transition-all ${item === 'Home' ? 'text-brand-blue-600 pl-4 border-l-4 border-brand-blue-600' : 'text-navy-900 hover:text-brand-blue-600 hover:pl-4'}`}
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>

                        <div className="p-8 border-t border-gray-200 space-y-8">
                            <button
                                onClick={handleLoginClick}
                                className="w-full premium-gradient text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                            >
                                Login
                            </button>
                            <div className="flex justify-center gap-8">
                                {['linkedin', 'instagram', 'message-circle'].map(icon => (
                                    <div key={icon} className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-brand-blue-50 flex items-center justify-center text-navy-600 hover:text-brand-blue-600 transition-all cursor-pointer">
                                        <i data-lucide={icon} className="w-5 h-5"></i>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <main>
                {/* Stunning Hero Section - Light Theme */}
                {/* Stunning Hero Section - Light Theme */}
                <section
                    className="
                        relative overflow-hidden
                        bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20
                        min-h-[calc(100vh-80px)]
                        flex items-center
                    "
                >
                    {/* Background Gradients */}
                    <div className="absolute inset-0 pointer-events-none -z-10">
                        <div className="absolute -top-[35%] -left-[30%] w-[75%] h-[75%] bg-gradient-to-br from-blue-200/40 via-purple-200/30 to-pink-200/20 rounded-full blur-[200px]" />
                        <div className="absolute -bottom-[35%] -right-[30%] w-[75%] h-[75%] bg-gradient-to-br from-purple-200/30 via-blue-200/25 to-indigo-200/20 rounded-full blur-[200px]" />
                    </div>

                    {/* Content Wrapper */}
                    <div className="w-full pt-24 lg:pt-32 pb-24">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid lg:grid-cols-2 gap-20 items-center">

                                {/* LEFT CONTENT */}
                                <div className="space-y-12 max-w-xl">
                                    {/* Trust Badge
                            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full text-sm font-bold tracking-wider border border-gray-200 shadow-md">
                                <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-blue-600"></span>
                                </span>
                                <span className="uppercase text-brand-blue-700">
                                Trusted by Global Enterprises
                                </span>
                            </div> */}

                                    {/* Headline */}
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight">
                                        <span className="text-navy-950">Transform Your</span>{" "}
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-600 via-indigo-600 to-purple-600">
                                            Digital Future
                                        </span>{" "}
                                        <span className="text-navy-950">With Innovation</span>
                                    </h1>

                                    {/* Subheadline */}
                                    <p className="text-xl sm:text-1xl text-navy-600 leading-relaxed font-light">
                                        Echoes Software Technologies delivers cutting-edge enterprise
                                        solutions that bridge complex challenges with elegant digital
                                        innovation.
                                    </p>

                                    {/* CTA */}
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <a
                                            href="https://forms.gle/K3LySpfU6YYvQKGj9"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center premium-gradient text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                                        >
                                            <span className="flex items-center gap-3">
                                                Get Started Now
                                                <i data-lucide="arrow-right" className="w-5 h-5"></i>
                                            </span>
                                        </a>

                                        <Link
                                            to="/services"
                                            className="inline-flex items-center justify-center bg-white border-2 border-gray-300 hover:border-brand-blue-400 text-navy-800 hover:text-brand-blue-600 px-10 py-5 rounded-full font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1"
                                        >
                                            <span className="flex items-center gap-3">
                                                Our Services
                                                <i data-lucide="sparkles" className="w-5 h-5"></i>
                                            </span>
                                        </Link>
                                    </div>

                                    {/* Trust Indicators */}
                                    <div className="flex flex-wrap gap-8 pt-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                                <i data-lucide="check" className="w-6 h-6 text-green-600"></i>
                                            </div>
                                            <span className="font-semibold text-navy-700">ISO 27001 Certified</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                                <i data-lucide="shield-check" className="w-6 h-6 text-brand-blue-600"></i>
                                            </div>
                                            <span className="font-semibold text-navy-700">Enterprise Support</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                                <i data-lucide="award" className="w-6 h-6 text-purple-600"></i>
                                            </div>
                                            <span className="font-semibold text-navy-700">Award Winning</span>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT IMAGE */}
                                {/* RIGHT IMAGE – ULTRA CINEMATIC 3D */}
                                <div
                                    className="relative flex justify-center items-center"
                                    style={{ perspective: "2200px" }}
                                >
                                    {/* COSMIC BACKGROUND */}
                                    <div
                                        className="absolute -inset-40 blur-[160px] opacity-90"
                                        style={{
                                            background: `
        radial-gradient(circle at 20% 20%, rgba(99,102,241,0.6), transparent 40%),
        radial-gradient(circle at 80% 30%, rgba(168,85,247,0.5), transparent 45%),
        radial-gradient(circle at 50% 80%, rgba(34,211,238,0.45), transparent 50%)
      `,
                                            transform: "translateZ(-300px)",
                                        }}
                                    />

                                    {/* ENERGY PARTICLES */}
                                    {[...Array(10)].map((_, i) => (
                                        <span
                                            key={i}
                                            className="absolute rounded-full bg-white/70"
                                            style={{
                                                width: `${Math.random() * 5 + 3}px`,
                                                height: `${Math.random() * 5 + 3}px`,
                                                top: `${Math.random() * 100}%`,
                                                left: `${Math.random() * 100}%`,
                                                filter: "blur(1px)",
                                                animation: `energy ${6 + Math.random() * 6}s ease-in-out infinite`,
                                            }}
                                        />
                                    ))}

                                    {/* MAIN 3D CARD */}
                                    <div
                                        className="relative rounded-[4rem] bg-white/60 backdrop-blur-2xl border border-white/40"
                                        style={{
                                            transformStyle: "preserve-3d",
                                            animation: "float 8s ease-in-out infinite",
                                            transition: "transform 0.12s cubic-bezier(.2,.8,.2,1)",
                                            boxShadow: "0 40px 120px rgba(0,0,0,0.25)",
                                        }}
                                        onMouseMove={(e) => {
                                            const r = e.currentTarget.getBoundingClientRect();
                                            const x = (e.clientX - r.left) / r.width - 0.5;
                                            const y = (e.clientY - r.top) / r.height - 0.5;

                                            e.currentTarget.style.transform = `
        rotateX(${y * -20}deg)
        rotateY(${x * 20}deg)
      `;

                                            e.currentTarget.style.setProperty("--lx", `${(x + 0.5) * 100}%`);
                                            e.currentTarget.style.setProperty("--ly", `${(y + 0.5) * 100}%`);
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
                                        }}
                                    >
                                        {/* CHROMATIC EDGE GLOW */}
                                        <div
                                            className="absolute inset-0 rounded-[4rem]"
                                            style={{
                                                background:
                                                    "linear-gradient(120deg, rgba(99,102,241,.35), rgba(168,85,247,.35), rgba(34,211,238,.35))",
                                                filter: "blur(26px)",
                                                opacity: 0.5,
                                                transform: "translateZ(-120px)",
                                            }}
                                        />

                                        {/* SPECULAR LIGHT */}
                                        <div
                                            className="pointer-events-none absolute inset-0 rounded-[4rem]"
                                            style={{
                                                background:
                                                    "radial-gradient(800px circle at var(--lx,50%) var(--ly,50%), rgba(255,255,255,.45), transparent 50%)",
                                                transform: "translateZ(160px)",
                                                mixBlendMode: "overlay",
                                            }}
                                        />

                                        {/* DEPTH SHADOW (VERY LIGHT) */}
                                        <div
                                            className="absolute inset-0 rounded-[4rem]"
                                            style={{
                                                transform: "translateZ(-80px)",
                                                filter: "blur(12px)",
                                                background:
                                                    "radial-gradient(circle at center, rgba(0,0,0,0.05), transparent 85%)",
                                            }}
                                        />

                                        {/* IMAGE LAYER */}
                                        <img
                                            src="assets/hero_img.png"
                                            alt="Enterprise software solutions"
                                            className="relative w-full max-w-md rounded-[3.2rem] object-cover"
                                            style={{
                                                transform: "translateZ(180px)",
                                                boxShadow: "0 6px 14px rgba(49,49,49,0.10)",
                                            }}
                                        />

                                        {/* FLOATING ICONS */}
                                        <div
                                            className="absolute -top-6 -left-6 w-14 h-14 bg-white/90 backdrop-blur-xl rounded-2xl shadow-md flex items-center justify-center"
                                            style={{ transform: "translateZ(220px)" }}
                                        >
                                            <i data-lucide="sparkles" className="w-6 h-6 text-indigo-600"></i>
                                        </div>

                                        <div
                                            className="absolute top-1/3 -right-6 w-12 h-12 bg-white/90 backdrop-blur-xl rounded-xl shadow-md flex items-center justify-center"
                                            style={{ transform: "translateZ(220px)" }}
                                        >
                                            <i data-lucide="code-2" className="w-5 h-5 text-blue-600"></i>
                                        </div>

                                        <div
                                            className="absolute -bottom-6 left-1/4 w-12 h-12 bg-white/90 backdrop-blur-xl rounded-xl shadow-md flex items-center justify-center"
                                            style={{ transform: "translateZ(220px)" }}
                                        >
                                            <i data-lucide="zap" className="w-5 h-5 text-yellow-500"></i>
                                        </div>
                                    </div>

                                    {/* ANIMATIONS */}
                                    <style>
                                        {`
      @keyframes float {
        0%,100% { transform: translateY(0); }
        50% { transform: translateY(-28px); }
      }

      @keyframes energy {
        0%,100% { transform: translateY(0); opacity: .5; }
        50% { transform: translateY(-50px); opacity: .9; }
      }
    `}
                                    </style>
                                </div>



                            </div>
                        </div>
                    </div>
                </section>



                {/* Capability Section */}
                <section className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 py-32 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-[120px]"></div>
                        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-[120px]"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-24 space-y-6 animate-slide-up">
                            <h2 className="text-brand-blue-600 font-black tracking-[0.2em] text-sm uppercase">BEYOND SOFTWARE</h2>
                            <h3 className="text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight">Enterprise Capability Model</h3>
                            <p className="text-2xl text-navy-600 max-w-2xl mx-auto font-light leading-relaxed">
                                We combine industry expertise with technical excellence to build resilient, future-ready digital infrastructure.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                {
                                    title: "Scalable Cloud Architecture",
                                    desc: "Built on enterprise-grade cloud infrastructure that scales seamlessly from startup to Fortune 500, ensuring peak performance.",
                                    image: "assets/cloud.png",
                                    features: ["Auto-scaling capabilities", "99.99% uptime guarantee", "Global CDN distribution"],
                                    accent: "blue",
                                    color: "brand-blue"
                                },
                                {
                                    title: "Advanced Security Framework",
                                    desc: "Military-grade encryption and protocol standards that protect your most sensitive data and ensure total regulatory compliance.",
                                    image: "assets/framework.png",
                                    features: ["End-to-end encryption", "SOC 2 Type II compliant", "Advanced Identity Mgmt"],
                                    accent: "green",
                                    color: "green"
                                },
                                {
                                    title: "Intelligent Analytics",
                                    desc: "AI-powered analytics and real-time insights that transform raw data into actionable business intelligence for strategic growth.",
                                    image: "assets/intelligent.png",
                                    features: ["Real-time dashboards", "Predictive modeling", "Deep-reporting engine"],
                                    accent: "purple",
                                    color: "purple"
                                }
                            ].map((feat, i) => (
                                <div key={i} className="group bg-white rounded-[2.5rem] p-2 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 overflow-hidden flex flex-col">
                                    <div className="relative h-64 rounded-[2rem] overflow-hidden m-2">
                                        <img src={feat.image} alt={feat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-navy-900/20 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className={`inline-flex items-center space-x-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20`}>
                                                <div className={`w-1.5 h-1.5 rounded-full bg-${feat.accent}-400`}></div>
                                                <span>Core Capability</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 pt-4 flex flex-col flex-grow text-left">
                                        <h4 className="text-2xl font-bold text-navy-950 leading-tight mb-4 group-hover:text-brand-blue-600 transition-colors uppercase tracking-tight">{feat.title}</h4>
                                        <p className="text-navy-600 leading-relaxed mb-8 flex-grow">{feat.desc}</p>
                                        <div className="space-y-4 pt-6 border-t border-gray-200">
                                            {feat.features.map((item, j) => (
                                                <div key={j} className="flex items-center text-sm font-semibold text-navy-800">
                                                    <div className={`w-6 h-6 rounded-full bg-${feat.color}-100 flex items-center justify-center mr-3 flex-shrink-0`}>
                                                        <i data-lucide="check" className={`w-3.5 h-3.5 text-${feat.color}-600`}></i>
                                                    </div>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ROI Section */}
                <section className="bg-white py-32 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-12 text-left">
                                <div className="space-y-6">
                                    <h2 className="text-brand-blue-600 font-black tracking-[0.2em] text-sm uppercase">MEASURABLE RESULTS</h2>
                                    <h3 className="text-5xl lg:text-6xl font-extrabold text-navy-950 leading-tight tracking-tight">Impact & ROI.</h3>
                                    <p className="text-2xl text-navy-600 leading-relaxed font-light">
                                        Our enterprise clients consistently achieve high-performance outcomes.
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-8">
                                    {[
                                        { val: "40%", label: "Efficiency Boost", icon: "activity", color: "blue" },
                                        { val: "$2.5M+", label: "Avg. Savings", icon: "dollar-sign", color: "green" },
                                        { val: "< 6 Mo", label: "ROI Breakeven", icon: "calendar", color: "purple" },
                                        { val: "99.9%", label: "Satisfaction", icon: "heart", color: "pink" }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200 hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                                            <div className={`w-14 h-14 bg-${stat.color}-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-blue-600 transition-colors`}>
                                                <i data-lucide={stat.icon} className={`w-7 h-7 text-${stat.color}-600 group-hover:text-white transition-colors`}></i>
                                            </div>
                                            <div className="text-4xl font-black text-navy-950 mb-2 tracking-tight">{stat.val}</div>
                                            <div className="text-navy-500 text-sm font-bold uppercase tracking-wider">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-16 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-[120px] z-0"></div>
                                <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-700">
                                    <img src="assets\image.png" alt="Business impact" width="800" height="600" className="w-full object-cover" loading="lazy" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comprehensive Footer */}
                <footer className="bg-gradient-to-br from-navy-950 to-navy-900 text-white relative overflow-hidden py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                            {/* Company Info */}
                            <div className="space-y-6">
                                <img src="assets/3.png" alt="Echoes Software Technologies" className="h-10" />
                                <p className="text-navy-300 text-sm leading-relaxed">
                                    Precision-built enterprise software solutions driving digital transformation worldwide.
                                </p>
                                <div className="flex gap-4">
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110">
                                        <i data-lucide="linkedin" className="w-5 h-5"></i>
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110">
                                        <i data-lucide="instagram" className="w-5 h-5"></i>
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110">
                                        <i data-lucide="twitter" className="w-5 h-5"></i>
                                    </a>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Quick Links</h4>
                                <ul className="space-y-3">
                                    {['Home', 'About', 'Services', 'Solutions', 'Contact'].map((item) => (
                                        <li key={item}>
                                            <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-navy-300 hover:text-white transition-colors text-sm">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Services */}
                            <div>
                                <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Services</h4>
                                <ul className="space-y-3">
                                    <li><span className="text-navy-300 text-sm">Custom Development</span></li>
                                    <li><span className="text-navy-300 text-sm">Cloud Solutions</span></li>
                                    <li><span className="text-navy-300 text-sm">AI Integration</span></li>
                                    <li><span className="text-navy-300 text-sm">Enterprise Support</span></li>
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Contact</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3 text-navy-300 text-sm">
                                        <i data-lucide="mail" className="w-5 h-5 flex-shrink-0 mt-0.5"></i>
                                        <span>connect@echoess.in</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-navy-300 text-sm">
                                        <i data-lucide="phone" className="w-5 h-5 flex-shrink-0 mt-0.5"></i>
                                        <span>+91 81485 49511</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-navy-300 text-sm">
                                        <i data-lucide="map-pin" className="w-5 h-5 flex-shrink-0 mt-0.5"></i>
                                        <span> Karur, Tamilnadu,<br />India - 639001</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-navy-400 text-sm">
                                © 2026 Echoes Software Technologies. All rights reserved.
                            </p>
                            <div className="flex gap-6 text-sm">
                                <Link to="/privacy-policy" className="text-navy-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link to="/terms-of-service" className="text-navy-400 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>

            {/* Contact Modal */}
            {isContactModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden border border-gray-200">
                        <div className="bg-gradient-to-r from-brand-blue-600 to-indigo-600 p-8 text-white">
                            <h3 className="text-2xl font-black uppercase tracking-tight">Contact Us</h3>
                        </div>
                        <div className="p-8">
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <input className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-blue-500" placeholder="Your Name" required />
                                <input className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-blue-500" placeholder="Email Address" type="email" required />
                                <textarea className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-navy-900 h-32 focus:outline-none focus:ring-2 focus:ring-brand-blue-500" placeholder="Your Message..." required />
                                <button type="submit" className="w-full premium-gradient py-5 rounded-full font-black uppercase tracking-widest text-white shadow-lg hover:shadow-xl transition-all">Send Message</button>
                            </form>
                        </div>
                        <button onClick={closeContactModal} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all">
                            <i data-lucide="x" className="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
