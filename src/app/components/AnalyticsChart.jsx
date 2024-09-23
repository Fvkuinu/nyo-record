// src/app/components/AnalyticsChart.jsx
import { Bar, Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement, LineElement, PointElement, Tooltip, Legend, Title } from 'chart.js';

// 必要な要素を登録
Chart.register(
    LinearScale,
    CategoryScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title
);

const AnalyticsChart = ({ chartData, chartType, isLoading, error, options }) => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading chart data: {error.message}</p>;

    return (
        <div className="chart-container" style={{ height: '400px' }}>
            {chartType === '棒グラフ' ? (
                <Bar data={chartData} options={options} />
            ) : (
                <Line data={chartData} options={options} />
            )}
        </div>
    );
};

export default AnalyticsChart;
