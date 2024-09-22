import { 
    collection, 
    getDocs, 
    query, 
    where, 
    addDoc, 
    getDoc, 
    serverTimestamp, 
    doc, 
    deleteDoc 
} from 'firebase/firestore';
import { firestore } from './firebase/client'; // Import Firestore instance from your initialized Firebase

// Firestore のコレクションを取得
const recordCollection = collection(firestore, 'Record');

/**
 * ユーザーIDで全ての尿記録を取得する関数
 * @param {string} userId - ユーザーID
 * @returns {Promise<Array>} 全ての記録データの配列
 */
export const getAllRecordsByUserId = async (userId) => {
    try {
        const q = query(recordCollection, where('userId', '==', userId));
        console.log('Fetching all records for user:', userId);
        const recordsSnapshot = await getDocs(q);
        const records = recordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched records:', records);
        return records;
    } catch (error) {
        console.error('Error fetching all records:', error);
        throw new Error('レコードの取得に失敗しました');
    }
};

/**
 * ユーザーIDと日付で尿記録を取得する関数
 * @param {string} userId - ユーザーID
 * @param {Date} date - 取得したい日付
 * @returns {Promise<Array>} その日の記録データの配列
 */
export const getRecordsByDate = async (userId, date) => {
    try {
        // 日付の開始と終了を定義
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        console.log('Fetching records for user:', userId, ' from ', startOfDay, ' to ', endOfDay);

        const q = query(
            recordCollection,
            where('userId', '==', userId),
            where('dateTime', '>=', startOfDay),
            where('dateTime', '<=', endOfDay)
        );
        
        const recordsSnapshot = await getDocs(q);
        const records = recordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched records by date:', records);
        return records;
    } catch (error) {
        console.error('Error fetching records by date:', error);
        throw new Error('指定日付のレコード取得に失敗しました');
    }
};

/**
 * 尿記録を作成する関数
 * @param {string} userId - ユーザーID
 * @param {Date} dateTime - 記録された日時 (Dateオブジェクト)
 * @param {string} remarks - 備考（省略可能）
 * @returns {Promise<Object>} 作成された記録データ
 */
export const createRecord = async (userId, dateTime, remarks = '') => {
    try {
        if (!(dateTime instanceof Date) || isNaN(dateTime)) {
            throw new Error('無効な日時です');
        }

        console.log('Creating record with:', { userId, dateTime, remarks });

        const newRecordRef = await addDoc(recordCollection, {
            userId,
            dateTime, // Date オブジェクトを直接保存（FirestoreはTimestampとして保存）
            remarks,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        const newRecord = await getDoc(newRecordRef);
        console.log('Record created:', newRecord.data());
        return { id: newRecord.id, ...newRecord.data() };
    } catch (error) {
        console.error('Error creating record:', error);
        throw new Error('記録の作成に失敗しました');
    }
};

/**
 * 特定のレコードを削除する関数
 * @param {string} recordId - 削除するレコードのID
 * @returns {Promise<void>}
 */
export const deleteRecord = async (recordId) => {
    try {
        const recordDoc = doc(firestore, 'Record', recordId);
        await deleteDoc(recordDoc);
        console.log(`Record with ID ${recordId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting record with ID ${recordId}:`, error);
        throw new Error('レコードの削除に失敗しました');
    }
};

//仮
export const getRecordById = () => { /* 実装 */ };
export const updateRecord = () => { /* 実装 */ };
