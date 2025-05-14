import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`md:block ${sidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-64">
        <Header 
          title={title} 
          toggleSidebar={toggleSidebar} 
          sidebarOpen={sidebarOpen} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;