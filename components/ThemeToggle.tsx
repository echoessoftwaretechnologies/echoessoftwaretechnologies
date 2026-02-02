import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative group p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-glass hover:bg-white/10 transition-all duration-500 active:scale-90 overflow-hidden"
            aria-label="Toggle Theme"
        >
            {/* Animated Background Glow */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'dark' ? 'bg-brand-blue-500/10 opacity-100' : 'bg-amber-400/10 opacity-0'}`}></div>

            {/* Icon Container with Transitions */}
            <div className="relative z-10 w-6 h-6 flex items-center justify-center">
                <div className={`absolute transition-all duration-700 transform ${theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}>
                    <Sun className="w-5 h-5 text-amber-500 fill-amber-500/20" />
                </div>
                <div className={`absolute transition-all duration-700 transform ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}>
                    <Moon className="w-5 h-5 text-brand-blue-400 fill-brand-blue-400/20" />
                </div>
            </div>

            {/* Stunning Hover Effects */}
            <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
    );
};

export default ThemeToggle;
