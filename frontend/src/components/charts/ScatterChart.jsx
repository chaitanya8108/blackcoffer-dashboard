import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { fetchIntensityLikelihoodRelevance } from '../../services/api';
ChartJS.register(LinearScale, PointElement, Tooltip);

const ScatterChart = ({ filters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try { setData(await fetchIntensityLikelihoodRelevance(filters)); }
      catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [filters]);

  if (loading) return <div className="flex items-center justify-center h-72"><div className="spinner w-8 h-8"></div></div>;
  if (!data.length) return <div className="text-gray-500 text-center py-8">No data available</div>;

  const chartData = { datasets: [{ label: 'Data Points', data: data.map(d => ({ x: d.intensity, y: d.likelihood, r: Math.max(d.relevance * 1.5, 4) })), backgroundColor: 'rgba(59,130,246,0.5)', borderColor: 'rgba(59,130,246,1)', borderWidth: 1 }] };
  const options = {
    responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false },
      tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.95)', padding: 12, cornerRadius: 8, callbacks: { label: (ctx) => { const p = data[ctx.dataIndex]; return [`Intensity: ${p.intensity}`, `Likelihood: ${p.likelihood}`, `Relevance: ${p.relevance}`, `Topic: ${p.topic}`]; } } }
    },
    scales: {
      x: { title: { display: true, text: 'Intensity', color: '#9ca3af', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } },
      y: { title: { display: true, text: 'Likelihood', color: '#9ca3af', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } }
    }
  };
  return <div className="h-72 md:h-80"><Bubble data={chartData} options={options} /></div>;
};
export default ScatterChart;
