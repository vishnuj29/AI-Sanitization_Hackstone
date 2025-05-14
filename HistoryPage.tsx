import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { SanitizationRecord } from '../types/sanitization';
import { Calendar, Clock, Download, Filter } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<string>('today');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  // Mock sanitization history records
  const records: SanitizationRecord[] = [
    {
      id: '1',
      seatId: 'seat-101',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      status: 'CLEAN',
      performedBy: 'John Smith',
      verifiedBy: 'AI System',
      notes: 'Regular scheduled cleaning'
    },
    {
      id: '2',
      seatId: 'seat-201',
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      status: 'CLEAN',
      performedBy: 'Maria Rodriguez',
      verifiedBy: 'AI System',
      notes: 'Post-discharge cleaning'
    },
    {
      id: '3',
      seatId: 'seat-102',
      timestamp: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
      status: 'DIRTY',
      performedBy: 'Scheduled',
      verifiedBy: 'System',
      notes: 'Missed cleaning cycle'
    },
    {
      id: '4',
      seatId: 'seat-301',
      timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
      status: 'CLEAN',
      performedBy: 'Alex Johnson',
      verifiedBy: 'AI System',
      notes: 'Extra sanitization requested by staff'
    },
    {
      id: '5',
      seatId: 'seat-202',
      timestamp: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      status: 'NEEDS_ATTENTION',
      performedBy: 'Thomas Brown',
      verifiedBy: 'AI System',
      notes: 'Partial cleaning detected, verification failed'
    }
  ];
  
  // Filter records based on selected filters
  const filteredRecords = records.filter(record => {
    // Apply date filter
    const recordDate = new Date(record.timestamp);
    const now = new Date();
    
    let dateMatches = true;
    if (dateRange === 'today') {
      dateMatches = recordDate.getDate() === now.getDate() &&
                    recordDate.getMonth() === now.getMonth() &&
                    recordDate.getFullYear() === now.getFullYear();
    } else if (dateRange === 'yesterday') {
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      dateMatches = recordDate.getDate() === yesterday.getDate() &&
                    recordDate.getMonth() === yesterday.getMonth() &&
                    recordDate.getFullYear() === yesterday.getFullYear();
    } else if (dateRange === 'week') {
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      dateMatches = recordDate >= weekAgo;
    } else if (dateRange === 'month') {
      const monthAgo = new Date(now);
      monthAgo.setMonth(now.getMonth() - 1);
      dateMatches = recordDate >= monthAgo;
    }
    
    // Apply status filter
    const statusMatches = selectedStatus === null || record.status === selectedStatus;
    
    // Apply department filter (would need to join with seat data in a real app)
    // For this example, I'll just mock it to make all departments match except for a few
    const departmentMatches = selectedDepartment === null || 
      (record.seatId.startsWith('seat-1') && selectedDepartment === 'General Medicine') ||
      (record.seatId.startsWith('seat-2') && selectedDepartment === 'Pediatrics') ||
      (record.seatId.startsWith('seat-3') && selectedDepartment === 'Surgery');
    
    return dateMatches && statusMatches && departmentMatches;
  });
  
  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString([], { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'CLEAN':
        return 'bg-green-100 text-green-800';
      case 'DIRTY':
        return 'bg-red-100 text-red-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'NEEDS_ATTENTION':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Layout title="Sanitization History">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0">
              Sanitization Records
            </h2>
            
            <div className="flex flex-col md:flex-row gap-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
              
              <select
                value={selectedDepartment || ''}
                onChange={(e) => 
                  setSelectedDepartment(e.target.value === '' ? null : e.target.value)
                }
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="">All Departments</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Surgery">Surgery</option>
              </select>
              
              <select
                value={selectedStatus || ''}
                onChange={(e) => 
                  setSelectedStatus(e.target.value === '' ? null : e.target.value)
                }
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="">All Status</option>
                <option value="CLEAN">Clean</option>
                <option value="DIRTY">Dirty</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="NEEDS_ATTENTION">Needs Attention</option>
              </select>
              
              <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                <Download className="h-4 w-4 mr-1" />
                Export
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {filteredRecords.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seat ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performed By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verified By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.seatId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                        {formatDateTime(record.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(record.status)}`}>
                        {record.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.performedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.verifiedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center">
              <Filter className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No records found for the selected filters.</p>
              <button 
                onClick={() => {
                  setDateRange('month');
                  setSelectedDepartment(null);
                  setSelectedStatus(null);
                }}
                className="mt-2 text-sm text-cyan-600 hover:text-cyan-800"
              >
                View all records from the last 30 days
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredRecords.length}</span> of{' '}
                <span className="font-medium">{filteredRecords.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HistoryPage;