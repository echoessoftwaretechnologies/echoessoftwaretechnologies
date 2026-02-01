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
                            <span className="text-brand-blue font-medium">Services</span>
                            <Link to="/about" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">About</Link>
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
                            <span className="text-brand-blue font-medium py-2">Services</span>
                            <Link to="/about" className="text-gray-600 hover:text-brand-blue transition-colors font-medium py-2">About</Link>
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
                            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">Our Professional Services</h1>
                            <p className="text-xl text-white max-w-3xl mx-auto">Comprehensive software services designed to transform your business operations, enhance productivity, and drive measurable ROI.</p>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We provide comprehensive digital solutions to help your business grow and succeed in the modern marketplace.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Website Development", description: "Custom, high-performance websites built with modern frameworks to engage your audience and drive results.", icon: "globe" },
                                { title: "Web Application", description: "Scalable and secure web applications designed to solve complex business problems and enhance user productivity.", icon: "layout" },
                                { title: "Cloud DevOps", description: "Streamlined infrastructure management and continuous delivery pipelines for faster, more reliable deployments.", icon: "cloud" },
                                { title: "Digital Marketing", description: "Data-driven marketing strategies to increase your online visibility and convert prospects into loyal customers.", icon: "trending-up" },
                                { title: "Free IT Consulting", description: "Expert guidance on technology strategy and digital transformation at no cost to help you make informed decisions.", icon: "help-circle" },
                                { title: "Graphics Designing", description: "Stunning visual designs that capture your brand's essence and make a lasting impression on your audience.", icon: "palette" },
                                { title: "UI/UX Design", description: "User-centric design solutions that provide intuitive, engaging, and seamless experiences across all devices.", icon: "mouse-pointer" },
                                { title: "AI Solutions", description: "Cutting-edge artificial intelligence and machine learning models to automate tasks and gain predictive insights.", icon: "cpu" },
                                { title: "Video Editing", description: "Professional video post-production services to create compelling visual narratives for your brand and marketing.", icon: "video" },
                                { title: "Custom Software", description: "Tailor-made software solutions built from the ground up to meet your unique business requirements and goals.", icon: "code" },
                                { title: "E-Commerce Solutions", description: "Robust and secure online stores designed to provide a premium shopping experience and maximize conversions.", icon: "shopping-cart" },
                                { title: "Maintenance & Support", description: "Reliable, round-the-clock support and maintenance to keep your digital products running smoothly and securely.", icon: "wrench" },
                                { title: "Brand Identity & Strategy", description: "Comprehensive branding services to define your voice, values, and visual identity in a competitive market.", icon: "briefcase" },
                                { title: "Social Media Marketing", description: "Strategic social media management to grow your community and drive engagement across all major platforms.", icon: "share-2" },
                                { title: "Web Design", description: "Modern, aesthetically pleasing web designs that prioritize clarity, usability, and brand consistency.", icon: "monitor" },
                                { title: "ERP Solutions", description: "Integrated enterprise resource planning systems to unify your business processes and increase efficiency.", icon: "database" },
                                { title: "Cybersecurity Solutions", description: "Advanced security measures and risk assessments to protect your critical data and digital infrastructure.", icon: "shield" }
                            ].map((service, index) => (
                                <div key={index} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group text-center flex flex-col items-center">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-blue transition-colors duration-300 mx-auto">
                                        <i data-lucide={service.icon} className="w-8 h-8 text-brand-blue group-hover:text-white transition-colors duration-300"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                    <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                                    <button
                                        onClick={() => navigate('/contact', { state: { subject: service.title } })}
                                        className="flex items-center justify-center text-brand-blue font-semibold group-hover:gap-2 transition-all hover:text-blue-700 mt-auto"
                                    >
                                        <span>Learn more</span>
                                        <i data-lucide="arrow-right" className="w-4 h-4 ml-1"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Enterprise-Grade Service Capabilities</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our comprehensive suite of services is designed to meet the most demanding enterprise requirements with unmatched performance and reliability.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="mb-6">
                                    <img src="/assets/cloud.png" alt="Cloud infrastructure" width="400" height="225" className="w-full rounded-xl object-cover" loading="lazy" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cloud Migration & Management</h3>
                                <p className="text-gray-600 mb-6">Seamlessly migrate your applications and data to the cloud with our expert team. We provide ongoing management to ensure optimal performance and cost efficiency.</p>
                                <ul className="text-sm text-gray-600 flex flex-col gap-2">
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Multi-cloud strategies</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Cost optimization</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Performance monitoring</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="mb-6">
                                    <img src="https://cdn.ailandingpage.ai/ai-landingpage/user-generate/078759a6-f815-4a17-a2de-7d7442a22df0/078759a6-f815-4a17-a2de-7d7442a22df0/features/features-2-f878106d63814a39b552c4aa5d947d65.png" alt="Enterprise security" width="400" height="225" className="w-full rounded-xl object-cover" loading="lazy" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Security Assessment & Implementation</h3>
                                <p className="text-gray-600 mb-6">Comprehensive security evaluation and implementation of enterprise-grade security measures to protect your critical assets and ensure regulatory compliance.</p>
                                <ul className="text-sm text-gray-600 flex flex-col gap-2">
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Vulnerability assessments</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Compliance frameworks</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Security training</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="mb-6">
                                    <img src="https://cdn.ailandingpage.ai/ai-landingpage/user-generate/078759a6-f815-4a17-a2de-7d7442a22df0/078759a6-f815-4a17-a2de-7d7442a22df0/features/features-3-b518b003c15d49658f6f86d799a0c684.png" alt="Analytics and insights" width="400" height="225" className="w-full rounded-xl object-cover" loading="lazy" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Analytics & Business Intelligence</h3>
                                <p className="text-gray-600 mb-6">Transform your data into actionable insights with our advanced analytics and business intelligence services that drive strategic decision-making.</p>
                                <ul className="text-sm text-gray-600 flex flex-col gap-2">
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Custom dashboards</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Predictive modeling</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Data visualization</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
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

                <section className="py-12" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
                            <div className="text-center mb-8 relative z-10">
                                <div className="mb-4">
                                    <svg className="w-12 h-12 mx-auto text-[#1864ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Mobile App Available</h2>
                                <p className="text-gray-600 max-w-xl mx-auto">Access our powerful software solutions anytime, anywhere with our feature-rich mobile application.</p>
                            </div>

                            <div className="flex flex-col gap-8 relative z-10">
                                <div className="w-full">
                                    <div className="bg-gradient-to-br from-[#1864ff] to-[#2563eb] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                                        <div className="flex items-center mb-5">
                                            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center mr-3 shadow-md flex-shrink-0">
                                                <svg className="w-5 h-5 text-[#1864ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-0.5">Echoes Mobile</h3>
                                                <p className="opacity-90 text-sm">Android Application</p>
                                            </div>
                                        </div>
                                        <p className="mb-6 opacity-95 text-sm leading-relaxed">Experience our enterprise software solutions on the go. Manage your business operations, access real-time analytics, and stay connected with our platform from anywhere.</p>
                                        <div className="grid grid-cols-1 gap-3 mb-6">
                                            <div className="flex items-center gap-2 bg-white/15 p-2.5 rounded-xl">
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                                </svg>
                                                <span className="text-sm">Fast Performance</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-white/15 p-2.5 rounded-xl">
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                                </svg>
                                                <span className="text-sm">Secure Access</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-white/15 p-2.5 rounded-xl">
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                                </svg>
                                                <span className="text-sm">Real-time Data</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-white/15 p-2.5 rounded-xl">
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                                </svg>
                                                <span className="text-sm">Offline Sync</span>
                                            </div>
                                        </div>
                                        <a href="./Echoes Software Technologies.apk" download className="flex items-center justify-center bg-white text-[#1864ff] font-bold p-3.5 rounded-full w-full transition-all shadow-md hover:shadow-lg">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                            </svg>
                                            Download APK File
                                        </a>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <div className="bg-[#f8fafc] rounded-2xl p-6 border border-[#e2e8f0]">
                                        <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                                            <svg className="w-6 h-6 text-[#1864ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Key Features
                                        </h3>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex gap-3.5">
                                                <div className="flex-shrink-0 w-9 h-9 bg-[#dbeafe] rounded-lg flex items-center justify-center mt-0.5">
                                                    <svg className="w-4 h-4 text-[#1864ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">Dashboard Access</h4>
                                                    <p className="text-gray-500 text-sm leading-relaxed">Monitor key metrics and business performance from your mobile device.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3.5">
                                                <div className="flex-shrink-0 w-9 h-9 bg-[#dbeafe] rounded-lg flex items-center justify-center mt-0.5">
                                                    <svg className="w-4 h-4 text-[#1864ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">Team Collaboration</h4>
                                                    <p className="text-gray-500 text-sm leading-relaxed">Stay connected with your team and share updates from anywhere.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3.5">
                                                <div className="flex-shrink-0 w-9 h-9 bg-[#dbeafe] rounded-lg flex items-center justify-center mt-0.5">
                                                    <svg className="w-4 h-4 text-[#1864ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">Notifications</h4>
                                                    <p className="text-gray-500 text-sm leading-relaxed">Receive real-time notifications about important business updates.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3.5">
                                                <div className="flex-shrink-0 w-9 h-9 bg-[#dbeafe] rounded-lg flex items-center justify-center mt-0.5">
                                                    <svg className="w-4 h-4 text-[#1864ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.544-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">Customization</h4>
                                                    <p className="text-gray-500 text-sm leading-relaxed">Customize settings to best suit your mobile business workflow.</p>
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
                            <ul className="flex flex-col gap-2">
                                <li><Link to="/solutions" className="text-blue-100 hover:text-white transition-colors">Enterprise Software</Link></li>
                                <li><Link to="/solutions" className="text-blue-100 hover:text-white transition-colors">Cloud Solutions</Link></li>
                                <li><Link to="/solutions" className="text-blue-100 hover:text-white transition-colors">Custom Development</Link></li>
                                <li><Link to="/solutions" className="text-blue-100 hover:text-white transition-colors">Integration Services</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Company</h3>
                            <ul className="flex flex-col gap-2">
                                <li><Link to="/about" className="text-blue-100 hover:text-white transition-colors">About Us</Link></li>
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
        </div>
    );
};

export default Services;
