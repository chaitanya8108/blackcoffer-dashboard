import React, { useState, useEffect } from 'react';
import { useFilters } from '../../context/FilterContext';
import { fetchAggregatedData, fetchStats } from '../../services/api';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';
import SWOTChart from '../charts/SWOTChart';
import SourceChart from '../charts/SourceChart';

const Analytics = () => {
  const { filters } = useFilters();
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [aggData, statsData] = await Promise.all([
          fetchAggregatedData(filters),
          fetchStats(filters)
        ]);
        setData(aggData);
        setStats(statsData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [filters]);

  const metrics = [
    { label: 'Avg Intensity', value: stats?.avg_intensity || 0, max: stats?.max_intensity || 0, color: 'blue', trend: 'up' },
    { label: 'Avg Likelihood', value: stats?.avg_likelihood || 0, max: stats?.max_likelihood || 0, color: 'green', trend: 'up' },
    { label: 'Avg Relevance', value: stats?.avg_relevance || 0, max: stats?.max_relevance || 0, color: 'purple', trend: 'down' },
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <FiTrendingUp className="text-green-400" />;
    if (trend === 'down') return <FiTrendingDown className="text-red-400" />;
    return <FiMinus className="text-gray-400" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="spinner w-12 h-12"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400 mt-1">Deep dive into your data metrics</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="glass-effect rounded-xl p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">{metric.label}</span>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white">{metric.value}</span>
              <span className="text-gray-500 text-sm mb-1">/ {metric.max} max</span>
            </div>
            <div className="mt-4 h-2 bg-dark-200 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-${metric.color}-500 rounded-full transition-all duration-1000`}
                style={{ width: `${(metric.value / metric.max) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="chart-container card-hover">
          <h3 className="text-white text-lg font-semibold mb-4">SWOT Analysis</h3>
          <SWOTChart data={data?.swot_distribution} />
        </div>
        <div className="chart-container card-hover">
          <h3 className="text-white text-lg font-semibold mb-4">Top Sources</h3>
          <SourceChart data={data?.source_distribution} />
        </div>
      </div>

      {/* Insights Summary */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-200 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Total Records</p>
            <p className="text-2xl font-bold text-white mt-1">{stats?.total_records?.toLocaleString()}</p>
          </div>
          <div className="bg-dark-200 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Unique Topics</p>
            <p className="text-2xl font-bold text-white mt-1">{stats?.unique_topics}</p>
          </div>
          <div className="bg-dark-200 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Countries Covered</p>
            <p className="text-2xl font-bold text-white mt-1">{stats?.unique_countries}</p>
          </div>
          <div className="bg-dark-200 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Data Sources</p>
            <p className="text-2xl font-bold text-white mt-1">{stats?.unique_sources}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
