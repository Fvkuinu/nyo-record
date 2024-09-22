// src/components/ui/Button.jsx
import React from 'react';
import { motion } from 'framer-motion'; // Framer Motionのインポート
import { useTheme } from 'next-themes'; // ダークモード用のテーマフック

const Button = ({ children, onClick, disabled = false, variant = 'primary' }) => {
    const { theme } = useTheme(); // 現在のテーマを取得

    const buttonStyles = {
        primary: theme === 'dark' 
            ? 'bg-blue-700 text-white hover:bg-blue-800'
            : 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: theme === 'dark' 
            ? 'bg-gray-700 text-white hover:bg-gray-800'
            : 'bg-gray-500 text-white hover:bg-gray-600',
        danger: theme === 'dark' 
            ? 'bg-red-700 text-white hover:bg-red-800'
            : 'bg-red-500 text-white hover:bg-red-600',
    };

    const buttonVariants = {
        tap: { scale: 0.95 },  // クリック時に縮小
    };

    return (
        <motion.button
            className={`${buttonStyles[variant]} py-2 px-4 rounded font-bold ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transition-transform duration-150'}`}
            onClick={onClick}
            disabled={disabled}
            whileTap="tap"
            variants={buttonVariants}
        >
            {children}
        </motion.button>
    );
};

export default Button;
