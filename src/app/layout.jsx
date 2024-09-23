// src/app/layout.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import LoadingSpinner from '@/app/ui/LoadingSpinner'; // Loading spinner component
import Header from './components/Header'; // Header component
import Footer from './components/Footer'; // Footer component
import './globals.css'; // Global styles

// NextUIのライトテーマを作成
const lightTheme = createTheme({
    type: 'light',
    theme: {
        colors: {
            primary: '#3B82F6',
            secondary: '#6B7280',
            error: '#EF4444',
        },
    },
});

// NextUIのダークテーマを作成
const darkTheme = createTheme({
    type: 'dark',
    theme: {
        colors: {
            primary: '#1D4ED8',
            secondary: '#4B5563',
            error: '#DC2626',
        },
    },
});

const Layout = ({ children }) => {
    const [loading, setLoading] = useState(true); // Track loading state

    // Simulate loading process (use real data fetching or routing logic as needed)
    useEffect(() => {
        const handleLoading = () => {
            setLoading(false); // Set loading to false after content is ready
        };

        // You can adjust this to reflect the actual loading mechanism in your app
        setTimeout(handleLoading, 1000); // Simulate a 1-second delay for loading

        return () => clearTimeout(handleLoading); // Cleanup if needed
    }, []);

    return (
        <html lang="ja">
            <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
                <ChakraProvider>
                    <NextThemesProvider
                        defaultTheme="system"
                        attribute="class"
                        value={{
                            light: lightTheme.className,
                            dark: darkTheme.className,
                        }}
                    >
                        <NextUIProvider>
                            {loading ? (
                                // Show only the loading spinner during loading
                                <div className="flex justify-center items-center h-screen">
                                    <LoadingSpinner />
                                </div>
                            ) : (
                                // Show the full page content once loading is complete
                                <>
                                    <Header />
                                    <main className="p-0 flex-grow">
                                        {children}
                                    </main>
                                    <Footer />
                                </>
                            )}
                        </NextUIProvider>
                    </NextThemesProvider>
                </ChakraProvider>
            </body>
        </html>
    );
};

export default Layout;
