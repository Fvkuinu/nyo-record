// クライアントコンポーネントとして指定
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRecordById, updateRecord } from '@/app/lib/nyoRecordController'; // 必要な関数をインポート

const EditNyo = ({ params }) => {
    const router = useRouter();
    const id = params.id; // URLのidパラメータを取得
    const [record, setRecord] = useState(null);
    const [editDateTime, setEditDateTime] = useState('');
    const [editRemarks, setEditRemarks] = useState('');

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

    // 空白をTに戻して保存用に変換
    const formatDateTimeForSave = (dateTime) => {
        return dateTime.replace(' ', 'T');
    };

    // 記録を取得してフォームに表示する
    const fetchRecord = async () => {
        if (id) {
            try {
                const fetchedRecord = await getRecordById(parseInt(id, 10));
                setRecord(fetchedRecord);
                // fetchedRecord.dateTime を空白付きの形式に変換してセット
                setEditDateTime(formatDateTimeForInput(fetchedRecord.dateTime));
                setEditRemarks(fetchedRecord.remarks || '');
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
            // 空白をTに戻して保存
            const formattedDateTime = new Date(editDateTime);
            await updateRecord(record.id, formattedDateTime, editRemarks);
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
            <h2>尿記録の編集</h2>
            <div>
                <label>日時</label>
                <input
                    type="datetime-local"
                    value={editDateTime}
                    onChange={(e) => setEditDateTime(e.target.value)}
                />
            </div>
            <div>
                <label>備考</label>
                <input
                    type="text"
                    value={editRemarks}
                    onChange={(e) => setEditRemarks(e.target.value)}
                    placeholder="備考"
                />
            </div>
            <button onClick={handleUpdateRecord}>保存</button>
        </div>
    );
}

export default EditNyo;
