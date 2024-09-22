// src/app/components/LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useTheme } from 'next-themes';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
    const { theme } = useTheme();
    const textColor = theme === 'dark' ? '#ffffff' : '#000000';

    const chartData = {
        labels: data ? data.labels : [],
        datasets: [
            {
                label: 'Records',
                data: data ? data.values : [],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColor,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColor,
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineChart;
