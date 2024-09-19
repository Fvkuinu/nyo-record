import React, { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import 'hover.css/css/hover.css'; // Hover.cssのインポート

interface ButtonProps {
    children: ReactNode; // ボタンのラベルやアイコンなど
    onClick: () => void; // ボタンがクリックされたときのハンドラ
    disabled?: boolean; // ボタンの無効化
    variant?: 'primary' | 'secondary' | 'danger'; // ボタンのスタイルバリエーション
}

const Button: FC<ButtonProps> = ({ children, onClick, disabled = false, variant = 'primary' }) => {
    const buttonStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    const buttonVariants = {
        tap: { scale: 0.95 },  // クリック時に縮小
    };

    return (
        <motion.button
            className={`hvr-grow ${buttonStyles[variant]} py-2 px-4 rounded font-bold ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            disabled={disabled}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
        >
            {children}
        </motion.button>
    );
};

export default Button;
