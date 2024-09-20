import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    // アコーディオンのコンテンツアニメーション設定
    const contentVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' },
    };

    return (
        <div className="bg-white shadow-md rounded-lg mb-4">
            <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={toggleOpen}
            >
                <h3 className="text-lg font-semibold">{title}</h3>
                <span className="text-xl">{isOpen ? '-' : '+'}</span>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="overflow-hidden p-4"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Accordion;
