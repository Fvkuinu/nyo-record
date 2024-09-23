// src/app/components/AnalyticsFilters.jsx

import React from 'react';
import Dropdown from '@/app/ui/Dropdown';
import Input from '@/app/ui/Input';
import DatePicker from '@/app/ui/DatePicker'; // DatePickerコンポーネントを使用

const AnalyticsFilters = ({
  filterType,
  setFilterType,
  selectedDate,
  setSelectedDate,
  chartType,
  setChartType,
}) => {
  return (
    <div className="mb-4 space-y-4">
      {/* 時間範囲セレクター */}
      <div>
        <Dropdown
          label="時間範囲"
          options={['日', '週', '月', '年']}
          selected={filterType}
          onChange={setFilterType}
        />
      </div>

      {/* 日付セレクター */}
      <div>
        <DatePicker
          label="日付を選択"
          name="selectedDate"
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

      {/* グラフタイプセレクター */}
      <div>
        <Dropdown
          label="グラフの種類"
          options={['棒グラフ', '折れ線グラフ']}
          selected={chartType}
          onChange={setChartType}
        />
      </div>
    </div>
  );
};

export default AnalyticsFilters;
