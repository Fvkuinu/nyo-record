// ✅Server Actions
"use server";

import prisma from '@/app/lib/prisma'; // PrismaClientのインポート

/**
 * ユーザーを作成する関数
 * @param {string} username - ユーザー名
 * @param {string} password - 暗号化されたパスワード
 * @returns 作成されたユーザーデータ
 */
export async function createRecord(data) {
    const username = data.get("username");
    const password = data.get("password");
    try {
        const user = await prisma.user.create({
            data: {
                username: username,
                password: password, // パスワードはアプリケーション側で暗号化してから保存
            },
        });
        return user;
    } catch (error) {
        console.error("Error creating user: ", error);
        throw error;
    }
}

/**
 * ユーザー情報を更新する関数
 * @param {number} userId - ユーザーID
 * @param {string} username - 更新後のユーザー名（省略可能）
 * @param {string} password - 更新後のパスワード（暗号化済み、省略可能）
 * @returns 更新されたユーザーデータ
 */
export async function updateRecord(userId, username, password) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                username: username || undefined,  // ユーザー名があれば更新
                password: password || undefined,  // パスワードがあれば更新
                updatedAt: new Date(),            // 更新日時を保存
            },
        });
        return updatedUser;
    } catch (error) {
        console.error("Error updating user: ", error);
        throw error;
    }
}

/**
 * ユーザーを削除する関数
 * @param {number} userId - ユーザーID
 * @returns 削除されたユーザーデータ
 */
export async function deleteRecord(userId) {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });
        return deletedUser;
    } catch (error) {
        console.error("Error deleting user: ", error);
        throw error;
    }
}

/**
 * 特定のIDに基づいてユーザーを取得する関数
 * @param {number} userId - ユーザーID
 * @returns 取得されたユーザーデータ
 */
export async function getRecordById(userId) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        return user;
    } catch (error) {
        console.error("Error retrieving user: ", error);
        throw error;
    }
}

/**
 * ユーザー名に基づいてユーザーを取得する関数
 * @param {string} username - ユーザー名
 * @returns 取得されたユーザーデータ
 */
export async function getRecordByUsername(username) {
    try {
        const user = await prisma.user.findUnique({
            where: { username: username },
        });
        return user;
    } catch (error) {
        console.error("Error retrieving user by username: ", error);
        throw error;
    }
}
