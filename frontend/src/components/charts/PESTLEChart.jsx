import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const PESTLEChart = ({ data }) => {
  if (!data || !Object.keys(data).length) return <div className="text-gray-500 text-center py-8">No data available</div>;
  const pestleColors = { Political: 'rgba(239,68,68,0.8)', Economic: 'rgba(59,130,246,0.8)', Social: 'rgba(16,185,129,0.8)', Technological: 'rgba(139,92,246,0.8)', Legal: 'rgba(245,158,11,0.8)', Environmental: 'rgba(6,182,212,0.8)' };
  const chartData = { labels: Object.keys(data), datasets: [{ data: Object.values(data), backgroundColor: Object.keys(data).map(k => pestleColors[k] || 'rgba(156,163,175,0.8)'), borderRadius: 8, barThickness: 40 }] };
  const options = {
    responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { weight: 'bold', size: 11 } } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } } }
  };
  return <div className="h-72 md:h-80"><Bar data={chartData} options={options} /></div>;
};
export default PESTLEChart;
