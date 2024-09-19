import React, { FC } from 'react';
import { motion } from 'framer-motion';
import 'hover.css/css/hover.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    // ボタンのアニメーション設定
    const buttonVariants = {
        hover: { scale: 1.1 },
        tap: { scale: 0.95 },
    };

    return (
        <div className="flex items-center justify-center space-x-4 mt-4">
            {/* 前へボタン */}
            <motion.button
                className={`hvr-grow bg-blue-500 text-white font-bold py-2 px-4 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
            >
                前へ
            </motion.button>

            {/* 現在のページ表示 */}
            <span className="text-lg font-bold">{currentPage} / {totalPages}</span>

            {/* 次へボタン */}
            <motion.button
                className={`hvr-grow bg-blue-500 text-white font-bold py-2 px-4 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
            >
                次へ
            </motion.button>
        </div>
    );
};

export default Pagination;
