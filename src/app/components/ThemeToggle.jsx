'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes'; // next-themes for theme switching
import { FaSun, FaMoon } from 'react-icons/fa'; // Icons for light/dark mode

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme(); // Access the current theme and setTheme function
    const [mounted, setMounted] = useState(false);

    // Ensure the theme is set properly after mount
    useEffect(() => setMounted(true), []);

    if (!mounted) return null; // Avoid server-side mismatch

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light'); // Switch between light and dark themes
    };

    return (
        <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
        >
            {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
        </button>
    );
};

export default ThemeToggle;
