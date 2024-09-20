import React from 'react';
import { motion } from 'framer-motion';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center justify-center space-x-4 mt-4">
            {/* 前へボタン */}
            <motion.button
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                前へ
            </motion.button>

            {/* 現在のページ表示 */}
            <span className="text-lg font-bold">{currentPage} / {totalPages}</span>

            {/* 次へボタン */}
            <motion.button
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                次へ
            </motion.button>
        </div>
    );
};

export default Pagination;
