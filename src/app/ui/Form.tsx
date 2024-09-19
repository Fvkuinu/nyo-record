import React, { FC, ReactNode, FormEvent } from 'react';
import { motion } from 'framer-motion';

interface FormProps {
    children: ReactNode; // フォーム内の要素
    onSubmit: (event: FormEvent<HTMLFormElement>) => void; // フォームの送信時のイベントハンドラ
}

const Form: FC<FormProps> = ({ children, onSubmit }) => {
    return (
        <motion.form
            onSubmit={onSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            initial={{ opacity: 0, y: 20 }} // 初期状態
            animate={{ opacity: 1, y: 0 }} // 表示状態
            exit={{ opacity: 0, y: -20 }} // 非表示状態
            transition={{ duration: 0.5 }} // アニメーションの持続時間
        >
            {children}
        </motion.form>
    );
};

export default Form;
