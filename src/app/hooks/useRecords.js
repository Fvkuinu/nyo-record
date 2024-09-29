// src/app/hooks/useRecords.js
'use client';

import { useState, useEffect } from 'react';
import { getAllRecordsByUserId, getRecordsByStartAndEndDate, deleteRecord } from '@/app/lib/nyoRecordController';
import {
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
    startOfDay,
    endOfDay
} from 'date-fns';

/**
 * カスタムフック: ユーザーの尿記録を取得および管理する
 * @param {string} userId - ユーザーID
 * @param {string} filterType - フィルタの種類 ('日', '週', '月', '年')
 * @param {Date} selectedDate - 選択された日付
 * @returns {Object} レコード、イベント、ローディング状態、エラー、削除ハンドラ
 */
const useRecords = (userId, filterType, selectedDate) => {
    const [records, setRecords] = useState([]); // フィルタされたレコードを保存
    const [events, setEvents] = useState([]); // カレンダー用のイベント
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return; // userId がない場合は処理を行わない

        const fetchRecords = async () => {
            setIsLoading(true);
            setError(null);
            try {
                let fetchedRecords;

                if (!filterType || !selectedDate) {
                    // フィルタが指定されていない場合、全てのレコードを取得
                    fetchedRecords = await getAllRecordsByUserId(userId);
                } else {
                    // フィルタが指定されている場合、開始日と終了日を計算
                    let start, end;
                    switch (filterType) {
                        case '日':
                            start = startOfDay(new Date(selectedDate));
                            end = endOfDay(new Date(selectedDate));
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
                            // 未定義のフィルタタイプの場合は全てのレコードを取得
                            //fetchedRecords = await getAllRecordsByUserId(userId);
                    }

                    // start と end が定義されている場合にフィルタされたレコードを取得
                    if (start && end) {
                        fetchedRecords = await getRecordsByStartAndEndDate(userId, start, end);
                    }
                }

                setRecords(fetchedRecords);

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
                console.error('Error fetching records:', err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecords();
    }, [userId, filterType, selectedDate]);

    // レコード削除処理
    const handleDelete = async (recordId) => {
        try {
            await deleteRecord(recordId);
            setRecords(prevRecords => prevRecords.filter(record => record.id !== recordId));
        } catch (err) {
            console.error('Error deleting record:', err);
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
