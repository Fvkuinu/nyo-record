// ✅ クライアントコンポーネント
"use client";

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // 日付クリックを有効にするプラグイン

const CalendarComponent = ({ events, onDateClick, selectedDate }) => {
    // カレンダーの日付がクリックされたときのハンドラ
    const handleDateClick = (info) => {
        onDateClick(info.dateStr); // 親コンポーネントに日付を通知
    };

    // イベントの内容をカスタマイズして表示
    const renderEventContent = (eventInfo) => {
        return (
            <div>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i> {/* 件数の表示 */}
            </div>
        );
    };

    return (
        <div className="mb-6 w-full max-w-full">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]} // 使用するプラグイン
                initialView="dayGridMonth"
                events={events} // レコード件数のイベントを表示
                dateClick={handleDateClick} // 日付クリック時のイベント
                eventContent={renderEventContent} // イベントの内容をカスタマイズ
                height="auto"
                contentHeight="auto"
                aspectRatio={1.5}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'today,dayGridMonth,dayGridWeek'
                }}
                locale="ja" // カレンダーを日本語に設定
            />
        </div>
    );
};

export default CalendarComponent;
