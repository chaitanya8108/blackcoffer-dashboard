import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const YearChart = ({ data }) => {
  if (!data || !Object.keys(data).length) return <div className="text-gray-500 text-center py-8">No data available</div>;
  const sorted = Object.entries(data).sort((a, b) => a[0] - b[0]);
  const chartData = {
    labels: sorted.map(([y]) => y),
    datasets: [{ label: 'Count', data: sorted.map(([, c]) => c), backgroundColor: 'rgba(245, 158, 11, 0.8)', borderRadius: 6 }]
  };
  const options = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', font: { size: 10 } } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', font: { size: 10 } } } }
  };
  return <div className="h-64 md:h-72"><Bar data={chartData} options={options} /></div>;
};
export default YearChart;
