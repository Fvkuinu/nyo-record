// ✅ クライアントコンポーネント
"use client";

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getJapaneseHolidays } from '@/app/lib/holidayApi'; // 祝日取得APIをインポート

const CalendarComponent = ({ events, onDateClick, selectedDate }) => {
    const [currentSelectedDate, setCurrentSelectedDate] = useState(null);
    const [holidays, setHolidays] = useState({}); // 日本の祝日を保存する状態

    // 日本の祝日を取得する
    useEffect(() => {
        const fetchHolidays = async () => {
            const holidayData = await getJapaneseHolidays();
            setHolidays(holidayData);
        };
        fetchHolidays();
    }, []);

    // カレンダーの日付がクリックされたときのハンドラ
    const handleDateClick = (dateStr) => {
        // 以前に選択されていた日付の背景色をリセット
        if (currentSelectedDate) {
            const prevSelectedCell = document.querySelector(`td[data-date='${currentSelectedDate}']`);
            if (prevSelectedCell) {
                prevSelectedCell.classList.remove('bg-blue-200', 'text-white');
            }
        }

        // 新しく選択された日付の背景色を変更
        const selectedCell = document.querySelector(`td[data-date='${dateStr}']`);
        if (selectedCell) {
            selectedCell.classList.add('bg-blue-200', 'text-black');
        }

        setCurrentSelectedDate(dateStr);
        onDateClick(dateStr);
    };

    // イベントがクリックされたときのハンドラ
    const handleEventClick = (info) => {
        const eventDateStr = info.event.startStr; // イベントの日付を取得
        handleDateClick(eventDateStr); // クリックされたイベントの日付でhandleDateClickを発火
    };

    // 日付の表示をカスタマイズ（数字のみ表示）
    const renderDayCellContent = (dayCellInfo) => {
        const date = dayCellInfo.date;
        const dayOfWeek = date.getDay();
        // 日本のタイムゾーンに基づいた日付 (YYYY-MM-DD 形式) を取得
        const dateStr = date.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');

        // 土曜日は青、日曜日と祝日は赤
        let textColor = 'text-black'; // デフォルトは黒

        if (dayOfWeek === 0 || (holidays && holidays[dateStr])) {
            textColor = 'text-red-500'; // 日曜日と祝日は赤
        } else if (dayOfWeek === 6) {
            textColor = 'text-blue-500'; // 土曜日は青
        }

        return (
            <div className={`${textColor}`}>
                {date.getDate()}
            </div>
        );
    };

    useEffect(() => {
        // ページ初期読み込み時に選択した日付がある場合、その背景色を変更する
        if (selectedDate) {
            const selectedCell = document.querySelector(`td[data-date='${selectedDate}']`);
            if (selectedCell) {
                selectedCell.classList.add('bg-blue-200', 'text-black');
            }
        }
    }, [selectedDate]);

    return (
        <div className="mb-6 w-full max-w-full">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={(info) => handleDateClick(info.dateStr)}
                eventClick={handleEventClick} // イベントクリック時のハンドラ
                dayCellContent={renderDayCellContent} // 日付の表示をカスタマイズ
                height="auto"
                contentHeight="auto"
                aspectRatio={window.innerWidth < 640 ? 1 : 1.5} // レスポンシブ対応
                headerToolbar={{
                    start: 'title', // will normally be on the left. if RTL, will be on the right
                    center: '',
                    end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
                }}
                locale="ja"
                // Tailwindのレスポンシブクラスを使用して、ツールバーをレスポンシブに
                customButtons={{
                    title: {
                        classNames: 'sm:text-sm md:text-lg lg:text-xl font-bold text-center'
                    }
                }}
                // ツールバーのレスポンシブスタイル
                className="text-sm sm:text-base md:text-lg lg:text-xl flex flex-wrap justify-between items-center"
            />
        </div>
    );
};

export default CalendarComponent;
