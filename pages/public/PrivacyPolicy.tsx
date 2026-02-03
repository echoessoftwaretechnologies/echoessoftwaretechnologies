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
        <div className="bg-white text-navy-900 min-h-screen" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {/* Premium Header */}
            <header className="fixed top-0 w-full z-[100] transition-all duration-500 bg-white/80 backdrop-blur-2xl border-b border-navy-100/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
                                <img src="/assets/2.png" alt="Echoes Software Technologies" width="160" height="45" />
                            </Link>
                        </div>
                        <nav className="hidden md:flex items-center gap-12">
                            {['Home', 'Solutions', 'Services', 'About', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className="text-sm font-black uppercase tracking-[0.2em] transition-all relative group nav-blip text-navy-900 hover:text-brand-blue-600"
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
                            <button className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-navy-50 text-navy-900 active:scale-90 transition-transform" onClick={toggleMobileMenu}>
                                <i data-lucide="menu" className="w-7 h-7"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Premium Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[200] md:hidden">
                    <div className="absolute inset-0 bg-navy-950/40 dark:bg-navy-950/80 backdrop-blur-sm animate-fade-in" onClick={toggleMobileMenu} />
                    <div className="absolute top-0 right-0 w-3/4 h-full bg-white dark:bg-navy-900 shadow-2xl animate-slide-in-right flex flex-col">
                        <div className="p-8 flex justify-between items-center border-b border-navy-50 dark:border-white/5">
                            <img src="/assets/2.png" alt="Echoes Logo" className="h-8 w-auto" />
                            <button onClick={toggleMobileMenu} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-navy-50 dark:bg-navy-900 text-navy-900 dark:text-white active:rotate-90 transition-transform duration-300">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                        <nav className="flex-1 px-8 py-12 flex flex-col gap-10">
                            {['Home', 'Solutions', 'Services', 'About', 'Contact'].map((item, i) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    onClick={toggleMobileMenu}
                                    className="text-3xl font-black uppercase tracking-tighter transition-all text-navy-950 dark:text-white hover:text-brand-blue-600 dark:hover:text-brand-blue-400"
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                        <div className="p-8 border-t border-navy-50 dark:border-white/5">
                            <button onClick={handleGetStarted} className="w-full premium-gradient text-white py-5 rounded-full font-black uppercase tracking-widest shadow-xl">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <main className="pt-20">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-brand-blue-600 to-indigo-700 dark:from-brand-blue-800 dark:to-indigo-900 py-20 lg:py-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center">
                            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">Privacy Policy</h1>
                            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-light">Learn how we collect, use, and protect your personal information when you use our services.</p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 bg-white dark:bg-navy-950 transition-colors duration-500">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-navy-950 dark:text-white mb-6">Last Updated: December 28, 2025</h2>

                            <p className="text-navy-600 dark:text-navy-300 mb-6 leading-relaxed">Echoes Software Technologies ("we", "our", "us") respects your privacy and is committed to protecting the personal information of our users, clients, and visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our websites, applications, products, and services (collectively, the "Services").</p>

                            <p className="text-navy-600 dark:text-navy-300 mb-6 leading-relaxed">By using our Services, you agree to the practices described in this Privacy Policy.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">1. Information We Collect</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">We may collect the following types of information:</p>

                            <h4 className="text-xl font-semibold text-navy-950 dark:text-white mt-6 mb-3">1.1 Personal Information</h4>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">Information that can identify you, such as:</p>
                            <ul className="list-disc list-inside text-navy-600 dark:text-navy-300 mb-6 space-y-2 ml-4">
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Company or organization name</li>
                                <li>Account login credentials (if applicable)</li>
                            </ul>

                            <h4 className="text-xl font-semibold text-navy-950 dark:text-white mt-6 mb-3">1.2 Technical and Usage Information</h4>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">Automatically collected information, including:</p>
                            <ul className="list-disc list-inside text-navy-600 dark:text-navy-300 mb-6 space-y-2 ml-4">
                                <li>IP address</li>
                                <li>Browser type and version</li>
                                <li>Device information</li>
                                <li>Operating system</li>
                                <li>Pages visited, time spent, and interaction data</li>
                            </ul>

                            <h4 className="text-xl font-semibold text-navy-950 dark:text-white mt-6 mb-3">1.3 Cookies and Similar Technologies</h4>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">We may use cookies and similar tracking technologies to improve functionality, analyze usage, and enhance user experience. You can control cookies through your browser settings.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">2. How We Use Your Information</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">We use the collected information to:</p>
                            <ul className="list-disc list-inside text-navy-600 dark:text-navy-300 mb-6 space-y-2 ml-4">
                                <li>Provide, operate, and maintain our Services</li>
                                <li>Improve and personalize user experience</li>
                                <li>Communicate with you, including support and service-related messages</li>
                                <li>Process transactions and manage accounts</li>
                                <li>Ensure security and prevent fraud</li>
                                <li>Comply with legal and regulatory obligations</li>
                            </ul>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">3. Sharing and Disclosure of Information</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">We do not sell or rent your personal information. We may share information only in the following circumstances:</p>

                            <ul className="list-disc list-inside text-navy-600 dark:text-navy-300 mb-6 space-y-2 ml-4">
                                <li><strong className="text-navy-950 dark:text-white">Service Providers:</strong> With trusted third-party vendors who perform services on our behalf (e.g., hosting, analytics, customer support)</li>
                                <li><strong className="text-navy-950 dark:text-white">Legal Requirements:</strong> When required by law, regulation, or legal process</li>
                                <li><strong className="text-navy-950 dark:text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                                <li><strong className="text-navy-950 dark:text-white">With Consent:</strong> When you explicitly consent to sharing</li>
                            </ul>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">4. Data Security</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">We implement reasonable administrative, technical, and organizational measures to protect your information from unauthorized access, loss, misuse, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">5. Data Retention</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">We retain personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">6. Your Rights and Choices</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">Depending on applicable laws, you may have the right to:</p>
                            <ul className="list-disc list-inside text-navy-600 dark:text-navy-300 mb-6 space-y-2 ml-4">
                                <li>Access the personal information we hold about you</li>
                                <li>Request correction or deletion of your information</li>
                                <li>Withdraw consent where processing is based on consent</li>
                                <li>Object to or restrict certain processing activities</li>
                            </ul>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">To exercise these rights, please contact us using the details below.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">7. Third-Party Links</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">Our Services may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those third parties.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">8. Children's Privacy</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">Our Services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If we become aware that such information has been collected, we will take appropriate steps to delete it.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">9. Changes to This Privacy Policy</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Continued use of the Services after changes indicates acceptance of the revised policy.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">10. Contact Us</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
                            <div className="bg-navy-50 dark:bg-navy-900/50 border border-navy-100 dark:border-white/5 p-8 rounded-2xl mb-8">
                                <p className="text-navy-900 dark:text-white font-bold mb-2">Echoes Software Technologies</p>
                                <p className="text-navy-700 dark:text-navy-300"><strong className="text-navy-900 dark:text-white">Email:</strong> echoessoftwaretech@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Premium Footer */}
            <footer className="bg-navy-950 dark:bg-navy-950 text-white relative overflow-hidden py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-6">
                            <img src="/assets/3.png" alt="Echoes Software Technologies" className="h-10" />
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

                        <div>
                            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Services</h4>
                            <ul className="space-y-3">
                                <li><span className="text-navy-300 text-sm">Custom Development</span></li>
                                <li><span className="text-navy-300 text-sm">Cloud Solutions</span></li>
                                <li><span className="text-navy-300 text-sm">AI Integration</span></li>
                                <li><span className="text-navy-300 text-sm">Enterprise Support</span></li>
                            </ul>
                        </div>

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
                                    <span>Global Headquarters<br />San Francisco, CA</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-navy-400 text-sm">
                            © 2026 Echoes Software Technologies. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <span className="text-navy-400 cursor-default">Privacy Policy</span>
                            <Link to="/terms-of-service" className="text-navy-400 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PrivacyPolicy;
