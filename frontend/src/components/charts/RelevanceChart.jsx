import React from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Radar } from 'react-chartjs-2';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const RelevanceChart = ({ data }) => {
  if (!data || !Object.keys(data).length) return <div className="text-gray-500 text-center py-8">No data available</div>;
  const labels = Object.keys(data).slice(0, 8);
  const chartData = {
    labels,
    datasets: [{ label: 'Relevance', data: labels.map(k => data[k]), backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 1)', borderWidth: 2, pointBackgroundColor: 'rgba(16, 185, 129, 1)' }]
  };
  const options = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { r: { grid: { color: 'rgba(255,255,255,0.1)' }, pointLabels: { color: '#9ca3af', font: { size: 9 } }, ticks: { color: '#9ca3af', backdropColor: 'transparent', font: { size: 8 } } } }
  };
  return <div className="h-64 md:h-72"><Radar data={chartData} options={options} /></div>;
};
export default RelevanceChart;
