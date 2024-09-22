'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHeartbeat, FaBars } from 'react-icons/fa';
import GlobalNav from './GlobalNav';
import Button from '@/app/ui/Button';
import ThemeToggle from '@/app/components/ThemeToggle';
import { motion } from 'framer-motion';
import { auth } from '@/app/lib/firebase/client';
import { onAuthStateChanged } from 'firebase/auth';

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const getUsername = () => {
        if (user && user.email) {
            const emailPrefix = user.email.substring(0, 6);
            return `${emailPrefix}さん`;
        }
        return null;
    };

    return (
        <header className="bg-black text-white p-4 flex justify-between items-center">
            {/* Left: Heartbeat logo */}
            <motion.div>
                <Link href="/">
                    <FaHeartbeat className="text-2xl cursor-pointer" />
                </Link>
            </motion.div>

            {/* Right: User info, Theme Toggle, and Navigation Toggle */}
            <div className="flex items-center space-x-6">
                <ThemeToggle />

                {user ? (
                    <span className="text-sm">
                        {getUsername()}
                    </span>
                ) : (
                    <Link href="/login">
                        <Button>
                            ログイン
                        </Button>
                    </Link>
                )}

                {/* Navigation toggle button */}
                <Button onClick={toggleNav}>
                    <FaBars className="text-xl" />
                </Button>
            </div>

            {/* Global navigation with isNavOpen prop */}
            <GlobalNav onClose={toggleNav} isNavOpen={isNavOpen} />
        </header>
    );
};

export default Header;
