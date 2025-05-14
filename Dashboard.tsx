import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import SanitizationSummary from '../components/sanitization/SanitizationSummary';
import SeatCard from '../components/sanitization/SeatCard';
import { Seat } from '../types/sanitization';
import { Search, Filter, X } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  // Mock data for seats
  const seats: Seat[] = [
    {
      id: 'seat-101',
      name: 'Room 101 - Bed A',
      location: 'Floor 1, West Wing',
      department: 'General Medicine',
      status: 'CLEAN',
      lastCleaned: new Date(Date.now() - 30 * 60000).toISOString(),
      nextScheduledCleaning: new Date(Date.now() + 4 * 60 * 60000).toISOString()
    },
    {
      id: 'seat-102',
      name: 'Room 101 - Bed B',
      location: 'Floor 1, West Wing',
      department: 'General Medicine',
      status: 'DIRTY',
      lastCleaned: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
      nextScheduledCleaning: new Date(Date.now() - 60 * 60000).toISOString()
    },
    {
      id: 'seat-103',
      name: 'Room 102 - Bed A',
      location: 'Floor 1, West Wing',
      department: 'General Medicine',
      status: 'IN_PROGRESS',
      lastCleaned: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
      nextScheduledCleaning: new Date(Date.now() + 3 * 60 * 60000).toISOString()
    },
    {
      id: 'seat-201',
      name: 'Room 201 - Bed A',
      location: 'Floor 2, East Wing',
      department: 'Pediatrics',
      status: 'CLEAN',
      lastCleaned: new Date(Date.now() - 45 * 60000).toISOString(),
      nextScheduledCleaning: new Date(Date.now() + 3.5 * 60 * 60000).toISOString()
    },
    {
      id: 'seat-202',
      name: 'Room 201 - Bed B',
      location: 'Floor 2, East Wing',
      department: 'Pediatrics',
      status: 'NEEDS_ATTENTION',
      lastCleaned: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      nextScheduledCleaning: new Date(Date.now() + 2 * 60 * 60000).toISOString()
    },
    {
      id: 'seat-301',
      name: 'Room 301 - Bed A',
      location: 'Floor 3, South Wing',
      department: 'Surgery',
      status: 'CLEAN',
      lastCleaned: new Date(Date.now() - 25 * 60000).toISOString(),
      nextScheduledCleaning: new Date(Date.now() + 5 * 60 * 60000).toISOString()
    }
  ];
  
  // Calculate seat statistics
  const stats = {
    total: seats.length,
    clean: seats.filter(seat => seat.status === 'CLEAN').length,
    dirty: seats.filter(seat => seat.status === 'DIRTY').length,
    inProgress: seats.filter(seat => seat.status === 'IN_PROGRESS').length,
    needsAttention: seats.filter(seat => seat.status === 'NEEDS_ATTENTION').length
  };
  
  // Get unique departments
  const departments = Array.from(new Set(seats.map(seat => seat.department)));
  
  // Filter seats based on search and filters
  const filteredSeats = seats.filter(seat => {
    const matchesSearch = searchQuery === '' || 
      seat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seat.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDepartment = selectedDepartment === null || 
      seat.department === selectedDepartment;
      
    const matchesStatus = selectedStatus === null || 
      seat.status === selectedStatus;
      
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDepartment(null);
    setSelectedStatus(null);
  };
  
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0">Hospital Seats</h2>
              
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search seats..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={selectedDepartment || ''}
                    onChange={(e) => 
                      setSelectedDepartment(e.target.value === '' ? null : e.target.value)
                    }
                    className="pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedStatus || ''}
                    onChange={(e) => 
                      setSelectedStatus(e.target.value === '' ? null : e.target.value)
                    }
                    className="pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="">All Status</option>
                    <option value="CLEAN">Clean</option>
                    <option value="DIRTY">Dirty</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="NEEDS_ATTENTION">Needs Attention</option>
                  </select>
                </div>
              </div>
            </div>
            
            {(searchQuery || selectedDepartment || selectedStatus) && (
              <div className="mb-4 flex items-center">
                <span className="text-sm text-gray-500 mr-2">Filters:</span>
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 rounded">
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="ml-1 text-gray-400 hover:text-gray-600">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  
                  {selectedDepartment && (
                    <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 rounded">
                      Department: {selectedDepartment}
                      <button onClick={() => setSelectedDepartment(null)} className="ml-1 text-gray-400 hover:text-gray-600">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  
                  {selectedStatus && (
                    <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 rounded">
                      Status: {selectedStatus.replace('_', ' ')}
                      <button onClick={() => setSelectedStatus(null)} className="ml-1 text-gray-400 hover:text-gray-600">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-cyan-600 hover:text-cyan-800"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
            
            {filteredSeats.length === 0 ? (
              <div className="py-12 text-center">
                <Filter className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No results found. Try adjusting your filters.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-2 text-sm text-cyan-600 hover:text-cyan-800"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredSeats.map(seat => (
                  <SeatCard key={seat.id} seat={seat} />
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <SanitizationSummary stats={stats} />
          
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden mt-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            </div>
            
            <div className="p-4">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Room 101 - Bed A sanitized</p>
                    <p className="text-xs text-gray-500">30 minutes ago</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Room 201 - Bed B needs attention</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Room 101 - Bed B sanitization missed</p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Room 102 - Bed A sanitization in progress</p>
                    <p className="text-xs text-gray-500">30 minutes ago</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-4 text-center">
                <button className="text-sm text-cyan-600 hover:text-cyan-800">
                  View all activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;