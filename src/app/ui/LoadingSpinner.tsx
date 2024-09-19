import React, { FC } from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: FC = () => {
    // アニメーションのバリエーション (Framer Motion)
    const bounceVariants = {
        start: { scale: 0 },
        end: { scale: 1, opacity: 1, transition: { duration: 0.6, yoyo: Infinity } },
    };

    return (
        <div className="flex justify-center items-center h-16 w-16">
            {/* スピナーの二つの円 */}
            <motion.div
                className="w-8 h-8 bg-blue-500 rounded-full"
                variants={bounceVariants}
                initial="start"
                animate="end"
            />
            <motion.div
                className="w-8 h-8 bg-blue-500 rounded-full ml-4"
                variants={bounceVariants}
                initial="start"
                animate="end"
                transition={{ duration: 0.6, yoyo: Infinity, delay: 0.3 }} // 2つ目のバウンスにディレイ
            />
        </div>
    );
};

export default LoadingSpinner;
