import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa'; // バツアイコンのインポート

const GlobalNav = ({ onClose }) => {
    // ナビゲーションのアニメーション設定
    const navVariants = {
        hidden: { opacity: 0, x: '-100%' },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: '-100%' }
    };

    // リンクホバー時のアニメーション設定
    const linkVariants = {
        hover: { scale: 1.1, color: '#3b82f6', transition: { duration: 0.2 } }, // ホバー時にスケールアップし、色を変更
    };

    return (
        <motion.nav
            className="fixed inset-0 bg-black bg-opacity-90 text-white flex flex-col items-center justify-center z-50"
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
        >
            {/* 右上のバツボタン */}
            <div className="absolute top-4 right-4">
                <button onClick={onClose} aria-label="Close Navigation">
                    <FaTimes className="text-3xl text-white hover:text-gray-400 cursor-pointer" />
                </button>
            </div>

            {/* ナビゲーションのリンク */}
            <ul className="text-center space-y-6 text-2xl">
                <motion.li variants={linkVariants} whileHover="hover">
                    <Link href="/" onClick={onClose} className="hover:text-blue-500">
                        Home
                    </Link>
                </motion.li>
                <motion.li variants={linkVariants} whileHover="hover">
                    <Link href="/products" onClick={onClose} className="hover:text-blue-500">
                        Products
                    </Link>
                </motion.li>
                <motion.li variants={linkVariants} whileHover="hover">
                    <Link href="/about" onClick={onClose} className="hover:text-blue-500">
                        About
                    </Link>
                </motion.li>
                <motion.li variants={linkVariants} whileHover="hover">
                    <Link href="/contact" onClick={onClose} className="hover:text-blue-500">
                        Contact
                    </Link>
                </motion.li>
            </ul>
        </motion.nav>
    );
};

export default GlobalNav;
