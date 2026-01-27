import React from 'react';
import { FiFileText, FiDownload, FiCalendar, FiClock } from 'react-icons/fi';

const Reports = () => {
  const reports = [
    { id: 1, name: 'Monthly Analytics Report', date: 'Dec 2024', size: '2.4 MB', type: 'PDF' },
    { id: 2, name: 'Quarterly Insights Summary', date: 'Q4 2024', size: '5.1 MB', type: 'PDF' },
    { id: 3, name: 'Regional Performance Data', date: 'Nov 2024', size: '1.8 MB', type: 'Excel' },
    { id: 4, name: 'PESTLE Analysis Export', date: 'Dec 2024', size: '890 KB', type: 'CSV' },
    { id: 5, name: 'Topic Trends Report', date: 'Dec 2024', size: '3.2 MB', type: 'PDF' },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Reports</h1>
          <p className="text-gray-400 mt-1">Download and manage your reports</p>
        </div>
        <button className="btn-primary flex items-center gap-2 w-fit">
          <FiFileText className="w-4 h-4" />
          Generate New Report
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <div key={report.id} className="glass-effect rounded-xl p-5 card-hover">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <FiFileText className="w-6 h-6 text-blue-400" />
              </div>
              <span className={`badge ${report.type === 'PDF' ? 'badge-red' : report.type === 'Excel' ? 'badge-green' : 'badge-yellow'}`}>
                {report.type}
              </span>
            </div>
            <h3 className="text-white font-semibold mt-4">{report.name}</h3>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FiCalendar className="w-4 h-4" />
                {report.date}
              </span>
              <span>{report.size}</span>
            </div>
            <button className="w-full mt-4 py-2 rounded-lg border border-gray-700 text-gray-400 
                           hover:border-blue-500 hover:text-blue-400 flex items-center justify-center gap-2 transition-colors">
              <FiDownload className="w-4 h-4" />
              Download
            </button>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="flex items-center gap-4 py-3 border-b border-gray-800 last:border-0">
              <div className="p-2 rounded-lg bg-dark-200">
                <FiClock className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-white">Report generated successfully</p>
                <p className="text-gray-500 text-sm">{idx + 1} hour{idx > 0 ? 's' : ''} ago</p>
              </div>
              <span className="badge badge-green">Completed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
