import React from 'react';
import { motion } from 'framer-motion';

const Dropdown = ({ options, selected, onChange }) => {
    return (
        <div className="relative">
            <motion.select
                value={selected}
                onChange={(e) => onChange(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                initial={{ scale: 1 }}
                animate={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                whileTap={{ scale: 0.95 }} // クリック時に縮小
            >
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </motion.select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M5.23 7.21a.996.996 0 001.41 0L10 10.67l3.36-3.46a.996.996 0 111.41 1.41l-4.24 4.25a.996.996 0 01-1.41 0l-4.24-4.25a.996.996 0 000-1.41z" />
                </svg>
            </div>
        </div>
    );
};

export default Dropdown;
