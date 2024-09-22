'use client';

import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useToast } from '@chakra-ui/react'; // Toast import
import Button from '@/app/ui/Button'; // Button component
import { createRecord } from '@/app/lib/nyoRecordController'; // Firebaseへの記録追加用関数
import ModalSpinner from '@/app/ui/ModalSpinner'; // Spinner component

export default function SaveTimeButton() {
  const [isSubmitting, setIsSubmitting] = useState(false); // 送信中かどうか
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // ボタンの無効化状態
  const toast = useToast(); // Toastの初期化
  const auth = getAuth(); // Firebase認証インスタンス

  // ボタンを押したときの処理
  const handleButtonClick = async () => {
    setIsSubmitting(true); // 送信中フラグをセット
    const user = auth.currentUser; // 現在のログインユーザーを取得

    if (!user) {
      toast({
        title: 'ログインが必要です。',
        description: 'この操作にはログインが必要です。',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const now = new Date(); // 現在の日時を取得

      // Firebaseに記録を作成
      await createRecord(user.uid, now, '');

      // 成功時のトースト表示
      toast({
        title: '時間が保存されました。',
        description: `保存された時間: ${now.toLocaleString()}`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });

      setIsButtonDisabled(true); // ボタンを無効化
      setIsSubmitting(false); // 送信終了
    } catch (error) {
      console.error('エラーが発生しました:', error);
      toast({
        title: 'エラーが発生しました。',
        description: `時間の保存に失敗しました: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setIsSubmitting(false); // エラー時にも送信状態を終了
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 dark:text-gray-100">
      <Button
        onClick={handleButtonClick}
        disabled={isButtonDisabled || isSubmitting} // 一度押したら無効化
        className="w-40 h-40 rounded-full bg-blue-600 text-white text-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        {isSubmitting ? '送信中...' : '時間を保存'}
      </Button>
      <ModalSpinner isLoading={isSubmitting} /> {/* 送信中にスピナーを表示 */}
    </div>
  );
}
