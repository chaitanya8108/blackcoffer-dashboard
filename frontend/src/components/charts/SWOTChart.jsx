import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const SWOTChart = ({ data }) => {
  if (!data || !Object.keys(data).length) return <div className="text-gray-500 text-center py-8">No data available</div>;
  const swotColors = { Strengths: 'rgba(16,185,129,0.8)', Weaknesses: 'rgba(239,68,68,0.8)', Opportunities: 'rgba(59,130,246,0.8)', Threats: 'rgba(245,158,11,0.8)' };
  const chartData = { labels: Object.keys(data), datasets: [{ data: Object.values(data), backgroundColor: Object.keys(data).map(k => swotColors[k] || 'rgba(156,163,175,0.8)'), borderWidth: 0 }] };
  const options = { responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af', padding: 16, font: { size: 11 } } } } };
  return <div className="h-64 md:h-72"><Doughnut data={chartData} options={options} /></div>;
};
export default SWOTChart;
