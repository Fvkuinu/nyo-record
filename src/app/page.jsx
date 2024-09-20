// ✅ クライアントコンポーネント
"use client";

import React, { useState, useEffect } from 'react';
import CalendarComponent from '@/app/(components)/CalendarComponent';
import RecordList from '@/app/(components)/RecordList';
import { getAllRecords, getRecordsByDate } from '@/app/lib/nyoRecordController'; // 記録取得関数

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [records, setRecords] = useState([]); // 選択された日付の記録

    // 全ての記録を取得して日付ごとのレコード件数をイベントとして設定
    const fetchAllRecords = async () => {
        try {
            const records = await getAllRecords();
            const eventData = records.reduce((acc, record) => {
                const dateStr = new Date(record.dateTime).toISOString().split('T')[0]; // 日付をISO形式に変換
                if (!acc[dateStr]) {
                    acc[dateStr] = { date: dateStr, count: 0 };
                }
                acc[dateStr].count += 1;
                return acc;
            }, {});

            // イベント形式に変換してセット
            const eventArray = Object.values(eventData)
                .map(event => ({
                    title: `${event.count} 件`,
                    start: event.date
                }));

            setEvents(eventArray);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    // 選択された日付の記録を取得
    const fetchRecordsByDate = async (date) => {
        try {
            const recordsForDate = await getRecordsByDate(date);
            setRecords(recordsForDate);
        } catch (error) {
            console.error("Error fetching records by date:", error);
        }
    };

    // カレンダーの日付がクリックされたとき
    const handleDateClick = (dateStr) => {
        setSelectedDate(dateStr);
        fetchRecordsByDate(dateStr);
    };

    useEffect(() => {
        fetchAllRecords();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">記録カレンダー</h2>
            <CalendarComponent 
                events={events} 
                onDateClick={handleDateClick} 
                selectedDate={selectedDate} // 選択された日付を渡す
            />
            <RecordList records={records} selectedDate={selectedDate} />
        </div>
    );
};

export default CalendarPage;
