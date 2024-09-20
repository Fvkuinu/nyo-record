

import React from 'react';
import dynamic from 'next/dynamic';


const UiPage = ({params}) => {
    const { ui } = params.ui; // URLからパラメータを取得

    const Component = ui && components[ui as string] ? components[ui as string] : null;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">{ui ? ui : 'コンポーネントを選択してください'}</h1>
            {Component ? (
                <Component />
            ) : (
                <p>無効なコンポーネントです。URLを確認してください。</p>
            )}
        </div>
    );
};
export default UiPage;