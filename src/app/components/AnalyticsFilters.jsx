// src/app/components/AnalyticsFilters.jsx
import React from 'react';
import Dropdown from '@/app/ui/Dropdown';
import Input from '@/app/ui/InputField';

const AnalyticsFilters = ({ filterType, setFilterType, selectedDate, setSelectedDate, chartType, setChartType }) => {
    return (
        <div className="mb-4 space-y-4">
            {/* 時間範囲セレクター */}
            <div>
                <label className="block mb-1">Select Time Range:</label>
                <Dropdown
                    options={['day', 'week', 'month', 'year']}
                    selected={filterType}
                    onChange={setFilterType}
                />
            </div>

            {/* 日付セレクター */}
            <div>
                <label className="block mb-1">Select Date:</label>
                <Input
                    name="selectedDate"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>

            {/* グラフタイプセレクター */}
            <div>
                <label className="block mb-1">Chart Type:</label>
                <Dropdown
                    options={['bar', 'line']}
                    selected={chartType}
                    onChange={setChartType}
                />
            </div>
        </div>
    );
};

export default AnalyticsFilters;
