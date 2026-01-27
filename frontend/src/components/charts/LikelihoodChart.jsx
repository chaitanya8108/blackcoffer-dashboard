import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const LikelihoodChart = ({ data }) => {
  if (!data || !Object.keys(data).length) return <div className="text-gray-500 text-center py-8">No data available</div>;
  const chartData = {
    labels: Object.keys(data),
    datasets: [{ label: 'Avg Likelihood', data: Object.values(data), fill: true, backgroundColor: 'rgba(139, 92, 246, 0.15)', borderColor: 'rgba(139, 92, 246, 1)', borderWidth: 2, tension: 0.4, pointRadius: 4, pointBackgroundColor: 'rgba(139, 92, 246, 1)' }]
  };
  const options = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.95)', padding: 12, cornerRadius: 8 } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', maxRotation: 45, minRotation: 45, font: { size: 10 } } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', font: { size: 10 } } }
    }
  };
  return <div className="h-64 md:h-72"><Line data={chartData} options={options} /></div>;
};
export default LikelihoodChart;
