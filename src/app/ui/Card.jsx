import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, content, footer }) => {
    return (
        <motion.div
            className="bg-white rounded-lg shadow-md p-6 mb-4 transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
        >
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-700 mb-4">{content}</p>
            {footer && <div className="border-t pt-4">{footer}</div>}
        </motion.div>
    );
};

export default Card;
