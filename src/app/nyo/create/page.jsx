'use client';

import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useToast } from '@chakra-ui/react'; // Toast import
import Input from '@/app/ui/InputField'; // User input component
import Button from '@/app/ui/Button'; // Button component
import ModalSpinner from '@/app/ui/ModalSpinner'; // Spinner component
import { createRecord } from '@/app/lib/nyoRecordController'; // Record creation function

export default function AddRecord() {
    const [remarks, setRemarks] = useState(''); // State for remarks input
    const [dateTime, setDateTime] = useState(''); // State for date-time input
    const [isSubmitting, setIsSubmitting] = useState(false); // Submitting state
    const toast = useToast(); // Initialize toast

    const auth = getAuth(); // Firebase Auth instance

    // Function to handle adding a new record
    const handleAddRecord = async () => {
        setIsSubmitting(true); // Set submitting flag
        const user = auth.currentUser; // Get the current logged-in user

        if (!user) {
            alert('ログインが必要です。');
            setIsSubmitting(false);
            return;
        }

        try {
            const date = new Date(dateTime);
            if (isNaN(date.getTime())) {
                throw new Error('無効な日時です。');
            }

            await createRecord(user.uid, date, remarks);

            // Show success toast instead of redirecting
            toast({
                title: 'レコードが追加されました。',
                description: '新しいレコードが正常に追加されました。',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'top-right',
            });

            setIsSubmitting(false);
            // No redirect needed, just show the toast
        } catch (error) {
            console.error('エラーが発生しました:', error);
            toast({
                title: 'エラーが発生しました。',
                description: `レコードの追加に失敗しました: ${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 dark:text-gray-100">
            <div className="max-w-md w-full space-y-8">
                <Input
                    name="dateTime"
                    type="datetime-local" // Date-time input field
                    label="日時"
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200" // Dark mode styles for input
                    onChange={(e) => setDateTime(e.target.value)} // Input for date-time
                />
                <Input
                    name="remarks"
                    type="text"
                    label="備考"
                    placeholder="備考を入力"
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200" // Dark mode styles for input
                    onChange={(e) => setRemarks(e.target.value)} // Input for remarks
                />

                <Button
                    onClick={handleAddRecord} // Add record on button click
                    disabled={isSubmitting} // Disable button while submitting
                    className="dark:bg-blue-700 dark:hover:bg-blue-800" // Dark mode button styles
                >
                    {isSubmitting ? '送信中...' : 'レコードを追加'}
                </Button>
            </div>
            <ModalSpinner isLoading={isSubmitting} /> {/* Show spinner while submitting */}
        </div>
    );
}
