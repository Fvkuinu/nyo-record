import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes'; // ダークモード用フック

const Dropdown = ({ options, selected, onChange, label, placeholder }) => {
    const { theme } = useTheme(); // 現在のテーマを取得

    return (
        <div className="relative">
            {label && (
                <label
                    className={`block text-sm font-medium mb-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                >
                    {label}
                </label>
            )}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
            <motion.select
                value={selected}
                onChange={(e) => onChange(e.target.value)}
                className={`block appearance-none w-full border py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-1 ${
                    theme === 'dark'
                        ? 'bg-gray-800 border-gray-600 text-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        : 'bg-white border-gray-300 text-gray-700 focus:border-blue-500 focus:ring-blue-500'
                }`}
                initial={{ scale: 1 }} // 初期状態のみ
                transition={{ duration: 0.2 }} // アニメーションの設定
            >
                {/* Placeholder option */}
                {placeholder && <option value="">{placeholder}</option>}

                {/* Options map */}
                {options.map((option) => (
                    <option key={option.value || option} value={option.value || option}>
                        {option.label || option}
                    </option>
                ))}
            </motion.select>
            
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M5.23 7.21a.996.996 0 001.41 0L10 10.67l3.36-3.46a.996.996 0 111.41 1.41l-4.24 4.25a.996.996 0 01-1.41 0l-4.24-4.25a.996.996 0 000-1.41z" />
                </svg>
            </div>
            </motion.div>
        </div>
    );
};

export default Dropdown;
