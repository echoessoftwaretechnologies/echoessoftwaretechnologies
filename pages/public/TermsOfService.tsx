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
                            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">Terms of Service</h1>
                            <p className="text-xl text-white max-w-3xl mx-auto">Please read these terms and conditions carefully before using our services and website.</p>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Last Updated: December 28, 2025</h2>

                            <p className="text-gray-600 mb-6">Welcome to Echoes Software Technologies ("Company", "we", "our", "us"). These Terms & Conditions ("Terms") govern your access to and use of our websites, applications, software, products, and services (collectively, the "Services").</p>

                            <p className="text-gray-600 mb-6">By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, please do not use our Services.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Eligibility</h3>
                            <p className="text-gray-600 mb-4">By using our Services, you represent that you have the legal capacity to enter into a binding agreement under applicable laws. If you are using the Services on behalf of an organization, you represent that you are authorized to bind that organization to these Terms.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Use of Services</h3>
                            <p className="text-gray-600 mb-4">You agree to use the Services only for lawful purposes and in accordance with these Terms. You must not:</p>
                            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                                <li>Violate any applicable laws or regulations</li>
                                <li>Infringe upon intellectual property or proprietary rights</li>
                                <li>Attempt to gain unauthorized access to systems or data</li>
                                <li>Interfere with or disrupt the operation or security of the Services</li>
                                <li>Use the Services to transmit malicious code, spam, or harmful content</li>
                            </ul>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Accounts and Responsibilities</h3>
                            <p className="text-gray-600 mb-4">If any part of the Services requires account creation:</p>
                            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                                <li>You agree to provide accurate and complete information</li>
                                <li>You are responsible for all activities that occur under your account</li>
                                <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
                            </ul>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Intellectual Property Rights</h3>
                            <p className="text-gray-600 mb-4">All content, software, designs, logos, trademarks, and materials provided through the Services are owned by or licensed to Echoes Software Technologies and are protected by intellectual property laws.</p>
                            <p className="text-gray-600 mb-4">You may not copy, modify, distribute, sell, or create derivative works from any part of the Services without our prior written consent.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Payments and Fees (If Applicable)</h3>
                            <p className="text-gray-600 mb-4">Certain Services may be subject to fees or charges. Where applicable:</p>
                            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                                <li>Prices, payment terms, and billing cycles will be disclosed before purchase</li>
                                <li>Payments are non-refundable unless otherwise stated in writing</li>
                                <li>We reserve the right to change pricing with reasonable notice</li>
                            </ul>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Third-Party Services and Links</h3>
                            <p className="text-gray-600 mb-4">Our Services may integrate with or link to third-party websites or services. We do not control and are not responsible for third-party content, policies, or practices. Your use of third-party services is at your own risk.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Disclaimer of Warranties</h3>
                            <p className="text-gray-600 mb-4">The Services are provided on an "as is" and "as available" basis. To the maximum extent permitted by law, we disclaim all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
                            <p className="text-gray-600 mb-4">We do not guarantee that the Services will be uninterrupted, error-free, or secure.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Limitation of Liability</h3>
                            <p className="text-gray-600 mb-4">To the fullest extent permitted by law, Echoes Software Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising out of or related to your use of the Services.</p>
                            <p className="text-gray-600 mb-4">Our total liability for any claim shall not exceed the amount paid by you (if any) for the Services giving rise to the claim.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Indemnification</h3>
                            <p className="text-gray-600 mb-4">You agree to indemnify and hold harmless Echoes Software Technologies, its directors, employees, and partners from any claims, damages, losses, liabilities, and expenses arising from:</p>
                            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                                <li>Your use of the Services</li>
                                <li>Your violation of these Terms</li>
                                <li>Your infringement of any third-party rights</li>
                            </ul>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Termination</h3>
                            <p className="text-gray-600 mb-4">We reserve the right to suspend or terminate your access to the Services at any time, with or without notice, if you violate these Terms or engage in conduct that we consider harmful to our interests or users.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Governing Law and Jurisdiction</h3>
                            <p className="text-gray-600 mb-4">These Terms shall be governed by and construed in accordance with the laws of India. The courts located in India shall have exclusive jurisdiction over any disputes arising under these Terms.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Changes to These Terms</h3>
                            <p className="text-gray-600 mb-4">We may update these Terms from time to time. Any changes will be effective upon posting with an updated "Last Updated" date. Continued use of the Services after changes constitutes acceptance of the revised Terms.</p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Contact Information</h3>
                            <p className="text-gray-600 mb-4">If you have any questions about these Terms & Conditions, please contact us:</p>
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
                                <a href="https://www.instagram.com/echoes_software.tech/" className="text-blue-100 hover:text-white transition-colors">
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
                            <span className="text-blue-100 cursor-default text-sm">Terms of Service</span>
                            <a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Security</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TermsOfService;
