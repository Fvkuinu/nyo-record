// ✅クライアントコンポーネント
"use client";

import React, { useEffect, useState } from 'react';
import { getAllRecords, deleteRecord } from '@/app/lib/nyoRecordController'; // 必要な関数をインポート
import Nyo from './Nyo'; // 個別記録表示用コンポーネントのインポート

const NyoList = (props) => {
    const [records, setRecords] = useState(props.records);

    // 初期データの取得
    const fetchRecords = async () => {
        try {
            const allRecords = await getAllRecords();
            setRecords(allRecords);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    // 記録の削除
    const handleDeleteRecord = async (recordId) => {
        try {
            await deleteRecord(recordId);
            fetchRecords(); // 削除後にリストを再取得
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    return (
        <div>
            <h2>尿の記録一覧</h2>
            <ul>
                {records.map((record) => (
                    <Nyo
                        key={record.id}
                        record={record}
                        onDelete={handleDeleteRecord}
                    />
                ))}
            </ul>
        </div>
    );
};

export default NyoList;
