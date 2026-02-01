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
        <div className="bg-white text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <header className="bg-white bg-opacity-80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 rounded-b-2xl shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img src="./assets/2.png" alt="Echoes Software Technologies" width="150" height="40" />
                            </div>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <span className="text-brand-blue font-medium">Home</span>
                            <Link to="/solutions" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">Solutions</Link>
                            <Link to="/services" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">Services</Link>
                            <Link to="/about" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">About</Link>
                            <Link to="/contact" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">Contact</Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleLoginClick}
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
                    <div className={`${isMobileMenuOpen ? '' : 'hidden'} md:hidden bg-white bg-opacity-90 backdrop-blur-md py-4 border-t border-gray-200/50 rounded-b-lg`}>
                        <nav className="flex flex-col space-y-3 px-4">
                            <span className="text-brand-blue font-medium py-2">Home</span>
                            <Link to="/solutions" className="text-gray-600 hover:text-brand-blue transition-colors font-medium py-2">Solutions</Link>
                            <Link to="/services" className="text-gray-600 hover:text-brand-blue transition-colors font-medium py-2">Services</Link>
                            <Link to="/about" className="text-gray-600 hover:text-brand-blue transition-colors font-medium py-2">About</Link>
                            <Link to="/contact" className="text-gray-600 hover:text-brand-blue transition-colors font-medium py-2">Contact</Link>
                            <button
                                onClick={handleLoginClick}
                                className="get-started-btn bg-brand-blue text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors w-full mt-2 inline-block text-center"
                            >
                                Login
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            <main>
                <section className="bg-white py-20 lg:py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">Premium Enterprise <span className="text-blue-600">Software Solutions</span></h1>
                                <p className="text-xl text-gray-600 leading-relaxed">Echoes Software Technologies delivers a software that transforms business operations, enhances productivity, and drives measurable ROI for Fortune 500 companies worldwide.</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="https://forms.gle/K3LySpfU6YYvQKGj9" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-200 text-center">Schedule Consultation</a>
                                    <Link to="/services" className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-200 inline-block text-center">Learn More</Link>
                                </div>
                                <div className="flex items-center space-x-8 text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>ISO 27001 Certified</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>24/7 Enterprise Support</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <img src="assets/hero_img.png" alt="Enterprise software solutions in action" width="800" height="600" className="w-full rounded-2xl object-cover shadow-2xl" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Scalable Cloud Architecture Section */}
                <section className="bg-gray-50 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Enterprise-Grade Software Capabilities</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our comprehensive suite of software solutions is designed to meet the most demanding enterprise requirements with unmatched performance and reliability.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="mb-6">
                                    <img src="assets/cloud.png" alt="Cloud infrastructure" width="400" height="225" className="w-full rounded-xl object-cover" loading="lazy" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Scalable Cloud Architecture</h3>
                                <p className="text-gray-600 mb-6">Built on enterprise-grade cloud infrastructure that scales seamlessly from startup to Fortune 500, ensuring optimal performance at any size.</p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        Auto-scaling capabilities
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        99.99% uptime guarantee
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        Global CDN distribution
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
                                        End-to-end encryption
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        SOC 2 Type II certified
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        Multi-factor authentication
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
                                        Real-time dashboards
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        Predictive modeling
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        Custom reporting
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Measurable Business Impact Section */}
                <section className="bg-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Measurable Business Impact & ROI</h2>
                                <p className="text-xl text-gray-600">Our enterprise clients consistently achieve significant operational improvements and cost savings within the first year of implementation.</p>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="bg-blue-50 rounded-xl p-6">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">40%</div>
                                        <div className="text-gray-700 font-medium">Operational Efficiency Increase</div>
                                    </div>
                                    <div className="bg-blue-50 rounded-xl p-6">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">$2.5M</div>
                                        <div className="text-gray-700 font-medium">Average Annual Cost Savings</div>
                                    </div>
                                    <div className="bg-blue-50 rounded-xl p-6">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">6 Months</div>
                                        <div className="text-gray-700 font-medium">Average ROI Breakeven</div>
                                    </div>
                                    <div className="bg-blue-50 rounded-xl p-6">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">99.8%</div>
                                        <div className="text-gray-700 font-medium">Client Satisfaction Rate</div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Streamlined Operations</h3>
                                            <p className="text-gray-600">Eliminate redundant processes and automate complex workflows to reduce operational overhead by up to 40%.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Enhanced Decision Making</h3>
                                            <p className="text-gray-600">Real-time data insights enable faster, more informed strategic decisions that drive competitive advantage.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Scalable Growth</h3>
                                            <p className="text-gray-600">Future-proof architecture that grows with your business, supporting expansion without performance degradation.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <img src="https://cdn.ailandingpage.ai/ai-landingpage/user-generate/078759a6-f815-4a17-a2de-7d7442a22df0/078759a6-f815-4a17-a2de-7d7442a22df0/benefits/benefits-main-e7f9229f779741c6915ff0d199c9cdd1.png" alt="Business growth and ROI visualization" width="800" height="600" className="w-full rounded-2xl object-cover shadow-xl" loading="lazy" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ready to Transform Your Business Section */}
                <section className="bg-gradient-to-br from-blue-50 to-white py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="grid lg:grid-cols-2 gap-0">
                                <div className="p-12 lg:p-16 flex flex-col justify-center">
                                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Ready to Transform Your Business?</h2>
                                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">Join hundreds of companies that trust Echoes Software Technologies to deliver innovative solutions. Schedule a consultation today and discover how we can accelerate your digital transformation.</p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <a href="https://forms.gle/K3LySpfU6YYvQKGj9" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#1864ff] hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center">Schedule Consultation</a>
                                        <a href="https://forms.gle/JNS54uLpgQXWP8NZ9" target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-[#1864ff] text-[#1864ff] hover:bg-[#1864ff] hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-center">Request Demo</a>
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

                {/* Mobile App Section */}
                <section style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', padding: '3rem 0' }}>
                    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
                        <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <svg style={{ width: '3rem', height: '3rem', margin: '0 auto', color: '#1864ff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', letterSpacing: '-0.025em' }}>Mobile App Available</h2>
                                <p style={{ fontSize: '1rem', color: '#4b5563', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.6 }}>Access our powerful software solutions anytime, anywhere with our feature-rich mobile application.</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 1 }}>
                                <div style={{ width: '100%' }}>
                                    <div style={{ background: 'linear-gradient(135deg, #1864ff 0%, #2563eb 100%)', borderRadius: '1.25rem', padding: '1.5rem', color: 'white', boxShadow: '0 10px 15px -3px rgba(24, 100, 255, 0.3)', position: 'relative', overflow: 'hidden' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}>
                                            <div style={{ width: '2.75rem', height: '2.75rem', background: 'white', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem', boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)', flexShrink: 0 }}>
                                                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#1864ff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.125rem' }}>Echoes Mobile</h3>
                                                <p style={{ opacity: 0.9, fontSize: '0.875rem' }}>Android Application</p>
                                            </div>
                                        </div>
                                        <p style={{ marginBottom: '1.5rem', opacity: 0.95, lineHeight: 1.6, fontSize: '0.95rem' }}>Experience our enterprise software solutions on the go. Manage your business operations, access real-time analytics, and stay connected with our platform from anywhere.</p>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                            {['Fast Performance', 'Secure Access', 'Real-time Data', 'Offline Sync'].map((feature, idx) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.15)', padding: '0.625rem', borderRadius: '0.625rem' }}>
                                                    <svg style={{ width: '1.125rem', height: '1.125rem', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                                    </svg>
                                                    <span style={{ fontSize: '0.875rem' }}>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <a href="./Echoes Software Technologies.apk" download style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', color: '#1864ff', fontWeight: 700, padding: '0.875rem', borderRadius: '9999px', textDecoration: 'none', width: '100%', transition: 'all 0.3s ease', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', position: 'relative', overflow: 'hidden' }}>
                                            <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.625rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                            </svg>
                                            Download APK File
                                        </a>
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
                                <img src="assets/3.png" alt="Echoes Software Technologies" className="h-10" />
                            </div>
                            <p className="text-blue-100 mb-4 max-w-md">Delivering premium enterprise software solutions that transform businesses through technology and innovation.</p>
                            <div className="flex space-x-4">
                                <a href="https://www.linkedin.com/company/echoes-software-solutions/posts/?feedView=all" className="text-blue-100 hover:text-white transition-colors"><i data-lucide="linkedin" className="w-5 h-5"></i></a>
                                <a href="https://wa.me/+918148549511" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors"><i data-lucide="message-circle" className="w-5 h-5"></i></a>
                                <a href="https://www.instagram.com/echoes_software_technologies/" className="text-blue-100 hover:text-white transition-colors"><i data-lucide="instagram" className="w-5 h-5"></i></a>
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

            {/* Contact Modal */}
            {
                isContactModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
                            <div className="bg-brand-blue p-6 text-white">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">Contact Us</h3>
                                    <button onClick={closeContactModal} className="text-white hover:text-gray-200">
                                        <i data-lucide="x" className="w-6 h-6"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                            <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" required />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" required />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                            <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" placeholder="Tell us about your project..." required></textarea>
                                        </div>
                                        <div>
                                            <button type="submit" className="w-full bg-brand-blue text-white py-3 px-4 rounded-full font-semibold hover:bg-blue-700 transition-colors">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Home;
