// src/pages/AnalyticsPage.jsx
'use client';

import React, { useState } from 'react';
import useRecords from '@/app/hooks/useRecords';
import AnalyticsChart from '@/app/components/AnalyticsChart'; // グラフコンポーネント
import AnalyticsFilters from '@/app/components/AnalyticsFilters'; // フィルタコンポーネント
import { useTheme } from 'next-themes'; // テーマ取得用
import { getAuth } from 'firebase/auth';

const AnalyticsPage = () => {
    const { theme } = useTheme(); // ダークモード対応
    const auth = getAuth();
    const user = auth.currentUser;

    const [filterType, setFilterType] = useState('日');
    const [selectedDate, setSelectedDate] = useState(null);
    const [chartType, setChartType] = useState('棒グラフ');

    const { records, isLoading, error } = useRecords(user?.uid, filterType, selectedDate);

    // 日ごとのデータをフォーマット
    const formatDataForDay = (records) => {
        const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
        const data = Array(24).fill(0);

        records.forEach(record => {
            const hour = record.dateTime.toDate().getHours();
            data[hour]++;
        });

        return {
            labels: hours,
            datasets: [{
                label: '1時間あたりの回数',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }],
            maxValue: Math.max(...data),
        };
    };

    // 週ごとのデータをフォーマット
    // 週ごとのデータをフォーマット (週の始まりを月曜日に設定)
    const formatDataForWeek = (records) => {
        const daysOfWeek = ['月', '火', '水', '木', '金', '土', '日'];
        const data = Array(7).fill(0);

        records.forEach(record => {
            let day = record.dateTime.toDate().getDay(); // 0:日曜日, 1:月曜日,...6:土曜日
            day = day === 0 ? 6 : day - 1; // 日曜日を最後に持ってくる (0を6にし、それ以外は1つ減らす)
            data[day]++;
        });

        return {
            labels: daysOfWeek,
            datasets: [{
                label: '1日あたりの回数',
                data,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }],
            maxValue: Math.max(...data),
        };
    };


    // 月ごとのデータをフォーマット
    const formatDataForMonth = (records) => {
        const daysInMonth = new Date(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth() + 1, 0).getDate();
        const days = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
        const data = Array(daysInMonth).fill(0);

        records.forEach(record => {
            const day = record.dateTime.toDate().getDate();
            data[day - 1]++;
        });

        return {
            labels: days,
            datasets: [{
                label: '1日あたりの回数',
                data,
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }],
            maxValue: Math.max(...data),
        };
    };

    // 年ごとのデータをフォーマット
    const formatDataForYear = (records) => {
        const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        ;
        const data = Array(12).fill(0);

        records.forEach(record => {
            const month = record.dateTime.toDate().getMonth();
            data[month]++;
        });

        return {
            labels: months,
            datasets: [{
                label: 'ひと月あたりの回数',
                data,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }],
            maxValue: Math.max(...data),
        };
    };

    const formatChartData = () => {
        switch (filterType) {
            case '日': return formatDataForDay(records);
            case '週': return formatDataForWeek(records);
            case '月': return formatDataForMonth(records);
            case '年': return formatDataForYear(records);
            default: return { labels: [], datasets: [] };
        }
    };

    const chartData = formatChartData();

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: theme === 'dark' ? '#fff' : '#000' } },
            title: { display: true, text: '分析結果', color: theme === 'dark' ? '#fff' : '#000' },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: chartData.maxValue ? Math.ceil(chartData.maxValue * 1.25) : 6,
                ticks: { color: theme === 'dark' ? '#fff' : '#000', stepSize: 1 },
                title: { display: true, text: '回数', color: theme === 'dark' ? '#fff' : '#000' },
            },
            x: {
                ticks: { color: theme === 'dark' ? '#fff' : '#000' },
                title: { display: true, text: '時間', color: theme === 'dark' ? '#fff' : '#000' },
            },
        },
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">分析</h2>
            <AnalyticsFilters
                filterType={filterType}
                setFilterType={setFilterType}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                chartType={chartType}
                setChartType={setChartType}
            />
            <AnalyticsChart
                chartData={chartData}
                chartType={chartType}
                isLoading={isLoading}
                error={error}
                options={options}
            />
        </div>
    );
};

export default AnalyticsPage;
