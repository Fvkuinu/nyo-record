import React from 'react';
import prisma from "@/app/lib/prisma";
import NyoList from './(components)/NyoList'; // NyoListコンポーネントをインポート

// ✅このページをSSRにする
export const dynamic = 'force-dynamic'

const ListPage = async () => {
  // ✅投稿データのリスト
  const records = await prisma.record.findMany();
  return (
    <div>
      <h1>尿記録のリスト</h1>
      <NyoList records = {records}/> {/* 尿記録のリストを表示 */}
    </div>
  );
};

export default ListPage; 
