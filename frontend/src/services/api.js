import axios from 'axios';

const API_BASE_URL = 'https://blackcoffer-dashboard-gold.vercel.app/api';
const api = axios.create({ baseURL: API_BASE_URL, headers: { 'Content-Type': 'application/json' } });

const buildParams = (filters) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== 'all' && value !== '') params.append(key, value);
  });
  return params;
};

export const fetchFilters = async () => (await api.get('/filters')).data;

export const fetchAggregatedData = async (filters = {}, search = '') => {
  const params = buildParams(filters);
  if (search) params.append('search', search); 
  return (await api.get(`/aggregated?${params.toString()}`)).data;
};

export const fetchStats = async (filters = {}, search = '') => {
  const params = buildParams(filters);
  if (search) params.append('search', search); 
  return (await api.get(`/stats?${params.toString()}`)).data;
};

export const fetchIntensityLikelihoodRelevance = async (filters = {}, search = '') => {
  const params = buildParams(filters);
  if (search) params.append('search', search); 
  return (await api.get(`/intensity-likelihood-relevance?${params.toString()}`)).data;
};

export const fetchTableData = async (filters = {}, page = 1, limit = 10, search = '') => {
  const params = buildParams(filters);
  params.append('page', page);
  params.append('limit', limit);
  if (search) params.append('search', search); 
  return (await api.get(`/table-data?${params.toString()}`)).data;
};

export default api;
