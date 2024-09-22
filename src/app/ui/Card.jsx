// src/components/ui/Card.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const Card = ({ title, content, footer }) => {
    const { theme } = useTheme();

    return (
        <motion.div
            className={`${
                theme === 'dark'
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-700'
            } rounded-lg shadow-md p-4 mb-4 transition-transform transform hover:scale-105`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
        >
            {/* ヘッダー部分 */}
            <div className="flex justify-between items-center mb-0">
                <h3 className="text-xl font-bold">{title}</h3>
                {footer && <div>{footer}</div>}
            </div>
            {/* コンテンツ部分 */}
            <p>{content}</p>
        </motion.div>
    );
};

export default Card;
