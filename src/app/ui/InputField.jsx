import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes'; // ダークモード用テーマフック

const InputField = ({ label, type = 'text', value, onChange, name }) => {
    const { theme } = useTheme(); // 現在のテーマを取得

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
                {label}
            </label>
            {/* motion.divを使用してinputをラップ */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                        theme === 'dark'
                            ? 'bg-gray-800 text-gray-300 border-gray-600 focus:bg-gray-700'
                            : 'bg-white text-gray-700 border-gray-300 focus:bg-gray-100'
                    }`}
                    type={type}
                    value={value}
                    onChange={onChange}
                    name={name} // これを追加
                />
            </motion.div>
        </div>
    );
};

export default InputField;
