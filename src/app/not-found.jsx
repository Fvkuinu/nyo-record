'use client'

/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { css } from '@emotion/react';

const Error404Page = () => {
    const [catImage, setCatImage] = useState(null);

    // 猫の画像をランダムに取得する関数
    const fetchCatImage = async () => {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search');
            setCatImage(response.data[0].url);
        } catch (error) {
            console.error("猫の画像が取得できませんでした。", error);
        }
    };

    // 初回マウント時に画像を取得
    useEffect(() => {
        fetchCatImage();
    }, []);

    // スタイリング (emotion)
    const containerStyle = css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: 100vh;
        background-color: #ffffff00;
        color: white;
        font-family: 'Arial', sans-serif;
        text-align: center;
    `;

    const textStyle = css`
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 20px;
    `;

    const catImageStyle = css`
        width: 300px;
        height: 300px;
        object-fit: cover;
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        margin-bottom: 20px;
    `;

    const buttonStyle = css`
        background-color: #3b82f6;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        &:hover {
            background-color: #2563eb;
        }
    `;

    // アニメーションの設定
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <div css={containerStyle}>
            <div css={textStyle}>404 - Page Not Found</div>
            {/* 猫の画像を表示 */}
            {catImage && (
                <motion.img
                    src={catImage}
                    alt="Random Cat"
                    css={catImageStyle}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                    transition={{ duration: 0.5 }}
                />
            )}
        </div>
    );
};

export default Error404Page;
