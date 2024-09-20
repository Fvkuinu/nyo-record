import { ThemeProvider } from 'next-themes';
import './globals.css';
import Header from './(components)/Header'; // Header をインポート
import Footer from './(components)/Footer'; // Footer をインポート

const Layout = ({ children }) => {
    return (
        <html lang="ja">
            <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
                <ThemeProvider attribute="class">
                <Header />
                <main className="p-6 flex-grow">
                    {children}
                </main>
                <Footer />
            </ThemeProvider>
        </body>
    </html>
        
    );
};

export default Layout;
