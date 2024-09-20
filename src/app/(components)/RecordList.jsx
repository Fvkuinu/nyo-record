// ✅ クライアントコンポーネント
"use client";

import React from 'react';
import Nyo from './Nyo'; // 記録表示用コンポーネント
import { motion } from 'framer-motion'; // Framer Motionのインポート

const RecordList = ({ records, selectedDate }) => {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">
                {selectedDate ? new Date(selectedDate).toLocaleDateString() : '日付を選択してください'}の記録
            </h3>
            <motion.ul
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {records.length > 0 ? (
                    records.map((record) => (
                        <Nyo 
                            key={record.id} 
                            record={record} 
                        />
                    ))
                ) : (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        この日の記録はありません。
                    </motion.p>
                )}
            </motion.ul>
        </div>
    );
};

export default RecordList;
