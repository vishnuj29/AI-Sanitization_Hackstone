import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Video, 
  ClipboardList, 
  Settings, 
  LogOut, 
  CheckCircle
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-md flex flex-col z-10">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <CheckCircle className="text-cyan-600 h-6 w-6" />
          <h1 className="text-xl font-bold text-cyan-600">SaniTrack</h1>
        </div>
        <p className="text-xs text-gray-500 mt-1">AI-Powered Sanitization System</p>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          <Link 
            to="/" 
            className={`flex items-center px-4 py-3 rounded-md transition-colors ${
              isActive('/') 
                ? 'bg-cyan-50 text-cyan-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/monitoring" 
            className={`flex items-center px-4 py-3 rounded-md transition-colors ${
              isActive('/monitoring') 
                ? 'bg-cyan-50 text-cyan-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Video className="h-5 w-5 mr-3" />
            <span>Monitoring</span>
          </Link>
          
          <Link 
            to="/history" 
            className={`flex items-center px-4 py-3 rounded-md transition-colors ${
              isActive('/history') 
                ? 'bg-cyan-50 text-cyan-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ClipboardList className="h-5 w-5 mr-3" />
            <span>History</span>
          </Link>
          
          <Link 
            to="/settings" 
            className={`flex items-center px-4 py-3 rounded-md transition-colors ${
              isActive('/settings') 
                ? 'bg-cyan-50 text-cyan-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Settings className="h-5 w-5 mr-3" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
            {currentUser?.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{currentUser?.name}</p>
            <p className="text-xs text-gray-500">{currentUser?.role}</p>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="flex w-full items-center px-4 py-2 text-sm text-red-600 rounded-md hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;