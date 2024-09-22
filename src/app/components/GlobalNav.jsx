import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const GlobalNav = ({ onClose, isNavOpen }) => {
    const navVariants = {
        hidden: { opacity: 0, x: '-100%' },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: '-100%', transition: { duration: 0.5 } } // exitアニメーション
    };

    const linkVariants = {
        hover: { scale: 1.1, color: '#3b82f6', transition: { duration: 0.2 } }
    };

    return (
        <AnimatePresence>
            {isNavOpen && (
                <motion.nav
                    className="fixed inset-0 bg-black bg-opacity-90 text-white flex flex-col items-center justify-center z-50"
                    variants={navVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }} // アニメーションの速度
                >
                    {/* 右上のバツボタン */}
                    <motion.div className="absolute top-4 right-4">
                        <motion.button
                            onClick={onClose}
                            aria-label="Close Navigation"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaTimes className="text-3xl text-white hover:text-gray-400 cursor-pointer" />
                        </motion.button>
                    </motion.div>

                    {/* ナビゲーションのリンク */}
                    <ul className="text-center space-y-6 text-2xl">
                        <motion.li variants={linkVariants} whileHover="hover">
                            <Link href="/" onClick={onClose} className="hover:text-blue-500 line-through">
                                HOME
                            </Link>
                        </motion.li>

                        <motion.li variants={linkVariants} whileHover="hover">
                            <Link href="/dashboard" onClick={onClose} className="hover:text-blue-500">
                                DASHBOARD
                            </Link>
                        </motion.li>
                        <motion.li variants={linkVariants} whileHover="hover">
                            <Link href="/analytics" onClick={onClose} className="hover:text-blue-500">
                                ANALYTICS
                            </Link>
                        </motion.li>
                        <motion.li variants={linkVariants} whileHover="hover">
                            <Link href="/nyo/create" onClick={onClose} className="hover:text-blue-500">
                                CREATE
                            </Link>
                        </motion.li>
                        <motion.li variants={linkVariants} whileHover="hover">
                            <Link href="/nyo/quickCreate" onClick={onClose} className="hover:text-blue-500">
                                QUICK CREATE
                            </Link>
                        </motion.li>
                        <motion.li variants={linkVariants} whileHover="hover">
                            <Link href="/logout" onClick={onClose} className="hover:text-blue-500">
                                LOGOUT
                            </Link>
                        </motion.li>
                    </ul>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default GlobalNav;
