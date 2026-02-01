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
                            <span className="text-brand-blue font-medium">Solutions</span>
                            <Link to="/services" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">Services</Link>
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
                            <span className="text-brand-blue font-medium py-2">Solutions</span>
                            <Link to="/services" className="text-gray-600 hover:text-brand-blue transition-colors font-medium py-2">Services</Link>
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
                            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">Our Software Solutions</h1>
                            <p className="text-xl text-white max-w-3xl mx-auto">Comprehensive software solutions designed to transform your business operations, enhance productivity, and drive measurable ROI.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Enterprise-Grade Software Capabilities</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our comprehensive suite of software solutions is designed to meet the most demanding enterprise requirements with unmatched performance and reliability.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="mb-6">
                                    <img src="/assets/cloud.png" alt="Cloud infrastructure" width="400" height="225" className="w-full rounded-xl object-cover" loading="lazy" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Scalable Cloud Architecture</h3>
                                <p className="text-gray-600 mb-6">Built on enterprise-grade cloud infrastructure that scales seamlessly from startup to Fortune 500, ensuring optimal performance at any size.</p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Auto-scaling capabilities</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>99.99% uptime guarantee</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Global CDN distribution</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="mb-6">
                                    <img src="https://cdn.ailandingpage.ai/ai-landingpage/user-generate/078759a6-f815-4a17-a2de-7d7442a22df0/078759a6-f815-4a17-a2de-7d7442a22df0/features/features-2-f878106d63814a39b552c4aa5d947d65.png" alt="Enterprise security" width="400" height="225" className="w-full rounded-xl object-cover" loading="lazy" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Security Framework</h3>
                                <p className="text-gray-600 mb-6">Military-grade security protocols and compliance standards that protect your most sensitive data and ensure regulatory compliance.</p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>End-to-end encryption</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>SOC 2 Type II certified</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Multi-factor authentication</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="mb-6">
                                    <img src="https://cdn.ailandingpage.ai/ai-landingpage/user-generate/078759a6-f815-4a17-a2de-7d7442a22df0/078759a6-f815-4a17-a2de-7d7442a22df0/features/features-3-b518b003c15d49658f6f86d799a0c684.png" alt="Analytics and insights" width="400" height="225" className="w-full rounded-xl object-cover" loading="lazy" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Intelligent Analytics</h3>
                                <p className="text-gray-600 mb-6">AI-powered analytics and real-time insights that transform raw data into actionable business intelligence for strategic decision-making.</p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Real-time dashboards</span>
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
                                        <span>Custom reporting</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Software Solutions</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">From custom development to enterprise consulting, we deliver innovative technology solutions that drive business growth and digital transformation.</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <img src="https://cdn.ailandingpage.ai/ai-landingpage/user-generate/078759a6-f815-4a17-a2de-7d7442a22df0/078759a6-f815-4a17-a2de-7d7442a22df0/services/services-1-da0ae4e712a64822bff4dcdce96bd59b.png" alt="Custom Software Development" width="1200" height="900" className="w-full rounded-2xl object-cover shadow-sm mb-6" loading="lazy" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom Software Development</h3>
                                <p className="text-gray-600 mb-6">Tailored solutions built from the ground up to meet your unique business requirements. Our expert developers create scalable, secure, and high-performance applications.</p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Web & Mobile Applications</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Enterprise Software Solutions</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>API Development & Integration</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <img src="/assets/COMPANY_OFFICE.jpeg" alt="Technology Consulting" width="1200" height="900" className="w-full rounded-2xl object-cover shadow-sm mb-6" loading="lazy" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Technology Consulting</h3>
                                <p className="text-gray-600 mb-6">Strategic guidance to optimize your technology stack and accelerate digital transformation. Our consultants bring deep industry expertise to every engagement.</p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Digital Strategy & Planning</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Architecture & Design</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Technology Audits</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                                <p className="text-gray-600">Round-the-clock technical support and maintenance to ensure your systems run smoothly.</p>
                            </div>
                            <div className="text-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Security First</h3>
                                <p className="text-gray-600">Enterprise-grade security measures and compliance standards built into every solution.</p>
                            </div>
                            <div className="text-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Rapid Deployment</h3>
                                <p className="text-gray-600">Agile development methodologies for faster time-to-market and iterative improvements.</p>
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

export default Solutions;
