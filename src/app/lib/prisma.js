/**
 * Prisma Clientをインポートします。
 */
import { PrismaClient } from "@prisma/client";

let prisma;

/**
 * 環境に応じてPrismaClientのインスタンスを作成します。
 * 本番環境では新しいインスタンスを作成し、それ以外の環境ではグローバルなインスタンスを再利用します。
 */
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;