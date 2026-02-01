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
                            <Link to="/about" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">About</Link>
                            <span className="text-brand-blue font-medium">Contact</span>
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
                            <Link to="/about" className="text-gray-600 hover:text-brand-blue transition-colors font-medium py-2">About</Link>
                            <span className="text-brand-blue font-medium py-2">Contact</span>
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
                            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">Get in Touch</h1>
                            <p className="text-xl text-white max-w-3xl mx-auto">We're here to answer your questions and discuss how our solutions can transform your business. Reach out to us using any of the methods below.</p>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
                                <div className="space-y-8">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Headquarters</h3>
                                            <p className="text-gray-600">Covai Main Road<br />Karur<br />Tamil Nadu, India</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                                            <p className="text-gray-600">
                                                <a href="tel:+918148549511" className="hover:text-brand-blue transition-colors">+91 (814) 854-9511</a><br />
                                                <a href="tel:+916379644145" className="hover:text-brand-blue transition-colors">+91 (637) 964-4145</a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                                            <p className="text-gray-600">
                                                <a href="mailto:support@echoess.in" className="hover:text-brand-blue transition-colors">support@echoess.in</a><br />
                                                <a href="mailto:echoessoftwaretech@gmail.com" className="hover:text-brand-blue transition-colors">echoessoftwaretech@gmail.com</a><br />
                                                <a href="mailto:sales@echoess.in" className="hover:text-brand-blue transition-colors">sales@echoess.in</a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Business Hours</h3>
                                            <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM PST<br />Saturday - Sunday: Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                            <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                            <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <input type="email" id="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                        <input type="text" id="company" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                        <input type="text" id="subject" value={formData.subject} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                        <textarea id="message" value={formData.message} onChange={handleInputChange} required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"></textarea>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-full bg-brand-blue text-white px-6 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors"> Send Message </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Global Offices</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We serve clients worldwide from our strategically located offices across the globe.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-gray-50 rounded-2xl p-8 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">India</h3>
                                <p className="text-gray-600 mb-4">Covai Main Road<br />Karur<br />Tamil Nadu, India</p>
                                <p className="text-gray-600">+91 (814) 854-9511</p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-8 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Coimbatore</h3>
                                <p className="text-gray-600 mb-4">Thomas Street<br />Coimbatore, Tamil Nadu, India</p>
                                <p className="text-gray-600">+91 (637) 964-4145</p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-8 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Coimbatore</h3>
                                <p className="text-gray-600 mb-4">Anna Salai<br />Coimbatore, Tamil Nadu, India</p>
                                <p className="text-gray-600">+91 (637) 964-4145</p>
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
                                <a href="https://www.linkedin.com/company/echoes-software-solutions/posts/?feedView=all" className="text-blue-100 hover:text-white transition-colors" target="_blank">
                                    <i data-lucide="linkedin" className="w-5 h-5"></i>
                                </a>
                                <a href="https://wa.me/918148549511" className="text-blue-100 hover:text-white transition-colors" target="_blank">
                                    <i data-lucide="message-circle" className="w-5 h-5"></i>
                                </a>
                                <a href="https://www.instagram.com/echoes_software_technologies/" className="text-blue-100 hover:text-white transition-colors" target="_blank">
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
                                <li><span className="text-blue-100 cursor-default">Contact</span></li>
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

export default Contact;
