'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Toast from '@/app/ui/Toast';

interface UseToastReturn {
    showToast: (message: string, type: 'success' | 'error' | 'info', duration: number) => void;
    ToastComponent: JSX.Element | null;
}

export const useToast = (): UseToastReturn => {
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; duration: number } | null>(null);
    const [isVisible, setIsVisible] = useState(false); // トーストの表示状態

    const showToast = (message: string, type: 'success' | 'error' | 'info', duration: number) => {
        setToast({ message, type, duration });
        setIsVisible(true); // トーストを表示する
    };

    const handleComplete = () => {
        setIsVisible(false); // トーストが非表示になったら状態をリセット
    };

    // ToastComponent をレンダリング
    const ToastComponent = (
        <AnimatePresence>
            {toast && isVisible && (
                <Toast message={toast.message} type={toast.type} duration={toast.duration} onComplete={handleComplete} />
            )}
        </AnimatePresence>
    );

    return { showToast, ToastComponent };
};
