'use client';

import { useState } from 'react';
import { motion } from 'framer-motion'; // For animation
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CollapsibleCard = ({ title, content, footer }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle the collapsible section
    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
            {/* Card Header */}
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleCollapse}>
                <h3 className="text-xl font-semibold">{title}</h3>
                <span className="text-xl">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </div>

            {/* Collapsible Content */}
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                {isOpen && (
                    <div className="mt-4">
                        <p className="text-gray-700 dark:text-gray-300">{content}</p>
                        {footer && <div className="mt-4">{footer}</div>}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default CollapsibleCard;
