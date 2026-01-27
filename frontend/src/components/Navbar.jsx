import React, { useState } from 'react';
import { FiMenu, FiSearch, FiBell, FiMoon, FiSun, FiUser, FiSettings, FiLogOut, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useFilters } from '../context/FilterContext';

const Navbar = () => {
  const { darkMode, toggleTheme, toggleSidebar } = useTheme();
  const { activeFiltersCount } = useFilters();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, title: 'New data imported', time: '5 min ago', read: false },
    { id: 2, title: 'Report generated', time: '1 hour ago', read: false },
    { id: 3, title: 'Dashboard updated', time: '2 hours ago', read: true },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-64 z-30 glass-effect border-b border-gray-800">
      <div className="px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-100 transition-colors"
            >
              <FiMenu className="w-6 h-6 text-gray-400" />
            </button>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search insights, topics, countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 lg:w-80 pl-10 pr-4 py-2 bg-dark-100 border border-gray-700 rounded-xl
                           text-white placeholder-gray-500 focus:outline-none focus:border-blue-500
                           transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-dark-100 transition-colors"
            >
              <FiSearch className="w-5 h-5 text-gray-400" />
            </button>

            {/* Active Filters Badge */}
            {activeFiltersCount > 0 && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 rounded-full">
                <span className="text-blue-400 text-sm font-medium">{activeFiltersCount} filters</span>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-dark-100 transition-colors"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? (
                <FiSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
                className="relative p-2 rounded-lg hover:bg-dark-100 transition-colors"
              >
                <FiBell className="w-5 h-5 text-gray-400" />
                <span className="notification-dot"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 glass-effect profile-dropdown rounded-xl shadow-xl border border-gray-800 overflow-hidden animate-fade-in">
                  <div className="px-4 py-3 border-b border-gray-800">
                    <h3 className="text-white font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-4 py-3 hover:bg-dark-100 cursor-pointer transition-colors
                                  ${!notif.read ? 'border-l-2 border-blue-500' : ''}`}
                      >
                        <p className="text-white text-sm">{notif.title}</p>
                        <p className="text-gray-500 text-xs mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-800">
                    <button className="text-blue-400 text-sm hover:text-blue-300 w-full text-center">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-dark-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
                              flex items-center justify-center text-white text-sm font-bold">
                  A
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-white text-sm font-medium">Admin User</p>
                  <p className="text-gray-500 text-xs">admin@blackcoffer.com</p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-56 glass-effect profile-dropdown rounded-xl shadow-xl border border-gray-800 overflow-hidden animate-fade-in">
                  <div className="px-4 py-3 border-b border-gray-800">
                    <p className="text-white font-medium">Admin User</p>
                    <p className="text-gray-500 text-sm">admin@blackcoffer.com</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-dark-100 flex items-center gap-3">
                      <FiUser className="w-4 h-4" /> Profile
                    </button>
                    <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-dark-100 flex items-center gap-3">
                      <FiSettings className="w-4 h-4" /> Settings
                    </button>
                    <div className="border-t border-gray-800 my-2"></div>
                    <button className="w-full px-4 py-2 text-left text-red-400 hover:bg-dark-100 flex items-center gap-3">
                      <FiLogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-100 border border-gray-700 rounded-xl
                         text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
