// ✅クライアントコンポーネント
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const Nyo = ({ record, onDelete }) => {
    const router = useRouter();

    // 編集ページに遷移
    const handleEditClick = () => {
        router.push(`/edit/${record.id}`);
    };

    return (
        <li>
            <div>
                <strong>日時: </strong>{new Date(record.dateTime).toLocaleString()}
                {record.remarks && (
                    <>
                        <br />
                        <strong>備考: </strong>{record.remarks}
                    </>
                )}
                <button onClick={handleEditClick}>編集</button>
                <button onClick={() => onDelete(record.id)}>削除</button>
            </div>
        </li>
    );
};

export default Nyo;
