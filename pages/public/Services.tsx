import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

declare global {
    interface Window {
        lucide: any;
    }
}

const Services: React.FC = () => {
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
        <div className="bg-white text-navy-900 scroll-smooth selection:bg-brand-blue-100 selection:text-brand-blue-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
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
                                    className={`text-sm font-black uppercase tracking-[0.2em] transition-all relative group nav-blip ${item === 'Services' ? 'text-brand-blue-600 active' : 'text-navy-900 hover:text-brand-blue-600'}`}
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
                                    className={`text-3xl font-black uppercase tracking-tighter transition-all ${item === 'Services' ? 'text-brand-blue-600 pl-4 border-l-4 border-brand-blue-600' : 'text-navy-950 hover:text-brand-blue-600'}`}
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
                                <span className="uppercase tracking-[0.2em]">WORLD-CLASS EXPERTISE</span>
                            </div>
                            <h1 className="text-6xl lg:text-8xl font-extrabold text-navy-950 leading-[1] tracking-tight text-balance mb-10">
                                Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-600 via-brand-blue-500 to-brand-blue-800 animate-shimmer" style={{ backgroundSize: '200% auto' }}>Professional</span> Services
                            </h1>
                            <p className="text-2xl text-navy-600 max-w-3xl mx-auto leading-relaxed font-light">
                                Comprehensive ecosystem of software services precision-engineered to transform enterprise productivity and scale global operations.
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
                            <h2 className="text-brand-blue-600 font-black tracking-[0.3em] text-sm uppercase">OUR EXPERTISE</h2>
                            <h3 className="text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight">Ecosystem of Solutions</h3>
                            <p className="text-2xl text-navy-600 max-w-2xl mx-auto font-light leading-relaxed">
                                We provide a specialized range of premium software services tailored to drive enterprise growth.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[
                                { title: "Website Development", description: "Custom, high-performance websites built with modern frameworks to engage and convert.", icon: "globe" },
                                { title: "Web Application", description: "Scalable and secure web apps designed to solve complex business logic with ease.", icon: "layout" },
                                { title: "Cloud DevOps", description: "Seamless infrastructure management and continuous delivery for global scalability.", icon: "cloud" },
                                { title: "Digital Marketing", description: "Data-driven strategies to increase visibility and ROI across digital channels.", icon: "trending-up" },
                                { title: "Free IT Consulting", description: "Expert technology strategy consulting at zero cost to accelerate your roadmap.", icon: "help-circle" },
                                { title: "Graphics Designing", description: "Premium visual assets that capture brand essence and leave a lasting mark.", icon: "palette" },
                                { title: "UI/UX Design", description: "Intuitive, human-centric design solutions for seamless cross-device experiences.", icon: "mouse-pointer" },
                                { title: "AI Solutions", description: "Cutting-edge machine learning models to automate tasks and gain intelligence.", icon: "cpu" },
                                { title: "Video Editing", description: "Professional post-production storytelling to elevate your brand's message.", icon: "video" },
                                { title: "Custom Software", description: "Bespoke software engineered from the ground up for unique business needs.", icon: "code" },
                                { title: "E-Commerce Solutions", description: "Robust stores designed for high-conversion and secure premium shopping.", icon: "shopping-cart" },
                                { title: "Maintenance & Support", description: "Round-the-clock elite support to keep your ecosystem secure and optimized.", icon: "wrench" },
                                { title: "Brand Identity", description: "Comprehensive branding services to define your voice in a global market.", icon: "briefcase" },
                                { title: "Social Media Mktg", description: "Strategic management to scale your community and drive participation.", icon: "share-2" },
                                { title: "Web Design", description: "Modern, aesthetically-led designs prioritizing clarity, speed, and status.", icon: "monitor" },
                                { title: "ERP Solutions", description: "Integrated resource systems to unify processes and maximize efficiency.", icon: "database" },
                                { title: "Cybersecurity", description: "Military-grade measures and assessments to protect your critical data.", icon: "shield" }
                            ].map((service, index) => (
                                <div key={index} className="group bg-white p-12 rounded-[3rem] border border-navy-100 shadow-glass hover:shadow-premium hover-lift transition-all duration-500 text-center flex flex-col items-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue-500 to-brand-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="w-24 h-24 bg-brand-blue-50/50 rounded-[2rem] flex items-center justify-center mb-10 group-hover:bg-brand-blue-600 transition-all duration-500 shadow-sm">
                                        <i data-lucide={service.icon} className="w-12 h-12 text-brand-blue-600 group-hover:text-white transition-colors duration-500 group-hover:rotate-12"></i>
                                    </div>
                                    <h3 className="text-2xl font-black text-navy-950 mb-6 uppercase tracking-tight group-hover:text-brand-blue-600 transition-colors">{service.title}</h3>
                                    <p className="text-navy-600 leading-relaxed mb-10 text-lg font-light flex-grow">{service.description}</p>
                                    <button
                                        onClick={() => navigate('/contact', { state: { subject: service.title } })}
                                        className="flex items-center justify-center text-brand-blue-600 font-black uppercase tracking-widest text-xs hover:text-brand-blue-800 transition-all group-hover:gap-4 mt-auto py-4 px-10 rounded-full hover:bg-brand-blue-50 border border-brand-blue-100"
                                    >
                                        <span>Learn more</span>
                                        <i data-lucide="arrow-right" className="w-5 h-5"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enterprise-Grade Service Capabilities */}
                <section className="bg-white py-32 relative overflow-hidden">
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-brand-blue-50 rounded-full blur-[100px] pointer-events-none opacity-50"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-24 space-y-6">
                            <h2 className="text-brand-blue-600 font-black tracking-[0.2em] text-sm uppercase">BEYOND DELIVERY</h2>
                            <h3 className="text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight">Enterprise-Grade Standards</h3>
                            <p className="text-2xl text-navy-600 max-w-2xl mx-auto font-light leading-relaxed">
                                Our services are backed by industry-leading protocols and technical excellence.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: "Global Scalability", desc: "Architecture designed to support millions of concurrent users with sub-second latency.", icon: "zap" },
                                { title: "Defense-In-Depth", desc: "Multi-layered security protocols ensuring total protection of enterprise data assets.", icon: "shield" },
                                { title: "24/7 Elite Support", desc: "Dedicated team of technical experts available round-the-clock for mission-critical care.", icon: "headphones" },
                                { title: "Agile Precision", desc: "Rapid deployment cycles combined with rigorous quality assurance for zero-defect delivery.", icon: "target" }
                            ].map((cap, i) => (
                                <div key={i} className="bg-navy-50/50 rounded-3xl p-10 border border-navy-100 hover:bg-white hover:shadow-premium transition-all duration-300 group hover-lift text-center">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-brand-blue-600 transition-colors mx-auto">
                                        <i data-lucide={cap.icon} className="w-8 h-8 text-brand-blue-600 group-hover:text-white transition-colors"></i>
                                    </div>
                                    <h4 className="text-xl font-black text-navy-950 mb-4 uppercase tracking-tight group-hover:text-brand-blue-600 transition-colors">{cap.title}</h4>
                                    <p className="text-navy-600 leading-relaxed font-light">{cap.desc}</p>
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
                                    Power Your <br />
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-400 to-brand-blue-200">Digital Transformation</span>
                                </h2>
                                <p className="text-2xl text-navy-200 leading-relaxed font-light">
                                    Partner with Echoes Software Technologies to leverage world-class <br className="hidden lg:block" />
                                    engineering talent for your next strategic initiative.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                                <a href="https://forms.gle/K3LySpfU6YYvQKGj9" target="_blank" rel="noopener noreferrer"
                                    className="w-full sm:w-auto premium-gradient text-white font-black px-12 py-6 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-premium shadow-2xl shadow-brand-blue-900/40 text-center text-xl uppercase tracking-widest">
                                    Consult an Expert
                                </a>
                                <a href="https://forms.gle/JNS54uLpgQXWP8NZ9" target="_blank" rel="noopener noreferrer"
                                    className="w-full sm:w-auto glass-dark hover:bg-white/10 text-white font-black px-12 py-6 rounded-full transition-all duration-500 border border-white/20 text-center text-xl uppercase tracking-widest">
                                    Request Ecosystem Demo
                                </a>
                            </div>

                            <div className="pt-10 flex flex-wrap items-center justify-center gap-12 text-navy-400">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <i data-lucide="check" className="w-5 h-5 text-green-500"></i>
                                    </div>
                                    <span className="font-bold uppercase text-xs tracking-[0.2em]">Priority Onboarding</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <i data-lucide="check" className="w-5 h-5 text-green-500"></i>
                                    </div>
                                    <span className="font-bold uppercase text-xs tracking-[0.2em]">Dedicated Team Lead</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <i data-lucide="check" className="w-5 h-5 text-green-500"></i>
                                    </div>
                                    <span className="font-bold uppercase text-xs tracking-[0.2em]">Global SLA Guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mobile App Section */}
                <section className="bg-navy-50 py-32 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="bg-white rounded-[3rem] shadow-premium p-12 lg:p-20 relative overflow-hidden border border-navy-100">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>

                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div className="space-y-10">
                                    <div className="space-y-6">
                                        <div className="w-16 h-16 bg-brand-blue-50 rounded-2xl flex items-center justify-center text-brand-blue-600 shadow-sm">
                                            <i data-lucide="smartphone" className="w-8 h-8"></i>
                                        </div>
                                        <h2 className="text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">Mobile Ecosystem <br /> Now Available</h2>
                                        <p className="text-xl text-navy-600 font-light leading-relaxed">
                                            Access our powerful software solutions anytime, anywhere. Our feature-rich mobile application keeps your business at your fingertips.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        {['Hyper-fast Performance', 'Military-grade Secure Access', 'Real-time Ecosystem Sync', 'Advanced Offline Mode'].map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-4 group">
                                                <div className="w-10 h-10 rounded-xl bg-brand-blue-50 flex items-center justify-center group-hover:bg-brand-blue-600 transition-colors">
                                                    <i data-lucide="zap" className="w-5 h-5 text-brand-blue-600 group-hover:text-white"></i>
                                                </div>
                                                <span className="text-lg font-bold text-navy-800 tracking-tight uppercase tracking-widest text-xs">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <a href="./Echoes Software Technologies.apk" download
                                        className="inline-flex items-center justify-center premium-gradient text-white font-black px-12 py-6 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-premium shadow-xl shadow-brand-blue-200 text-xl uppercase tracking-widest w-full sm:w-auto">
                                        <i data-lucide="download" className="w-6 h-6 mr-3"></i>
                                        Download App (APK)
                                    </a>
                                </div>

                                <div className="relative">
                                    <div className="absolute -inset-10 bg-brand-blue-100/30 rounded-full blur-[80px] z-0"></div>
                                    <div className="relative z-10 bg-navy-950 p-4 rounded-[3rem] shadow-2xl border-4 border-white/20 hover:rotate-2 transition-transform duration-700">
                                        <div className="bg-navy-900 rounded-[2.5rem] p-8 text-white space-y-6 aspect-[9/16] flex flex-col justify-center border border-white/10">
                                            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-10"></div>
                                            <div className="space-y-2 text-center">
                                                <img src="./assets/3.png" alt="Echoes Mobile" className="h-8 mx-auto" />
                                                <div className="text-2xl font-black uppercase tracking-[0.2em] italic">Mobile</div>
                                            </div>
                                            <div className="flex-grow flex items-center justify-center">
                                                <div className="w-40 h-40 bg-brand-blue-600/20 rounded-full flex items-center justify-center animate-pulse">
                                                    <i data-lucide="shield-check" className="w-20 h-20 text-brand-blue-500"></i>
                                                </div>
                                            </div>
                                            <div className="text-center space-y-4">
                                                <div className="text-xs font-bold text-white/40 uppercase tracking-widest">System Status</div>
                                                <div className="flex justify-center gap-2">
                                                    {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-1 bg-brand-blue-500 rounded-full"></div>)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                        <Link to="/solutions" className="text-3xl font-black text-white hover:text-brand-blue-400 uppercase tracking-widest" onClick={toggleMobileMenu}>Solutions</Link>
                        <Link to="/services" className="text-3xl font-black text-brand-blue-400 uppercase tracking-widest" onClick={toggleMobileMenu}>Services</Link>
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

export default Services;
