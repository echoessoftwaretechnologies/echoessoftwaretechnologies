import React, { useState, useEffect } from 'react';

declare global {
    interface Window {
        lucide: any;
    }
}

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, []);

    const authenticateUser = (un: string, pw: string) => {
        const validCredentials = [
            { username: 'admin@echoess.in', password: 'Echoes!Tech$Secure^Cloud_91' },
            { username: 'user@echoess.in', password: 'Echoes!Tech$Secure^Cloud_91' }
        ];

        return validCredentials.some(cred =>
            cred.username === un && cred.password === pw
        );
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (authenticateUser(username, password)) {
            // Redirect to 2FA verification page
            window.location.href = `/pages/auth/two-factor-setup.html?username=${encodeURIComponent(username)}&remember=${remember}`;
        } else {
            alert('Invalid credentials. Please try again.');
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
                        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                        <p className="text-gray-600 mt-2">Please enter your credentials to access the admin console</p>
                    </div>

                    <form id="loginForm" className="space-y-6" onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="h-4 w-4 text-brand-blue border-gray-300 rounded focus:ring-brand-blue"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-brand-blue hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 shadow-md"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 flex justify-between items-center">
                        <a href="#" className="text-sm text-brand-blue hover:text-blue-700 font-medium">Forgot your password?</a>
                        <a href="/index.html"
                            className="inline-block bg-brand-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition-colors duration-200">
                            Website
                        </a>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Need help? Contact your system administrator
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
