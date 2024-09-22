// src/app/ui/RoundedButton.jsx
import React from 'react';

const RoundedButton = ({ children, onClick, className, ...props }) => {
    return (
        <button
            onClick={onClick}
            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default RoundedButton;
