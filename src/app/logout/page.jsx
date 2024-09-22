'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js navigation
import { signOut } from 'firebase/auth';
import { auth } from '@/app/lib/firebase/client'; // Import the initialized auth instance
import Link from 'next/link'; // Link to navigate back to the homepage

const LogoutPage = () => {
    const router = useRouter();

    useEffect(() => {
        // Sign out the user when the component is mounted
        signOut(auth)
            .then(() => {
                console.log('User logged out');
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-2xl font-bold mb-4">ログアウト完了しました</h1>
            <Link href="/" className="text-blue-500 underline">
                トップへ戻る
            </Link>
        </div>
    );
};

export default LogoutPage;
