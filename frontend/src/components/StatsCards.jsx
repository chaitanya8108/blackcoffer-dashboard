import React from 'react';
import { FiActivity, FiTarget, FiTrendingUp, FiDatabase, FiGlobe, FiLayers, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const StatsCards = ({ stats }) => {
  const cards = [
    { title: 'Total Records', value: stats?.total_records || 0, icon: FiDatabase, color: 'from-blue-500 to-cyan-500', change: '+12%', up: true },
    { title: 'Avg Intensity', value: stats?.avg_intensity || 0, icon: FiActivity, color: 'from-purple-500 to-pink-500', change: '+5%', up: true },
    { title: 'Avg Likelihood', value: stats?.avg_likelihood || 0, icon: FiTrendingUp, color: 'from-green-500 to-emerald-500', change: '-2%', up: false },
    { title: 'Avg Relevance', value: stats?.avg_relevance || 0, icon: FiTarget, color: 'from-orange-500 to-red-500', change: '+8%', up: true },
    { title: 'Countries', value: stats?.unique_countries || 0, icon: FiGlobe, color: 'from-indigo-500 to-purple-500', change: '+3%', up: true },
    { title: 'Sectors', value: stats?.unique_sectors || 0, icon: FiLayers, color: 'from-teal-500 to-green-500', change: '0%', up: true },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
      {cards.map((card, i) => (
        <div 
          key={i} 
          className="glass-effect rounded-xl p-4 card-hover animate-slide-up" 
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${card.color} shadow-lg`}>
              <card.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-xs ${card.up ? 'text-green-400' : 'text-red-400'}`}>
              {card.up ? <FiArrowUp className="w-3 h-3" /> : <FiArrowDown className="w-3 h-3" />}
              {card.change}
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white">
            {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
          </h3>
          <p className="text-gray-400 text-xs md:text-sm mt-1 truncate">{card.title}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
