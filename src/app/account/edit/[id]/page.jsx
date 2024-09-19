"use client";

import React, {useEffect, useState} from 'react';
import {getRecordById, updateRecord} from '@/app/lib/nyoRecordController';

const EditUser = ({params}) => {
    const id = params.id;
    const [record, setRecord] = useState(null);

    // dateTimeをdatetime-local形式に変換する関数
    const formatDateTimeForInput = (dateTime) => {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getMinutes()).padStart(2, '0');
        // Tを空白に変換
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // 記録を取得してフォームに表示する
    const fetchRecord = async () => {
        if (id) {
            try {
                const fetchedRecord = await getRecordById(parseInt(id, 10));
                setRecord(fetchedRecord);
            } catch (error) {
                console.error("Error fetching record: ", error);
            }
        }
    };

    useEffect(() => {
        fetchRecord();
    }, [id]);

    // 記録を更新する
    const handleUpdateRecord = async () => {
        try {
            await updateRecord(record.id, record.userName, record.password);
            router.push('/'); // 更新後にリストページに戻る
        } catch (error) {
            console.error("Error updating record:", error);
        }
    };

    if (!record) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>ユーザーの編集</h2>
            <div>
                <label>ユーザー名</label>
                <input
                    type="text"
                    value={record.userName}
                    onChange={(e) => setRecord(e.target.value)}
                />
            </div>
            <div>
                <label>パスワード</label>
                <input
                    type="text"
                    value={record.password}
                    onChange={(e) => setRecord(e.target.value)}
                    placeholder="パスワードa"
                />
            </div>
            <button onClick={handleUpdateRecord}>保存</button>
        </div>
    );
}