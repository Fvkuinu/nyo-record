import React from 'react';
import { motion } from 'framer-motion';

const InputField = ({ label, type = 'text', value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            {/* motion.divを使用してinputをラップ */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={type}
                    value={value}
                    onChange={onChange}
                />
            </motion.div>
        </div>
    );
};

export default InputField;
