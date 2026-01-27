import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const RegionChart = ({ data }) => {
  if (!data || !Object.keys(data).length) return <div className="text-gray-500 text-center py-8">No data available</div>;
  const colors = ['rgba(59,130,246,0.8)','rgba(139,92,246,0.8)','rgba(16,185,129,0.8)','rgba(245,158,11,0.8)','rgba(239,68,68,0.8)','rgba(6,182,212,0.8)','rgba(236,72,153,0.8)','rgba(132,204,22,0.8)'];
  const chartData = { labels: Object.keys(data), datasets: [{ data: Object.values(data), backgroundColor: colors, borderColor: 'rgba(15,23,42,1)', borderWidth: 2 }] };
  const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#9ca3af', padding: 8, font: { size: 10 }, boxWidth: 12 } } } };
  return <div className="h-64 md:h-72"><Pie data={chartData} options={options} /></div>;
};
export default RegionChart;
