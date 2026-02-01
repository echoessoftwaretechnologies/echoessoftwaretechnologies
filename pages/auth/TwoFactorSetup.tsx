import React, { useState, useEffect } from 'react';

declare global {
    interface Window {
        lucide: any;
        QRCode: any;
    }
}

const TwoFactorSetup: React.FC = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);
    const [secret, setSecret] = useState('');
    const [username, setUsername] = useState('admin');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const un = urlParams.get('username') || 'admin';
        const rem = urlParams.get('remember') === 'true';
        setUsername(un);

        const newSecret = generateSecret();
        setSecret(newSecret);

        // Store temporary data
        localStorage.setItem('tempSecret', newSecret);
        localStorage.setItem('tempUsername', un);
        localStorage.setItem('rememberChoice', rem.toString());

        if (window.lucide) {
            window.lucide.createIcons();
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev <= 1 ? 30 : prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (secret && window.QRCode) {
            const issuer = 'Echoes Software Technologies';
            const account = `${issuer}:${username}`;
            const encodedSecret = encodeURIComponent(secret);
            const issuerParam = encodeURIComponent(issuer);
            const totpUrl = `otpauth://totp/${account}?secret=${encodedSecret}&issuer=${issuerParam}`;

            const qrContainer = document.getElementById('qrCode');
            if (qrContainer) {
                qrContainer.innerHTML = '';
                new window.QRCode(qrContainer, {
                    text: totpUrl,
                    width: 200,
                    height: 200,
                    colorDark: "#1864ff",
                    colorLight: "#ffffff",
                    correctLevel: window.QRCode.CorrectLevel.H
                });
            }
        }
    }, [secret, username]);

    const generateSecret = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        let s = '';
        for (let i = 0; i < 16; i++) {
            s += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return s;
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (verificationCode.length === 6 && /^\d{6}$/.test(verificationCode)) {
            // Store login state
            const un = localStorage.getItem('tempUsername');
            const rem = localStorage.getItem('rememberChoice') === 'true';

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', un || 'admin');

            if (rem) {
                localStorage.setItem('rememberedUser', un || 'admin');
            } else {
                localStorage.removeItem('rememberedUser');
            }

            // Clean up temporary data
            localStorage.removeItem('tempSecret');
            localStorage.removeItem('tempUsername');
            localStorage.removeItem('rememberChoice');

            // Redirect to admin dashboard
            window.location.href = '../admin/admin-dashboard.html';
        } else {
            alert('Invalid verification code. Please enter a valid 6-digit code from your Google Authenticator app.');
            setVerificationCode('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f0f4ff] to-[#e6f0ff]" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="flex justify-center mb-6">
                        <img src="../../assets/2.png" alt="Echoes Software Technologies Logo" className="w-[150px] h-[40px] object-contain" />
                    </div>
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Two-Factor Authentication</h1>
                        <p className="text-gray-600 mt-2">Scan the QR code with Google Authenticator</p>
                    </div>

                    <div className="text-center mb-6">
                        <div id="qrContainer" className="flex justify-center mb-4">
                            <div id="qrCode" className="bg-gray-100 p-4 flex items-center justify-center" style={{ width: '200px', height: '200px' }}>
                                <p className="text-gray-500 text-sm">QR Code will appear here</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">Or enter this code manually:</p>
                        <div className="bg-gray-50 p-3 rounded-full mb-4">
                            <code id="secretCode" className="text-brand-blue font-mono text-sm">{secret}</code>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">Open Google Authenticator and scan the QR code above or enter the code manually.</p>
                        <div className="flex items-center justify-center mt-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span id="timeRemaining" className="text-sm text-gray-600">Code refreshes in <span id="countdown">{timeLeft}</span>s</span>
                        </div>
                    </div>

                    <form id="verificationForm" className="space-y-6" onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">Enter 6-digit code</label>
                            <input
                                type="text"
                                id="verificationCode"
                                name="verificationCode"
                                required
                                maxLength={6}
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors text-center text-2xl tracking-widest"
                                placeholder="000000"
                            />
                        </div>

                        <button type="submit" className="w-full bg-brand-blue hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 shadow-md">
                            Verify Code
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Having trouble? <a href="/pages/auth/login.html" className="text-brand-blue hover:text-blue-700 font-medium">Go back to login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwoFactorSetup;
