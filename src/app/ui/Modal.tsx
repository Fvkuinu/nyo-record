import React, { FC } from 'react';
import { motion } from 'framer-motion';
import 'hover.css/css/hover.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    // モーダルのアニメーション設定 (Framer Motion)
    const modalVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 100 },
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
            >
                {/* モーダルヘッダー */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button
  className="hvr-bounce-to-right bg-red-500 text-white rounded-full px-3 py-1 overflow-hidden"
  onClick={onClose}
>
  閉じる
</button>
                </div>

                {/* モーダルの内容 */}
                <div>{children}</div>
            </motion.div>
        </div>
    );
};

export default Modal;
