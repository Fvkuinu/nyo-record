// app/api/addTimes/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';

// Firebase Admin SDKの初期化
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

export async function POST(request) {
  try {
    const { uid } = await request.json();

    if (!uid) {
      return NextResponse.json({ error: 'ユーザー認証が必要です。' }, { status: 401 });
    }

    const filePath = path.join(process.cwd(), 'app', 'times.csv');
    const csvData = fs.readFileSync(filePath, 'utf8');

    const lines = csvData.trim().split('\n');
    lines.shift(); // ヘッダーを削除

    const db = admin.firestore();
    const userRecordsRef = db.collection('users').doc(uid).collection('records');

    for (const line of lines) {
      const [dateStr, timeStr] = line.split(',');

      // 曜日を削除
      const dateWithoutDay = dateStr.trim().replace(/\([^)]+\)/, '');
      const combinedDateTimeStr = `${dateWithoutDay} ${timeStr.trim()}`;
      const date = new Date(combinedDateTimeStr);

      if (isNaN(date.getTime())) {
        console.error(`無効な日時: ${combinedDateTimeStr}`);
        continue;
      }

      await userRecordsRef.add({
        date: admin.firestore.Timestamp.fromDate(date),
        remarks: '',
      });
    }

    return NextResponse.json({ message: 'レコードが正常に追加されました。' });
  } catch (error) {
    console.error('レコード追加中にエラーが発生しました:', error);
    return NextResponse.json({ error: 'レコードの追加に失敗しました。' }, { status: 500 });
  }
}
