'use client';

import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useToast } from '@chakra-ui/react';
import Input from '@/app/ui/Input';
import DateTimePicker from '@/app/ui/DateTimePicker';
import Button from '@/app/ui/Button';
import ModalSpinner from '@/app/ui/ModalSpinner';
import { createRecord } from '@/app/lib/nyoRecordController';

export default function AddRecord() {
  const [remarks, setRemarks] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const auth = getAuth();

  const handleAddRecord = async () => {
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
      if (!dateTime || isNaN(dateTime.getTime())) {
        throw new Error('無効な日時です。');
      }

      await createRecord(user.uid, dateTime, remarks);

      toast({
        title: 'レコードが追加されました。',
        description: '新しいレコードが正常に追加されました。',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });

      setIsSubmitting(false);
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-md w-full space-y-8">
        <DateTimePicker
          name="dateTime"
          label="日時を選択"
          value={dateTime}
          onChange={(newValue) => setDateTime(newValue)}
        />
        <Input
          name="remarks"
          type="text"
          label="備考"
          placeholder="備考を入力"
          onChange={(e) => setRemarks(e.target.value)}
        />

        <Button
          onClick={handleAddRecord}
          disabled={isSubmitting}
          className="dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          {isSubmitting ? '送信中...' : 'レコードを追加'}
        </Button>
      </div>
      <ModalSpinner isLoading={isSubmitting} />
    </div>
  );
}
