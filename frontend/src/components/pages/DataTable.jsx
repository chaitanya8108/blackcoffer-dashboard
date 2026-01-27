import React, { useState, useEffect } from 'react';
import { useFilters } from '../../context/FilterContext';
import { fetchTableData } from '../../services/api';
import { FiSearch, FiChevronLeft, FiChevronRight, FiExternalLink, FiDownload } from 'react-icons/fi';

const DataTable = () => {
  const { filters } = useFilters();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [limit] = useState(10);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchTableData(filters, page, limit, search);
        setData(result.data);
        setTotalPages(result.total_pages);
        setTotal(result.total);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [filters, page, limit, search]);

  useEffect(() => {
    setPage(1);
  }, [search, filters]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Data Table</h1>
          <p className="text-gray-400 mt-1">Browse and search through all records</p>
        </div>
        <button className="btn-primary flex items-center gap-2 w-fit">
          <FiDownload className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Search and Info */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          {/* <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /> */}
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={handleSearch}
            className="input-dark pl-10"
          />
        </div>
        <p className="text-gray-400 text-sm">
          Showing {data.length} of {total.toLocaleString()} records
        </p>
      </div>

      {/* Table */}
      <div className="glass-effect rounded-xl overflow-hidden">
        <div className="table-container">
          <table className="table-dark">
            <thead>
              <tr>
                <th>Title</th>
                <th className="hidden md:table-cell">Topic</th>
                <th className="hidden lg:table-cell">Sector</th>
                <th className="hidden sm:table-cell">Country</th>
                <th>Intensity</th>
                <th className="hidden md:table-cell">Likelihood</th>
                <th className="hidden lg:table-cell">Year</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-8">
                    <div className="spinner w-8 h-8 mx-auto"></div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-500">
                    No records found
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={idx}>
                    <td className="max-w-xs truncate text-white" title={item.title}>
                      {item.title || '-'}
                    </td>
                    <td className="hidden md:table-cell">
                      <span className="badge badge-blue">{item.topic || '-'}</span>
                    </td>
                    <td className="hidden lg:table-cell text-gray-400">{item.sector || '-'}</td>
                    <td className="hidden sm:table-cell text-gray-400">{item.country || '-'}</td>
                    <td>
                      <span className={`font-medium ${item.intensity > 5 ? 'text-red-400' : 'text-green-400'}`}>
                        {item.intensity || 0}
                      </span>
                    </td>
                    <td className="hidden md:table-cell text-gray-400">{item.likelihood || 0}</td>
                    <td className="hidden lg:table-cell text-gray-400">{item.end_year || '-'}</td>
                    <td>
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-400 hover:text-blue-300">
                          <FiExternalLink className="w-4 h-4" />
                        </a>
                      ) : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg bg-dark-200 text-gray-400 hover:text-white 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            {[...Array(Math.min(5, totalPages))].map((_, idx) => {
              const pageNum = Math.max(1, Math.min(page - 2, totalPages - 4)) + idx;
              if (pageNum > totalPages) return null;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors
                            ${page === pageNum 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-dark-200 text-gray-400 hover:text-white'}`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg bg-dark-200 text-gray-400 hover:text-white 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
