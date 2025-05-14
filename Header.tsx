import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, Menu, X } from 'lucide-react';
import AlertDropdown from '../alerts/AlertDropdown';

interface HeaderProps {
  title: string;
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar, sidebarOpen }) => {
  const { currentUser } = useAuth();
  const [alertsOpen, setAlertsOpen] = useState(false);
  
  return (
    <header className="bg-white h-16 border-b flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 md:hidden mr-3"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setAlertsOpen(!alertsOpen)}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500"></span>
          </button>
          
          {alertsOpen && <AlertDropdown onClose={() => setAlertsOpen(false)} />}
        </div>
        
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 mr-2">
            {currentUser?.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:block">
            {currentUser?.name}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;