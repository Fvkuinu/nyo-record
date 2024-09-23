// src/app/hooks/useRecords.js
'use client';

import { useState, useEffect } from 'react';
import { getAllRecordsByUserId, deleteRecord } from '@/app/lib/nyoRecordController';
import {
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear
} from 'date-fns';

const useRecords = (userId, filterType, selectedDate) => {
    const [allRecords, setAllRecords] = useState([]); // 全てのレコードを保存
    const [records, setRecords] = useState([]); // フィルタされたレコードを保存
    const [events, setEvents] = useState([]); // カレンダー用のイベント
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // 全てのレコードを一度だけ取得する
    useEffect(() => {
        if (!userId) return; // userId がない場合は処理を行わない

        const fetchAllRecords = async () => {
            setIsLoading(true);
            try {
                const fetchedRecords = await getAllRecordsByUserId(userId);
                setAllRecords(fetchedRecords); // 全てのレコードを保存

                // イベントの処理
                const eventData = fetchedRecords.reduce((acc, record) => {
                    const dateObj = record.dateTime.toDate();

                    // 日本時間での日付を取得
                    const dateStr = dateObj.toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        timeZone: 'Asia/Tokyo', // 日本時間に設定
                    }).replace(/\//g, '-'); // 形式を YYYY-MM-DD に整える

                    if (!acc[dateStr]) {
                        acc[dateStr] = { date: dateStr, count: 0 };
                    }
                    acc[dateStr].count += 1;
                    return acc;
                }, {});

                // イベントデータをカレンダー用に整形
                const eventArray = Object.values(eventData).map(event => ({
                    title: `${event.count} 件`,
                    start: event.date,
                }));

                setEvents(eventArray);

            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllRecords();
    }, [userId]);

    // フィルタされたレコードをセットする
    useEffect(() => {
        if (!selectedDate || !filterType || allRecords.length === 0) {
            setRecords([]);
            return;
        }

        let start, end;
        switch (filterType) {
            case '日':
                start = new Date(selectedDate);
                start.setHours(0, 0, 0, 0);
                end = new Date(selectedDate);
                end.setHours(23, 59, 59, 999);
                break;
            case '週':
                start = startOfWeek(new Date(selectedDate), { weekStartsOn: 1 }); // 月曜日開始
                end = endOfWeek(new Date(selectedDate), { weekStartsOn: 1 });
                break;
            case '月':
                start = startOfMonth(new Date(selectedDate));
                end = endOfMonth(new Date(selectedDate));
                break;
            case '年':
                start = startOfYear(new Date(selectedDate));
                end = endOfYear(new Date(selectedDate));
                break;
            default:
                start = new Date(selectedDate);
                end = new Date(selectedDate);
        }

        const filtered = allRecords.filter(record => {
            const recordDate = record.dateTime.toDate();
            return recordDate >= start && recordDate <= end;
        });

        setRecords(filtered);
    }, [selectedDate, filterType, allRecords]);

    // レコード削除処理
    const handleDelete = async (recordId) => {
        try {
            await deleteRecord(recordId);
            const updatedAllRecords = allRecords.filter((record) => record.id !== recordId);
            setAllRecords(updatedAllRecords);
        } catch (err) {
            setError(err);
        }
    };

    return {
        records,
        events,
        isLoading,
        error,
        handleDelete,
    };
};

export default useRecords;
