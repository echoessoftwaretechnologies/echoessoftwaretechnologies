import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

declare global {
    interface Window {
        lucide: any;
    }
}

const TermsOfService: React.FC = () => {
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
                            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">Terms of Service</h1>
                            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-light">Please read these terms and conditions carefully before using our services and website.</p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 bg-white dark:bg-navy-950 transition-colors duration-500">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-navy-950 dark:text-white mb-6">Last Updated: December 28, 2025</h2>

                            <p className="text-navy-600 dark:text-navy-300 mb-6 leading-relaxed">Welcome to Echoes Software Technologies ("Company", "we", "our", "us"). These Terms & Conditions ("Terms") govern your access to and use of our websites, applications, software, products, and services (collectively, the "Services").</p>

                            <p className="text-navy-600 dark:text-navy-300 mb-6 leading-relaxed">By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, please do not use our Services.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">1. Eligibility</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">By using our Services, you represent that you have the legal capacity to enter into a binding agreement under applicable laws. If you are using the Services on behalf of an organization, you represent that you are authorized to bind that organization to these Terms.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">2. Use of Services</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">You agree to use the Services only for lawful purposes and in accordance with these Terms. You must not:</p>
                            <ul className="list-disc list-inside text-navy-600 dark:text-navy-300 mb-6 space-y-2 ml-4">
                                <li>Violate any applicable laws or regulations</li>
                                <li>Infringe upon intellectual property or proprietary rights</li>
                                <li>Attempt to gain unauthorized access to systems or data</li>
                                <li>Interfere with or disrupt the operation or security of the Services</li>
                                <li>Use the Services to transmit malicious code, spam, or harmful content</li>
                            </ul>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">3. Accounts and Responsibilities</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">If any part of the Services requires account creation:</p>
                            <ul className="list-disc list-inside text-navy-600 dark:text-navy-300 mb-6 space-y-2 ml-4">
                                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                                <li>You agree to provide accurate and complete information</li>
                                <li>You are responsible for all activities that occur under your account</li>
                                <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
                            </ul>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">4. Intellectual Property Rights</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">All content, software, designs, logos, trademarks, and materials provided through the Services are owned by or licensed to Echoes Software Technologies and are protected by intellectual property laws.</p>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">You may not copy, modify, distribute, sell, or create derivative works from any part of the Services without our prior written consent.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">5. Payments and Fees (If Applicable)</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">Certain Services may be subject to fees or charges. Where applicable:</p>
                            <ul className="list-disc list-inside text-navy-600 dark:text-navy-300 mb-6 space-y-2 ml-4">
                                <li>Prices, payment terms, and billing cycles will be disclosed before purchase</li>
                                <li>Payments are non-refundable unless otherwise stated in writing</li>
                                <li>We reserve the right to change pricing with reasonable notice</li>
                            </ul>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">6. Third-Party Services and Links</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">Our Services may integrate with or link to third-party websites or services. We do not control and are not responsible for third-party content, policies, or practices. Your use of third-party services is at your own risk.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">7. Disclaimer of Warranties</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">The Services are provided on an "as is" and "as available" basis. To the maximum extent permitted by law, we disclaim all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">We do not guarantee that the Services will be uninterrupted, error-free, or secure.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">8. Limitation of Liability</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">To the fullest extent permitted by law, Echoes Software Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising out of or related to your use of the Services.</p>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">Our total liability for any claim shall not exceed the amount paid by you (if any) for the Services giving rise to the claim.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">9. Indemnification</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">You agree to indemnify and hold harmless Echoes Software Technologies, its directors, employees, and partners from any claims, damages, losses, liabilities, and expenses arising from:</p>
                            <ul className="list-disc list-inside text-navy-600 dark:text-navy-300 mb-6 space-y-2 ml-4">
                                <li>Your use of the Services</li>
                                <li>Your violation of these Terms</li>
                                <li>Your infringement of any third-party rights</li>
                            </ul>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">10. Termination</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">We reserve the right to suspend or terminate your access to the Services at any time, with or without notice, if you violate these Terms or engage in conduct that we consider harmful to our interests or users.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">11. Governing Law and Jurisdiction</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">These Terms shall be governed by and construed in accordance with the laws of India. The courts located in India shall have exclusive jurisdiction over any disputes arising under these Terms.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">12. Changes to These Terms</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-6">We may update these Terms from time to time. Any changes will be effective upon posting with an updated "Last Updated" date. Continued use of the Services after changes constitutes acceptance of the revised Terms.</p>

                            <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-12 mb-4">13. Contact Information</h3>
                            <p className="text-navy-600 dark:text-navy-300 mb-4">If you have any questions about these Terms & Conditions, please contact us:</p>
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
                            <Link to="/privacy-policy" className="text-navy-400 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <span className="text-navy-400 cursor-default">Terms of Service</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TermsOfService;
