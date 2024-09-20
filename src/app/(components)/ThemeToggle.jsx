"use client";

import React from 'react';
import { useTheme } from 'next-themes';
import Button from '@/app/ui/Button'; // ここは実際のパスに合わせて修正してください
import { useState } from 'react';
const ThemeToggle = () => {
    const [theme , setThemeVar ]  = useState('light');
    const { setTheme } = useTheme();

    const toggleTheme = () => {
        setThemeVar(theme === 'dark' ? 'light' : 'dark')
        setTheme(theme);
    };

    return (
        <Button onClick={toggleTheme} className="bg-gray-200 text-gray-800">
            {theme === 'dark' ? 'ライトモード' : 'ダークモード'}
        </Button>
    );
};

export default ThemeToggle;
