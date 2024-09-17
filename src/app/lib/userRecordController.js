// ✅Server Actions
"use server";

import prisma from '@/app/lib/prisma'; // PrismaClientのインポート

/**
 * ユーザーを作成する関数
 * @param {string} username - ユーザー名
 * @param {string} password - 暗号化されたパスワード
 * @returns 作成されたユーザーデータ
 */
export async function createUser(username, password) {
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
export async function updateUser(userId, username, password) {
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
export async function deleteUser(userId) {
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
export async function getUserById(userId) {
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
export async function getUserByUsername(username) {
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
