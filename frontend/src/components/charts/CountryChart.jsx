import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const CountryChart = ({ data }) => {
  if (!data || !Object.keys(data).length) return <div className="text-gray-500 text-center py-8">No data available</div>;
  const colors = ['rgba(59,130,246,0.8)','rgba(139,92,246,0.8)','rgba(16,185,129,0.8)','rgba(245,158,11,0.8)','rgba(239,68,68,0.8)','rgba(6,182,212,0.8)','rgba(236,72,153,0.8)','rgba(132,204,22,0.8)'];
  const chartData = {
    labels: Object.keys(data),
    datasets: [{ data: Object.values(data), backgroundColor: Object.keys(data).map((_, i) => colors[i % colors.length]), borderRadius: 6 }]
  };
  const options = {
    indexAxis: 'y', responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', font: { size: 10 } } }, y: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } } }
  };
  return <div className="h-64 md:h-72"><Bar data={chartData} options={options} /></div>;
};
export default CountryChart;
