import React, { useState, useEffect } from 'react';
import { useFilters } from '../../context/FilterContext';
import { fetchAggregatedData, fetchStats } from '../../services/api';
import StatsCards from '../StatsCards';
import IntensityChart from '../charts/IntensityChart';
import LikelihoodChart from '../charts/LikelihoodChart';
import RelevanceChart from '../charts/RelevanceChart';
import YearChart from '../charts/YearChart';
import CountryChart from '../charts/CountryChart';
import TopicsChart from '../charts/TopicsChart';
import RegionChart from '../charts/RegionChart';
import SectorChart from '../charts/SectorChart';
import PESTLEChart from '../charts/PESTLEChart';
import ScatterChart from '../charts/ScatterChart';

const Dashboard = () => {
  const { filters, searchQuery } = useFilters(); // ✅ ADDED
  const [aggregatedData, setAggregatedData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [aggData, statsData] = await Promise.all([
          fetchAggregatedData(filters, searchQuery), 
          fetchStats(filters, searchQuery)           
        ]);
        setAggregatedData(aggData);
        setStats(statsData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [filters, searchQuery]); 

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <IntensityChart data={aggregatedData?.intensity_by_sector} />
        <LikelihoodChart data={aggregatedData?.likelihood_by_region} />
        <RelevanceChart data={aggregatedData?.relevance_by_topic} />
        <YearChart data={aggregatedData?.year_distribution} />
        <CountryChart data={aggregatedData?.country_distribution} />
        <TopicsChart data={aggregatedData?.topic_distribution} />
        <RegionChart data={aggregatedData?.region_distribution} />
        <SectorChart data={aggregatedData?.sector_distribution} />
        <PESTLEChart data={aggregatedData?.pestle_distribution} />
        <ScatterChart filters={filters} />
      </div>
    </div>
  );
};

export default Dashboard;
