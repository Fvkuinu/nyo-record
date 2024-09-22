'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import RoundedButton from '@/app/ui/RoundedButton';

const HomePage = () => {
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchPexelsVideo = async () => {
            const queries = [
                "people", "nature", "city", "food", "animals", "technology",
                "travel", "sports", "fashion", "architecture", "music", "art",
                "sunset", "mountains", "ocean", "cars", "friends", "work",
                "beauty", "health", "education", "hobbies", "festivals",
                "space", "vintage", "lifestyle", "meditation", "adventure",
                "family", "pets", "landscapes", "culture", "historical",
                "nightlife", "street", "urban", "emotions", "inspiration",
                "self-care", "wellness", "skills", "fun", "celebrations",
                "community", "outdoors", "workout", "relaxation", "interiors"
            ];

            const randomQuery = queries[Math.floor(Math.random() * queries.length)];

            const response = await fetch(`https://api.pexels.com/videos/search?query=${randomQuery}`, {
                headers: {
                    Authorization: 'XZgiUlVl9Et8sWoy57hKH0BRCJcTD3u3E0NYP75BL8tXyXZ21oWBGST9' // Pexels API Key
                }
            });
            const data = await response.json();
            setVideoUrl(data.videos[0].video_files[0].link);
        };

        fetchPexelsVideo();
    }, []);

    return (
        <div className="relative w-full h-screen">
            {/* 動画背景 */}
            <video
                autoPlay
                muted
                loop
                playsinline
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={videoUrl}
            >
                Your browser does not support the video tag.
            </video>

            {/* オーバーレイ */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

            {/* 中央コンテンツ */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                <h1 className="text-4xl font-bold mb-4 mx-2">画期的な記録を実現</h1>
                <p className="text-lg mb-8 mx-2">
                    スマートなデータ管理と革新的な方法で、あなたの記録を未来へ導きます。
                </p>

                {/* ボタン */}
                <div className="flex space-x-4">
                    <Link href="/dashboard">
                        <RoundedButton className="bg-white text-black hover:bg-gray-200">
                            Try
                        </RoundedButton>
                    </Link>

                    <Link href="/login">
                        <RoundedButton className="bg-black text-white hover:bg-gray-800">
                            Log in
                        </RoundedButton>
                    </Link>
                </div>
            </div>

            {/* Pexelsロゴ */}
            <div className="absolute bottom-4 right-4">
                <Link href="https://www.pexels.com">
                    <img src="https://images.pexels.com/lib/api/pexels-white.png" alt="写真提供：Pexels" className="h-12" />
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
