'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHeartbeat, FaBars } from 'react-icons/fa'; // Only keeping the Apple and Bars icons
import GlobalNav from './GlobalNav'; // Global Navigation Component
import Button from '@/app/ui/Button'; // Button Component
import ThemeToggle from '@/app/components/ThemeToggle'; // Theme Toggle Component
import { motion } from 'framer-motion'; // Framer Motion for animations
import { auth } from '@/app/lib/firebase/client'; // Import initialized auth instance
import { onAuthStateChanged } from 'firebase/auth';

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [user, setUser] = useState(null); // Track user state

    useEffect(() => {
        // Monitor authentication state
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Toggle global navigation
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    // Retrieve username (first 6 characters of the email + 'さん')
    const getUsername = () => {
        if (user && user.email) {
            const emailPrefix = user.email.substring(0, 6);
            return `${emailPrefix}さん`;
        }
        return null;
    };

    return (
        <header className="bg-black text-white p-4 flex justify-between items-center">
            {/* Left: Apple logo */}
            <motion.div>
                <Link href="/">
                    <FaHeartbeat className="text-2xl cursor-pointer" />
                </Link>
            </motion.div>

            {/* Right: User info, Theme Toggle, and Navigation Toggle */}
            <div className="flex items-center space-x-6">
                {/* Theme toggle button */}
                <ThemeToggle />

                {/* Show username or login button based on auth state */}
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

            {/* Global navigation */}
            {isNavOpen && <GlobalNav onClose={toggleNav} />}
        </header>
    );
};

export default Header;
