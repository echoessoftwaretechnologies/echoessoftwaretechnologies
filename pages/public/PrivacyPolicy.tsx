import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

declare global {
    interface Window {
        lucide: any;
    }
}

const PrivacyPolicy: React.FC = () => {
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
                                <img src="/assets/2.png" alt="Echoes Software Technologies" className="h-10 w-[150px] object-contain" />
                            </div>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">Home</Link>
                            <Link to="/solutions" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">Solutions</Link>
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
                            <Link to="/solutions" className="text-gray-600 hover:text-brand-blue transition-colors font-medium py-2">Solutions</Link>
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
                            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">Privacy Policy</h1>
                            <p className="text-xl text-white max-w-3xl mx-auto">Learn how we collect, use, and protect your personal information when you use our services.</p>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Last Updated: December 28, 2025</h2>

                            <p className="text-gray-600 mb-6">Echoes Software Technologies ("we", "our", "us") respects your privacy and is committed to protecting the personal information of our users, clients, and visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our websites, applications, products, and services (collectively, the "Services").</p>

                            <p className="text-gray-600 mb-6">By using our Services, you agree to the practices described in this Privacy Policy.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h3>
                            <p className="text-gray-600 mb-4">We may collect the following types of information:</p>

                            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1.1 Personal Information</h4>
                            <p className="text-gray-600 mb-4">Information that can identify you, such as:</p>
                            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Company or organization name</li>
                                <li>Account login credentials (if applicable)</li>
                            </ul>

                            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1.2 Technical and Usage Information</h4>
                            <p className="text-gray-600 mb-4">Automatically collected information, including:</p>
                            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                                <li>IP address</li>
                                <li>Browser type and version</li>
                                <li>Device information</li>
                                <li>Operating system</li>
                                <li>Pages visited, time spent, and interaction data</li>
                            </ul>

                            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1.3 Cookies and Similar Technologies</h4>
                            <p className="text-gray-600 mb-4">We may use cookies and similar tracking technologies to improve functionality, analyze usage, and enhance user experience. You can control cookies through your browser settings.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h3>
                            <p className="text-gray-600 mb-4">We use the collected information to:</p>
                            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                                <li>Provide, operate, and maintain our Services</li>
                                <li>Improve and personalize user experience</li>
                                <li>Communicate with you, including support and service-related messages</li>
                                <li>Process transactions and manage accounts</li>
                                <li>Ensure security and prevent fraud</li>
                                <li>Comply with legal and regulatory obligations</li>
                            </ul>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Sharing and Disclosure of Information</h3>
                            <p className="text-gray-600 mb-4">We do not sell or rent your personal information. We may share information only in the following circumstances:</p>

                            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                                <li><strong>Service Providers:</strong> With trusted third-party vendors who perform services on our behalf (e.g., hosting, analytics, customer support)</li>
                                <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process</li>
                                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                                <li><strong>With Consent:</strong> When you explicitly consent to sharing</li>
                            </ul>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h3>
                            <p className="text-gray-600 mb-4">We implement reasonable administrative, technical, and organizational measures to protect your information from unauthorized access, loss, misuse, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Data Retention</h3>
                            <p className="text-gray-600 mb-4">We retain personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Your Rights and Choices</h3>
                            <p className="text-gray-600 mb-4">Depending on applicable laws, you may have the right to:</p>
                            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                                <li>Access the personal information we hold about you</li>
                                <li>Request correction or deletion of your information</li>
                                <li>Withdraw consent where processing is based on consent</li>
                                <li>Object to or restrict certain processing activities</li>
                            </ul>
                            <p className="text-gray-600 mb-4">To exercise these rights, please contact us using the details below.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Third-Party Links</h3>
                            <p className="text-gray-600 mb-4">Our Services may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those third parties.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Children’s Privacy</h3>
                            <p className="text-gray-600 mb-4">Our Services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If we become aware that such information has been collected, we will take appropriate steps to delete it.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Changes to This Privacy Policy</h3>
                            <p className="text-gray-600 mb-4">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Continued use of the Services after changes indicates acceptance of the revised policy.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Contact Us</h3>
                            <p className="text-gray-600 mb-4">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
                            <div className="bg-gray-50 p-6 rounded-lg mb-8">
                                <p className="text-gray-700"><strong>Echoes Software Technologies</strong></p>
                                <p className="text-gray-700"><strong>Email:</strong> echoessoftwaretech@gmail.com</p>
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
                                <a href="https://wa.me/+918148549511" className="text-blue-100 hover:text-white transition-colors" target="_blank">
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
                            <span className="text-blue-100 cursor-default text-sm">Privacy Policy</span>
                            <Link to="/terms-of-service" className="text-blue-100 hover:text-white transition-colors text-sm">Terms of Service</Link>
                            <a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Security</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PrivacyPolicy;
