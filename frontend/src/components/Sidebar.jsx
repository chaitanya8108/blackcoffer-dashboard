import React, { useState } from 'react';
import { useFilters } from '../context/FilterContext';
import { useTheme } from '../context/ThemeContext';
import { useEffect } from 'react';

import { 
  FiHome, FiPieChart, FiTrendingUp, FiDatabase, FiFileText, FiSettings,
  FiFilter, FiRefreshCw, FiChevronDown, FiChevronRight, FiX, FiGlobe,
  FiBarChart2, FiGrid, FiLayers, FiMap, FiActivity
} from 'react-icons/fi';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const { filters, filterOptions, updateFilter, resetFilters, loading, activeFiltersCount } = useFilters();
  const { sidebarOpen, closeSidebar } = useTheme();
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, badge: null },
    { id: 'analytics', label: 'Analytics', icon: FiPieChart, badge: 'Pro' },
    { id: 'data', label: 'Data Table', icon: FiDatabase, badge: null },
    { id: 'reports', label: 'Reports', icon: FiFileText, badge: '3' },
    { id: 'settings', label: 'Settings', icon: FiSettings, badge: null },
  ];

  const quickStats = [
    { label: 'Intensity', icon: FiActivity, color: 'text-blue-400' },
    { label: 'Likelihood', icon: FiTrendingUp, color: 'text-green-400' },
    { label: 'Relevance', icon: FiBarChart2, color: 'text-purple-400' },
  ];

  const filterConfig = [
    { key: 'end_year', label: 'End Year', options: 'end_years', icon: FiGrid },
    { key: 'topic', label: 'Topic', options: 'topics', icon: FiLayers },
    { key: 'sector', label: 'Sector', options: 'sectors', icon: FiPieChart },
    { key: 'region', label: 'Region', options: 'regions', icon: FiMap },
    { key: 'pestle', label: 'PESTLE', options: 'pestles', icon: FiBarChart2 },
    { key: 'source', label: 'Source', options: 'sources', icon: FiFileText },
    { key: 'swot', label: 'SWOT', options: 'swots', icon: FiActivity },
    { key: 'country', label: 'Country', options: 'countries', icon: FiGlobe },
    { key: 'city', label: 'City', options: 'cities', icon: FiMap },
  ];
  const [isDesktop, setIsDesktop] = useState(false);

useEffect(() => {
  const checkScreen = () => {
    setIsDesktop(window.innerWidth >= 1280); // xl breakpoint
  };

  checkScreen();
  window.addEventListener('resize', checkScreen);
  return () => window.removeEventListener('resize', checkScreen);
}, []);


  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
    closeSidebar();
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside
  className="sidebar fixed left-0 top-0 h-screen w-64 bg-dark-100 border-r border-gray-800
             flex flex-col z-[60] transition-transform duration-300"
  style={{
    transform: isDesktop
      ? 'translateX(0)'                 // ✅ Laptop/Desktop ALWAYS visible
      : sidebarOpen
      ? 'translateX(0)'                 // ✅ Mobile open
      : 'translateX(-100%)'             // ❌ Mobile closed
  }}
>


      {/* Logo Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 
                        flex items-center justify-center shadow-lg shadow-blue-500/25">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <div>
            <h1 className="text-lg font-bold gradient-text">Blackcoffer</h1>
            <p className="text-gray-500 text-xs">Analytics v2.0</p>
          </div>
        </div>
        <button
          onClick={closeSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-dark-200 transition-colors"
        >
          <FiX className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="p-3 border-b border-gray-800">
        <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Menu</p>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handlePageChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200
                          ${currentPage === item.id 
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30' 
                            : 'text-gray-400 hover:text-white hover:bg-dark-200'}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${currentPage === item.id ? 'text-blue-400' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                                  ${item.badge === 'Pro' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                                    : 'bg-blue-500/20 text-blue-400'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Quick Stats */}
      <div className="p-3 border-b border-gray-800">
        <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Quick View</p>
        <div className="grid grid-cols-3 gap-2">
          {quickStats.map((stat, idx) => (
            <button
              key={idx}
              className="flex flex-col items-center p-2 rounded-lg hover:bg-dark-200 transition-colors group"
            >
              <stat.icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
              <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <button
            onClick={() => setFiltersExpanded(!filtersExpanded)}
            className="w-full flex items-center justify-between px-3 py-2 text-gray-500 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <FiFilter className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            {filtersExpanded ? <FiChevronDown className="w-4 h-4" /> : <FiChevronRight className="w-4 h-4" />}
          </button>

          {filtersExpanded && (
            <div className="mt-2 space-y-2 animate-fade-in">
              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 
                         text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 
                         rounded-lg transition-colors"
              >
                <FiRefreshCw className="w-4 h-4" />
                Reset All Filters
              </button>

              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="spinner w-6 h-6"></div>
                </div>
              ) : (
                <div className="space-y-2">
                  {filterConfig.map((filter) => (
                    <div key={filter.key} className="px-1">
                      <label className="flex items-center gap-2 text-gray-400 text-xs mb-1.5 px-2">
                        <filter.icon className="w-3 h-3" />
                        {filter.label}
                      </label>
                      <select
                        value={filters[filter.key]}
                        onChange={(e) => updateFilter(filter.key, e.target.value)}
                        className="select-dark text-xs"
                      >
                        <option value="">All {filter.label}s</option>
                        {filterOptions[filter.options]?.slice(0, 50).map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-gray-500">System Online</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
