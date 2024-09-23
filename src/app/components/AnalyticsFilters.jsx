// src/app/components/AnalyticsFilters.jsx
import React from 'react';
import Dropdown from '@/app/ui/Dropdown';
import Input from '@/app/ui/InputField';

const AnalyticsFilters = ({ filterType, setFilterType, selectedDate, setSelectedDate, chartType, setChartType }) => {
    return (
        <div className="mb-4 space-y-4">
            {/* 時間範囲セレクター */}
            <div>
                <label className="block mb-1">時間範囲</label>
                <Dropdown
                    options={['日', '週', '月', '年']}
                    selected={filterType}
                    onChange={setFilterType}
                />
            </div>

            {/* 日付セレクター */}
            <div>
                <label className="block mb-1">日付を選択</label>
                <Input
                    name="selectedDate"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>

            {/* グラフタイプセレクター */}
            <div>
                <label className="block mb-1">グラフの種類</label>
                <Dropdown
                    options={['棒グラフ', '折れ線グラフ']}
                    selected={chartType}
                    onChange={setChartType}
                />
            </div>
        </div>
    );
};

export default AnalyticsFilters;
