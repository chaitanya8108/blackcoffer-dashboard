import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import DataTable from './pages/DataTable';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { useTheme } from '../context/ThemeContext';

const Layout = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { sidebarOpen, closeSidebar } = useTheme();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'analytics': return <Analytics />;
      case 'data': return <DataTable />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-200">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="mobile-overlay" onClick={closeSidebar} />
      )}
      
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 pt-20 lg:pt-20 md:pt-20">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Layout;
