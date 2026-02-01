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
        <div className="bg-white text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <header className="bg-white bg-opacity-80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 rounded-b-2xl shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img src="/assets/2.png" alt="Echoes Software Technologies" width="150" height="40" />
                            </div>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">Home</Link>
                            <Link to="/solutions" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">Solutions</Link>
                            <Link to="/services" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">Services</Link>
                            <span className="text-brand-blue font-medium">About</span>
                            <Link to="/contact" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">Contact</Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleGetStarted}
                                className="get-started-btn bg-brand-blue text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors hidden md:block inline-block"
                            >
                                Login
                            </button>
                            <button className="md:hidden p-2" onClick={toggleMobileMenu}>
                                <i data-lucide={isMobileMenuOpen ? "x" : "menu"} className="w-6 h-6"></i>
                            </button>
                        </div>
                    </div>
                    {/* Mobile menu */}
                    <div id="mobile-menu" className={`${isMobileMenuOpen ? '' : 'hidden'} md:hidden bg-white bg-opacity-90 backdrop-blur-md py-4 border-t border-gray-200/50 rounded-b-lg`}>
                        <nav className="flex flex-col space-y-3 px-4">
                            <Link to="/" className="text-gray-600 hover:text-brand-blue transition-colors font-medium py-2">Home</Link>
                            <Link to="/solutions" className="text-gray-600 hover:text-brand-blue transition-colors font-medium py-2">Solutions</Link>
                            <Link to="/services" className="text-gray-600 hover:text-brand-blue transition-colors font-medium py-2">Services</Link>
                            <span className="text-brand-blue font-medium py-2">About</span>
                            <Link to="/contact" className="text-gray-600 hover:text-brand-blue transition-colors font-medium py-2">Contact</Link>
                            <button
                                onClick={handleGetStarted}
                                className="get-started-btn bg-brand-blue text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors w-full mt-2 inline-block text-center"
                            >
                                Login
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            <main>
                <section className="bg-[#1864ff] py-20 lg:py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">About Echoes Software Technologies</h1>
                            <p className="text-xl text-white max-w-3xl mx-auto">We are a leading software company delivering premium enterprise solutions that transform businesses through technology and innovation.</p>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                                <p className="text-lg text-gray-600 mb-6">At Echoes Software Technologies, our mission is to empower businesses with innovative software solutions that drive growth, efficiency, and competitive advantage. We believe in the transformative power of technology to solve complex business challenges.</p>
                                <p className="text-lg text-gray-600 mb-6">We partner with industry leaders to deliver innovative software solutions that not only meet current needs but also anticipate future requirements, ensuring our clients stay ahead in an ever-evolving digital landscape.</p>
                                <div className="flex items-center space-x-4 mt-8">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-gray-700">ISO 27001 Certified</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-gray-700">24/7 Enterprise Support</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <img src="/assets/our_mission.avif" alt="Our mission" width="800" height="600" className="w-full rounded-2xl object-cover shadow-xl" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We are guided by core principles that shape our culture, drive our decisions, and define our approach to every project and partnership.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-gray-50 rounded-2xl p-8 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence</h3>
                                <p className="text-gray-600">We are committed to delivering the highest quality solutions and services, setting the standard for excellence in everything we do.</p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-8 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
                                <p className="text-gray-600">We embrace innovative technologies and creative approaches to solve complex problems and drive meaningful change.</p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-8 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Integrity</h3>
                                <p className="text-gray-600">We conduct business with the highest level of honesty, transparency, and ethical standards in all our interactions.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Echoes Software Technologies</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We stand out in the industry with our unique approach to software development and client partnerships.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Track Record</h3>
                                <p className="text-gray-600">With over 150+ enterprise clients and a 99.9% uptime guarantee, we deliver reliable solutions that drive measurable results.</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation-Driven</h3>
                                <p className="text-gray-600">We leverage innovative technologies including AI and machine learning to build future-ready solutions for our clients.</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Client-Centric Approach</h3>
                                <p className="text-gray-600">Our solutions are tailored to meet your specific business needs, with dedicated support throughout the entire process.</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Security First</h3>
                                <p className="text-gray-600">ISO 27001 certified with SOC 2 compliance, ensuring your data is protected with the highest security standards.</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Scalable Solutions</h3>
                                <p className="text-gray-600">Our solutions grow with your business, from startup to enterprise, ensuring long-term value and adaptability.</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
                                <p className="text-gray-600">Round-the-clock support ensures your systems run smoothly with minimal downtime and maximum efficiency.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Founder</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Learn about the visionary behind Echoes Software Technologies</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">
                            <div className="flex-shrink-0">
                                <img src="/assets/ukaasha_founder.png" alt="Mohamed Ukaasha, Founder" width="400" height="400" className="w-64 h-64 rounded-full object-cover border-8 border-blue-100" loading="lazy" />
                            </div>

                            <div className="text-center md:text-left">
                                <h3 className="text-3xl font-bold text-gray-900 mb-2">Mohamed Ukaasha</h3>
                                <div className="text-blue-600 font-bold text-xl mb-4">Founder</div>
                                <p className="text-gray-600 text-lg mb-6">Visionary founder with 15+ years of experience in the software industry and a passion for innovation.</p>

                                <div className="space-y-3 text-gray-600">
                                    <p className="mb-4">Mohamed Ukaasha founded Echoes Software Technologies with a vision to transform businesses through innovative software solutions. His expertise in enterprise software development and commitment to excellence has driven the company's success.</p>
                                    <p>With a deep understanding of technology trends and business needs, Mohamed leads the company's strategic direction while maintaining focus on delivering value to clients worldwide.</p>
                                </div>

                                <div className="mt-6">
                                    <a href="#" className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors duration-300">View Portfolio</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Executive Leadership</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Key executives who drive our strategic vision and operational excellence.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="text-center">
                                <img src="/assets/thalha_scc.png" alt="Thalha, Senior Content Creator" width="400" height="400" className="w-48 h-48 rounded-full object-cover mx-auto mb-6" loading="lazy" />
                                <h3 className="text-2xl font-bold text-gray-900">Thalha</h3>
                                <div className="text-blue-600 font-medium mb-2">Senior Content Creator</div>
                                <p className="text-gray-600">Creative storyteller with expertise in technical content and brand communication.</p>
                            </div>
                            <div className="text-center">
                                <img src="/assets/mufeez_gd.png" alt="Mohammed Mufeez, Graphic Designer" width="400" height="400" className="w-48 h-48 rounded-full object-cover mx-auto mb-6" loading="lazy" />
                                <h3 className="text-2xl font-bold text-gray-900">Mohammed Mufeez</h3>
                                <div className="text-blue-600 font-medium mb-2">Graphic Designer</div>
                                <p className="text-gray-600">Award-winning designer specializing in UI/UX and visual brand identity.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-48 h-48 rounded-full object-cover mx-auto mb-6 flex items-center justify-center bg-gray-100">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Coming Soon</h3>
                                <div className="text-gray-500 font-medium mb-2">Executive Position</div>
                                <p className="text-gray-600">We're always looking for talented executives to join our leadership team.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12 mt-12">
                            <div className="text-center">
                                <img src="/assets/jamal_aid.png" alt="Jamal Abdul, AI Director" width="400" height="400" className="w-48 h-48 rounded-full object-cover mx-auto mb-6" loading="lazy" />
                                <h3 className="text-2xl font-bold text-gray-900">Jamal Abdul</h3>
                                <div className="text-blue-600 font-medium mb-2">AI Director</div>
                                <p className="text-gray-600">AI and machine learning expert leading our innovation in artificial intelligence solutions.</p>
                            </div>
                            <div className="text-center">
                                <img src="/assets/abdul_raafih_hr.png" alt="Abdul Raafih, HR Manager" width="400" height="400" className="w-48 h-48 rounded-full object-cover mx-auto mb-6" loading="lazy" />
                                <h3 className="text-2xl font-bold text-gray-900">Abdul Raafih</h3>
                                <div className="text-blue-600 font-medium mb-2">HR Manager</div>
                                <p className="text-gray-600">Talent management specialist focused on building and maintaining our exceptional team culture.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-48 h-48 rounded-full object-cover mx-auto mb-6 flex items-center justify-center bg-gray-100">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Coming Soon</h3>
                                <div className="text-gray-500 font-medium mb-2">Open Position</div>
                                <p className="text-gray-600">We're always looking for talented individuals to join our team.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-blue-50 to-white py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="grid lg:grid-cols-2 gap-0">
                                <div className="p-12 lg:p-16 flex flex-col justify-center">
                                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Ready to Transform Your Business?</h2>
                                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">Join hundreds of companies that trust Echoes Software Technologies to deliver innovative solutions. Schedule a consultation today and discover how we can accelerate your digital transformation.</p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <a href="https://forms.gle/K3LySpfU6YYvQKGj9" target="_blank" className="inline-block bg-[#1864ff] hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center">Schedule Consultation</a>
                                        <a href="https://forms.gle/JNS54uLpgQXWP8NZ9" target="_blank" className="inline-block border-2 border-[#1864ff] text-[#1864ff] hover:bg-[#1864ff] hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-center">Request Demo</a>
                                    </div>
                                    <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>Free consultation</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>No commitment required</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative bg-gradient-to-br from-[#1864ff] to-blue-700 p-12 lg:p-16 flex items-center justify-center">
                                    <img src="https://cdn.ailandingpage.ai/ai-landingpage/user-generate/078759a6-f815-4a17-a2de-7d7442a22df0/078759a6-f815-4a17-a2de-7d7442a22df0/cta/cta-main-3784e0b0ce6e4eadaafd560623263cce.png" alt="Professional software development team collaboration" width="800" height="600" className="w-full rounded-2xl object-cover shadow-2xl" loading="lazy" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-[#1864ff] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="mb-4">
                                <img src="/assets/3.png" alt="Echoes Software Technologies" className="h-10" />
                            </div>
                            <p className="text-blue-100 mb-4 max-w-md">Delivering premium enterprise software solutions that transform businesses through technology and innovation.</p>
                            <div className="flex space-x-4">
                                <a href="https://www.linkedin.com/company/echoes-software-solutions/posts/?feedView=all" className="text-blue-100 hover:text-white transition-colors">
                                    <i data-lucide="linkedin" className="w-5 h-5"></i>
                                </a>
                                <a href="https://wa.me/+918148549511" className="text-blue-100 hover:text-white transition-colors">
                                    <i data-lucide="message-circle" className="w-5 h-5"></i>
                                </a>
                                <a href="https://www.instagram.com/echoes_software_technologies/" className="text-blue-100 hover:text-white transition-colors">
                                    <i data-lucide="instagram" className="w-5 h-5"></i>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
                            <ul className="space-y-2">
                                <li><Link to="/solutions" className="text-blue-100 hover:text-white transition-colors">Enterprise Software</Link></li>
                                <li><Link to="/solutions" className="text-blue-100 hover:text-white transition-colors">Cloud Solutions</Link></li>
                                <li><Link to="/solutions" className="text-blue-100 hover:text-white transition-colors">Custom Development</Link></li>
                                <li><Link to="/solutions" className="text-blue-100 hover:text-white transition-colors">Integration Services</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li><span className="text-blue-100 cursor-default">About Us</span></li>
                                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">News</a></li>
                                <li><Link to="/contact" className="text-blue-100 hover:text-white transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-blue-400 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-blue-100 text-sm">© 2026 Echoes Software Technologies. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link to="/privacy-policy" className="text-blue-100 hover:text-white transition-colors text-sm">Privacy Policy</Link>
                            <Link to="/terms-of-service" className="text-blue-100 hover:text-white transition-colors text-sm">Terms of Service</Link>
                            <a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Security</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Contact Modal */}
            {isContactModalOpen && (
                <div id="contactModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-bold text-gray-900">Get in Touch</h3>
                                <button onClick={closeContactModal} className="text-gray-500 hover:text-gray-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="modalName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" id="modalName" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
                                </div>
                                <div>
                                    <label htmlFor="modalEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" id="modalEmail" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
                                </div>
                                <div>
                                    <label htmlFor="modalMessage" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea id="modalMessage" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"></textarea>
                                </div>
                                <div className="pt-4">
                                    <button type="submit" className="w-full bg-brand-blue text-white px-6 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;
