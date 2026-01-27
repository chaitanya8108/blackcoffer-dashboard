import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchFilters } from '../services/api';

const FilterContext = createContext();

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilters must be used within FilterProvider');
  return context;
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    end_year: '', topic: '', sector: '', region: '', pestle: '', source: '', swot: '', country: '', city: ''
  });

  const [searchQuery, setSearchQuery] = useState(''); // ✅ ADDED

  const [filterOptions, setFilterOptions] = useState({
    end_years: [], topics: [], sectors: [], regions: [], pestles: [], sources: [], swots: [], countries: [], cities: []
  });
  const [loading, setLoading] = useState(true);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const options = await fetchFilters();
        setFilterOptions(options);
      } catch (error) {
        console.error('Failed to load filters:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFilters();
  }, []);

  useEffect(() => {
    const count =
      Object.values(filters).filter(v => v && v !== '').length +
      (searchQuery ? 1 : 0); // ✅ ADDED
    setActiveFiltersCount(count);
  }, [filters, searchQuery]);

  const updateFilter = (key, value) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const resetFilters = () => {
    setFilters({
      end_year: '', topic: '', sector: '', region: '', pestle: '', source: '', swot: '', country: '', city: ''
    });
    setSearchQuery(''); // ✅ ADDED
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        searchQuery,      // ✅ ADDED
        setSearchQuery,   // ✅ ADDED
        filterOptions,
        loading,
        updateFilter,
        resetFilters,
        activeFiltersCount
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
