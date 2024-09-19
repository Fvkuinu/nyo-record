"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getRecordById, updateRecord } from '@/app/lib/nyoRecordController';
import InputField from '@/app/ui/InputField';
import Button from '@/app/ui/Button';
import Form from '@/app/ui/Form';
import { useToast } from '@/app/hooks/useToast'; // useToast をインポート

const EditUserRecord = ({ params }) => {
    const router = useRouter();
    const id = params.id;
    const [record, setRecord] = useState(null);
    const { showToast, ToastComponent } = useToast(); // useToast の呼び出し

    useEffect(() => {
        const fetchRecord = async () => {
            if (id) {
                try {
                    const fetchedRecord = await getRecordById(parseInt(id, 10));
                    setRecord(fetchedRecord);
                } catch (error) {
                    console.error("Error fetching record: ", error);
                    showToast("データの取得に失敗しました", "error", 3000); // トーストを表示
                }
            }
        };
        fetchRecord();
    }, [id, showToast]);

    const handleUpdateRecord = async () => {
        try {
            await updateRecord(record.id, record.userName, record.password);
            showToast("更新に成功しました", "success", 3000); // 成功時にトーストを表示
            router.push('/');
        } catch (error) {
            console.error("Error updating record:", error);
            showToast("更新に失敗しました", "error", 3000); // エラー時にトーストを表示
        }
    };

    if (!record) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>ユーザーの編集</h2>
            {ToastComponent} {/* トーストコンポーネントの描画 */}
            <Form onSubmit={handleUpdateRecord}>
                <InputField
                    label="ユーザー名"
                    value={record.userName}
                    onChange={(e) =>
                        setRecord((prev) => ({ ...prev, userName: e.target.value }))
                    }
                />
                <InputField
                    label="パスワード"
                    type="password"
                    value={record.password}
                    onChange={(e) =>
                        setRecord((prev) => ({ ...prev, password: e.target.value }))
                    }
                />
                <Button label="保存" onClick={handleUpdateRecord} />
            </Form>
        </div>
    );
};

export default EditUserRecord;
