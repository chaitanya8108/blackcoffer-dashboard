import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const IntensityChart = ({ data }) => {
  if (!data || !Object.keys(data).length) return <div className="text-gray-500 text-center py-8">No data available</div>;
  const chartData = {
    labels: Object.keys(data),
    datasets: [{ label: 'Avg Intensity', data: Object.values(data), backgroundColor: 'rgba(59, 130, 246, 0.8)', borderRadius: 6, maxBarThickness: 50 }]
  };
  const options = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.95)', padding: 12, cornerRadius: 8 } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', maxRotation: 45, minRotation: 45, font: { size: 10 } } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', font: { size: 10 } } }
    }
  };
  return <div className="h-64 md:h-72"><Bar data={chartData} options={options} /></div>;
};
export default IntensityChart;
