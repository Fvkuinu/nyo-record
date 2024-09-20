// ✅Server Actions
"use server";

import prisma from '@/app/lib/prisma'; // PrismaClientのインポート

/**
 * 尿記録を作成する関数
 * @param {number} userId - ユーザーID
 * @param {string} dateTime - 記録された日時 (ISO 8601形式)
 * @param {string} remarks - 備考（省略可能）
 * @returns 作成された記録データ
 */
export async function createRecord(userId, dateTime, remarks = '') {
    try {
        const record = await prisma.record.create({
            data: {
                userId: userId,
                dateTime: dateTime,
                remarks: remarks,
            },
        });
        return record;
    } catch (error) {
        console.error("Error creating record: ", error);
        throw error;
    }
}

/**
 * 尿記録を編集する関数
 * @param {number} recordId - 記録のID
 * @param {string} dateTime - 更新された日時
 * @param {string} remarks - 更新された備考（省略可能）
 * @returns 更新された記録データ
 */
export async function updateRecord(recordId, dateTime, remarks = '') {
    try {
        const updatedRecord = await prisma.record.update({
            where: { id: recordId },
            data: {
                dateTime: dateTime,
                remarks: remarks,
                updatedAt: new Date(),
            },
        });
        return updatedRecord;
    } catch (error) {
        console.error("Error updating record: ", error);
        throw error;
    }
}

/**
 * 尿記録を削除する関数
 * @param {number} recordId - 記録のID
 * @returns 削除された記録データ
 */
export async function deleteRecord(recordId) {
    try {
        const deletedRecord = await prisma.record.delete({
            where: { id: recordId },
        });
        return deletedRecord;
    } catch (error) {
        console.error("Error deleting record: ", error);
        throw error;
    }
}

/**
 * 特定のIDに基づいて尿記録を取得する関数
 * @param {number} recordId - 記録のID
 * @returns 取得された記録データ
 */
export async function getRecordById(recordId) {
    try {
        const record = await prisma.record.findUnique({
            where: { id: recordId },
        });
        return record;
    } catch (error) {
        console.error("Error retrieving record: ", error);
        throw error;
    }
}
/**
 * 特定の日付に基づいて尿記録を取得する関数
 * @param {Date} date - 取得したい日付
 * @returns その日の記録データの配列
 */
export async function getRecordsByDate(date) {
    try {
        // dateが文字列の場合、まずDateオブジェクトに変換
        const dateObj = new Date(date);

        // 日付の開始と終了を設定
        const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0));
        const endOfDay = new Date(dateObj.setHours(23, 59, 59, 999));

        const records = await prisma.record.findMany({
            where: {
                dateTime: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });
        return records;
    } catch (error) {
        console.error("Error retrieving records for date:", error);
        throw error;
    }
}


