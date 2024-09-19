'use client'

import React, { useState } from 'react';
import InputField from '@/app/ui/InputField'; // 以前作成した InputField

const App = () => {
    const [textInput, setTextInput] = useState('');
    const [textAreaInput, setTextAreaInput] = useState('');

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value);
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaInput(e.target.value);
    };

    return (
        <div className="p-6">
            <InputField
                label="テキスト入力"
                value={textInput}
                onChange={handleTextChange}
            />
            <InputField
                label="テキストエリア"
                value={textAreaInput}
                onChange={handleTextAreaChange}
                isTextarea={true} // textareaを使用
            />
        </div>
    );
};

export default App;



