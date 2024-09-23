import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useTheme } from 'next-themes';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HourChart = ({ records }) => {
    const { theme } = useTheme(); // Get current theme (light or dark)

    // Create an array to hold the count of records for each hour (0-24)
    const hoursCount = Array(24).fill(0);

    // Iterate over the records and count how many records occurred in each hour
    records.forEach((record) => {
        let dateObj;
        if (record.dateTime && typeof record.dateTime.toDate === 'function') {
            dateObj = record.dateTime.toDate();
        } else if (record.dateTime instanceof Date) {
            dateObj = record.dateTime;
        } else {
            dateObj = new Date(record.dateTime);
        }

        if (!isNaN(dateObj.getTime())) {
            const hour = dateObj.getHours();
            hoursCount[hour] += 1;
        }
    });

    // Get the maximum value from hoursCount array and set it to 8/10 of the maximum value
    const maxRecords = Math.max(...hoursCount) || 1; // Fallback to 1 if no records
    const yMax = Math.ceil(maxRecords * 1.25); // Set maximum value slightly above 100% (1.25 times the max)

    // Colors depending on the theme
    const backgroundColor = theme === 'dark' ? 'rgba(255, 99, 132, 0.7)' : 'rgba(75, 192, 192,0.7)';
    const borderColor = theme === 'dark' ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)';
    const textColor = theme === 'dark' ? '#ffffff' : '#000000'; // Text color for dark mode

    // Chart.js data and options
    const data = {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Create labels for each hour (0-23)
        datasets: [
            {
                label: '回数',
                data: hoursCount,
                backgroundColor,
                borderColor,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow the chart to be resized
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: textColor, // Set text color based on theme
                },
            },
            title: {
                display: true,
                text: '1時間あたりの回数',
                color: textColor, // Set title color based on theme
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '時間',
                    color: textColor, // Set x-axis title color based on theme
                },
                ticks: {
                    color: textColor, // Set x-axis labels color based on theme
                },
            },
            y: {
                title: {
                    display: true,
                    text: '回数',
                    color: textColor, // Set y-axis title color based on theme
                },
                beginAtZero: true,
                max: yMax, // Set the maximum value of the y-axis dynamically based on records
                ticks: {
                    color: textColor, // Set y-axis labels color based on theme
                    stepSize: 1, // Ensure step size is 1 to display only integers
                    callback: function(value) {
                        if (Number.isInteger(value)) {
                            return value; // Only display integers
                        }
                        return null;
                    },
                },
            },
        },
    };

    return (
        <div className="h-96"> {/* Adjust height of the chart container */ }
            <Bar data={data} options={options} />
        </div>
    );
};

export default HourChart;
