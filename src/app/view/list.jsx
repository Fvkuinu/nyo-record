import React from 'react';
import NyoList from '../(components)/NyoList'; // NyoListコンポーネントをインポート

// ✅このページをSSRにする
export const dynamic = 'force-dynamic'

const ListPage = () => {
    return (
        <div>
            <h1>尿記録のリスト</h1>
            <NyoList /> {/* 尿記録のリストを表示 */}
        </div>
    );
};

export default ListPage; 
