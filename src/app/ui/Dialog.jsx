// src/app/ui/Dialog.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io'; // Close icon

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    hidden: {
        opacity: 0,
        y: '-50%',
        x: '-50%',
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        y: '-50%',
        x: '-50%',
        scale: 1,
        transition: { delay: 0.1 },
    },
};

const Dialog = ({ isOpen, onClose, title, children }) => {
    React.useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-60"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-md p-6"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)', // Center the dialog on the screen
                        }}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            onClick={onClose}
                            aria-label="Close Dialog"
                        >
                            <IoMdClose size={24} />
                        </button>
                        {title && (
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                                {title}
                            </h2>
                        )}
                        <div className="text-gray-700 dark:text-gray-200">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Dialog;
