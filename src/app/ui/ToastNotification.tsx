import React, { FC } from 'react';

interface ToastNotificationProps {
    message: string;
    type?: 'success' | 'error';
}

const ToastNotification: FC<ToastNotificationProps> = ({ message, type = 'success' }) => {
    const getNotificationStyle = () => {
        return type === 'error' ? 'toast-error' : 'toast-success';
    };

    return <div className={`toast ${getNotificationStyle()}`}>{message}</div>;
};

export default ToastNotification;
