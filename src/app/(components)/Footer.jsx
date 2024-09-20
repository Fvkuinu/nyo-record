import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-black text-white p-4 text-center flex flex-col items-center space-y-4">
            {/* フッターのリンク */}
            <div className="flex space-x-6">
                <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                </Link>
                <Link href="/terms" className="hover:underline">
                    Terms of Service
                </Link>
                <Link href="/contact" className="hover:underline">
                    Contact Us
                </Link>
            </div>

            {/* コピーライト情報 */}
            <p className="text-sm">© 2024 My App. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
