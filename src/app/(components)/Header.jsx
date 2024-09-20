'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { FaApple, FaSearch, FaShoppingBag, FaBars } from 'react-icons/fa';
import GlobalNav from './GlobalNav'; // グローバルナビゲーションコンポーネント
import Button from '@/app/ui/Button'; // ボタンコンポーネントをインポート
import { motion } from 'framer-motion'; // Framer Motionのインポート

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    // グローバルナビゲーションをトグルする関数
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    // リンクホバー時のアニメーション設定
    const linkVariants = {
        //hover: { scale: 1.1, x: 10, transition: { duration: 0.2 } }, // ホバー時にスケールアップし、右に少し動く
    };

    return (
        <header className="bg-black text-white p-4 flex justify-between items-center">
            {/* 左側のAppleロゴ */}
            <motion.div variants={linkVariants} whileHover="hover">
                <Link href="/">
                    <FaApple className="text-2xl cursor-pointer" />
                </Link>
            </motion.div>

            {/* 右側のアイコン */}
            <div className="flex items-center space-x-6">
                <motion.div variants={linkVariants} whileHover="hover">
                    <Link href="/search">
                        <FaSearch className="text-xl cursor-pointer" />
                    </Link>
                </motion.div>
                <motion.div variants={linkVariants} whileHover="hover">
                    <Link href="/cart">
                        <FaShoppingBag className="text-xl cursor-pointer" />
                    </Link>
                </motion.div>
                <Button onClick={toggleNav}>
                    <FaBars className="text-xl" />
                </Button>
            </div>

            {/* グローバルナビゲーション */}
            {isNavOpen && <GlobalNav onClose={toggleNav} />}
        </header>
    );
};

export default Header;
