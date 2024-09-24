// src/app/components/AddRecordsFromCSV.js
'use client';

import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useToast } from '@chakra-ui/react';
import Papa from 'papaparse';
import Button from '@/app/ui/Button';
import ModalSpinner from '@/app/ui/ModalSpinner';
import { createRecord } from '@/app/lib/nyoRecordController';

export default function AddRecordsFromCSV() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const auth = getAuth();

  const handleAddRecords = async () => {
    setIsSubmitting(true);
    const user = auth.currentUser;

    if (!user) {
      toast({
        title: 'ログインが必要です。',
        description: '操作を続けるにはログインが必要です。',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // CSVファイルの取得
      const response = await fetch('times.csv');
      if (!response.ok) {
        throw new Error('CSVファイルの取得に失敗しました。');
      }
      const csvText = await response.text();

      // CSVのパース
      const parsedData = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });

      if (parsedData.errors.length) {
        throw new Error('CSVファイルのパース中にエラーが発生しました。');
      }

      const records = parsedData.data;

      // レコードの追加
      for (const [index, record] of records.entries()) {
        const { Date: dateStr, Time: timeStr } = record;

        // 曜日を削除
        const dateWithoutDay = dateStr.trim().replace(/\([^)]+\)/, '');
        const combinedDateTimeStr = `${dateWithoutDay} ${timeStr.trim()}`;
        const date = new Date(combinedDateTimeStr);

        if (isNaN(date.getTime())) {
          console.error(`無効な日時: ${combinedDateTimeStr}`);
          toast({
            title: `行 ${index + 2} の日時が無効です。`,
            description: `日時 "${combinedDateTimeStr}" は無効です。`,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right',
          });
          continue; // 次のレコードに進む
        }

        // Firestoreにレコードを追加
        await createRecord(user.uid, date, '');
      }

      toast({
        title: 'レコードが追加されました。',
        description: 'CSVファイルからレコードが正常に追加されました。',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('エラーが発生しました:', error);
      toast({
        title: 'エラーが発生しました。',
        description: `レコードの追加に失敗しました: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-md w-full space-y-8">
        <Button
          onClick={handleAddRecords}
          disabled={isSubmitting}
          className="dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          {isSubmitting ? '送信中...' : 'CSVからレコードを追加'}
        </Button>
      </div>
      <ModalSpinner isLoading={isSubmitting} />
    </div>
  );
}
