import React, { FC, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    duration: number; // 表示時間 (ミリ秒)
    onComplete: () => void; // トーストが消えた後に呼ばれるコールバック
}

const Toast: FC<ToastProps> = ({ message, type, duration, onComplete }) => {
    useEffect(() => {
        // duration 後にトーストを非表示にする
        const timer = setTimeout(() => {
            onComplete(); // duration後にトーストを非表示にする
        }, duration);

        return () => clearTimeout(timer); // コンポーネントがアンマウントされたときにタイマーをクリア
    }, [duration, onComplete]);

    // トーストが表示されるときのアニメーション設定
    const toastVariants = {
        hidden: { y: 50, opacity: 0 }, // 初期状態（下に隠れている）
        visible: { y: 0, opacity: 1 }, // 表示状態
        exit: { x: 300, opacity: 0 }, // 横に消えるアニメーション
    };

    const getToastStyle = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            case 'info':
                return 'bg-blue-500 text-white';
            default:
                return 'bg-blue-500 text-white';
        }
    };

    return (
        <motion.div
            className={`fixed bottom-5 right-5 px-4 py-2 rounded shadow-lg ${getToastStyle()}`}
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }} // アニメーションのトランジション設定
        >
            {message}
        </motion.div>
    );
};

export default Toast;
