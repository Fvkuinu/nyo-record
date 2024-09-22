'use client';

import React, { useState } from 'react';
import CalendarComponent from '@/app/components/CalendarComponent';
import RecordList from '@/app/components/RecordList';
import HourChart from '@/app/components/HourChart'; // Import HourChart component
import LoadingSpinner from '@/app/ui/LoadingSpinner';
import useAuth from '@/app/hooks/useAuth';
import useRecords from '@/app/hooks/useRecords';

const CalendarPage = () => {
    const { user, loading } = useAuth(); // Get both user and loading state

    // Helper function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero
        const day = String(today.getDate()).padStart(2, '0'); // Add leading zero
        return `${year}-${month}-${day}`;
    };

    // Set the initial selected date to today's date
    const [selectedDate, setSelectedDate] = useState(getTodayDate());

    // useRecords now only filters by day based on selectedDate
    const { records, events, isLoading, error, handleDelete } = useRecords(user?.uid, 'day', selectedDate);
    
    const handleDateClick = (dateStr) => {
        setSelectedDate(dateStr); // Set the clicked date as the selected date
    };

    // Sort records by dateTime
    const sortedRecords = records.sort((a, b) => {
        const dateA = a.dateTime.toDate ? a.dateTime.toDate() : new Date(a.dateTime);
        const dateB = b.dateTime.toDate ? b.dateTime.toDate() : new Date(b.dateTime);
        return dateA - dateB; // Sort in ascending order (earliest first)
    });

    // Show the loading spinner while authentication is in progress
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">記録カレンダー</h2>
            {user ? (
                <>
                    <CalendarComponent 
                        events={events} // Pass all time-based records as events
                        onDateClick={handleDateClick} 
                        selectedDate={selectedDate}
                    />
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <RecordList 
                                records={sortedRecords} // Pass sorted records for the selected date
                                selectedDate={selectedDate}
                                onDelete={handleDelete} 
                            />
                            <HourChart records={sortedRecords} /> {/* Render the HourChart with the sorted records */}
                        </>
                    )}
                    {error && <p className="text-red-500 mt-4">エラーが発生しました: {error.message}</p>}
                </>
            ) : (
                <p className="text-red-500">ログインが必要です。</p>
            )}
        </div>
    );
};

export default CalendarPage;
