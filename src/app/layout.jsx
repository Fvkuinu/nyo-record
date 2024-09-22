'use client';

import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import LoadingSpinner from '@/app/ui/LoadingSpinner'; // Loading spinner component
import Header from './components/Header'; // Header component
import Footer from './components/Footer'; // Footer component
import './globals.css'; // Global styles

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
                    <ThemeProvider attribute="class">
                        {loading ? (
                            // Show only the loading spinner during loading
                            <div className="flex justify-center items-center h-screen">
                                <LoadingSpinner />
                            </div>
                        ) : (
                            // Show the full page content once loading is complete
                            <>
                                <Header />
                                <main className="p-6 flex-grow">
                                    {children}
                                </main>
                                <Footer />
                            </>
                        )}
                    </ThemeProvider>
                </ChakraProvider>
            </body>
        </html>
    );
};

export default Layout;
