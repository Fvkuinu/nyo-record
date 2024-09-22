'use client'

import { useState, useCallback } from 'react';

const useDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeDialog = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleDialog = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return { isOpen, openDialog, closeDialog, toggleDialog };
};

export default useDialog;
