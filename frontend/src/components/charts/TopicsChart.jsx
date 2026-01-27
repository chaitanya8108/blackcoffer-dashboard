import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const TopicsChart = ({ data }) => {
  if (!data || !Object.keys(data).length) return <div className="text-gray-500 text-center py-8">No data available</div>;
  const colors = ['rgba(59,130,246,0.8)','rgba(139,92,246,0.8)','rgba(16,185,129,0.8)','rgba(245,158,11,0.8)','rgba(239,68,68,0.8)','rgba(6,182,212,0.8)','rgba(236,72,153,0.8)','rgba(132,204,22,0.8)','rgba(251,146,60,0.8)','rgba(167,139,250,0.8)'];
  const chartData = { labels: Object.keys(data), datasets: [{ data: Object.values(data), backgroundColor: colors, borderWidth: 0 }] };
  const options = {
    responsive: true, maintainAspectRatio: false, cutout: '65%',
    plugins: { legend: { position: 'right', labels: { color: '#9ca3af', padding: 8, font: { size: 10 }, boxWidth: 12 } } }
  };
  return <div className="h-64 md:h-72"><Doughnut data={chartData} options={options} /></div>;
};
export default TopicsChart;
