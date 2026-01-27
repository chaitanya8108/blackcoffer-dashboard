import React, { useState } from 'react';
import { FiUser, FiBell, FiLock, FiGlobe, FiMoon, FiSave } from 'react-icons/fi';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FiUser className="w-5 h-5 text-blue-400" />
          <h3 className="text-white text-lg font-semibold">Profile</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-sm block mb-2">Full Name</label>
            <input type="text" defaultValue="Admin User" className="input-dark" />
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-2">Email</label>
            <input type="email" defaultValue="admin@blackcoffer.com" className="input-dark" />
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FiBell className="w-5 h-5 text-blue-400" />
          <h3 className="text-white text-lg font-semibold">Preferences</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div>
              <p className="text-white">Email Notifications</p>
              <p className="text-gray-500 text-sm">Receive email updates about your reports</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <FiMoon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-white">Dark Mode</p>
                <p className="text-gray-500 text-sm">Use dark theme</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <FiGlobe className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-white">Language</p>
                <p className="text-gray-500 text-sm">Select your preferred language</p>
              </div>
            </div>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="select-dark w-32">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FiLock className="w-5 h-5 text-blue-400" />
          <h3 className="text-white text-lg font-semibold">Security</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm block mb-2">Current Password</label>
            <input type="password" placeholder="••••••••" className="input-dark" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm block mb-2">New Password</label>
              <input type="password" placeholder="••••••••" className="input-dark" />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-2">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="input-dark" />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="btn-primary flex items-center gap-2">
          <FiSave className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
