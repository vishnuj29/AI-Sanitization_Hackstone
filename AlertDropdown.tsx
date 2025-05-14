import React from 'react';
import { SanitizationAlert } from '../../types/sanitization';

interface AlertDropdownProps {
  onClose: () => void;
}

const AlertDropdown: React.FC<AlertDropdownProps> = ({ onClose }) => {
  // Mock alerts data
  const alerts: SanitizationAlert[] = [
    {
      id: '1',
      seatId: 'seat-101',
      seatName: 'Room 101 - Bed A',
      status: 'NEEDS_ATTENTION',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      message: 'Sanitization check failed',
      isRead: false,
      priority: 'HIGH'
    },
    {
      id: '2',
      seatId: 'seat-203',
      seatName: 'Room 203 - Chair',
      status: 'DIRTY',
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      message: 'Scheduled cleaning missed',
      isRead: false,
      priority: 'MEDIUM'
    },
    {
      id: '3',
      seatId: 'seat-105',
      seatName: 'Room 105 - Bed B',
      status: 'CLEAN',
      timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
      message: 'Sanitization complete',
      isRead: true,
      priority: 'LOW'
    }
  ];
  
  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };
  
  const getPriorityColor = (priority: string, isRead: boolean) => {
    if (isRead) return 'bg-gray-100';
    
    switch (priority) {
      case 'HIGH':
        return 'bg-red-50 border-l-4 border-red-500';
      case 'MEDIUM':
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      default:
        return 'bg-blue-50 border-l-4 border-blue-500';
    }
  };
  
  const getStatusColor = (status: string) => {
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
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
      <div className="py-2 px-3 bg-gray-50 border-b flex justify-between items-center">
        <h3 className="text-sm font-semibold">Notifications</h3>
        <button className="text-xs text-cyan-600 hover:text-cyan-800">
          Mark all as read
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {alerts.map(alert => (
          <div 
            key={alert.id} 
            className={`p-3 border-b ${getPriorityColor(alert.priority, alert.isRead)}`}
          >
            <div className="flex justify-between">
              <span className="font-medium text-sm">{alert.seatName}</span>
              <span className="text-xs text-gray-500">{formatTimeAgo(alert.timestamp)}</span>
            </div>
            
            <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
            
            <div className="mt-2 flex justify-between items-center">
              <span 
                className={`text-xs px-2 py-1 rounded-full ${getStatusColor(alert.status)}`}
              >
                {alert.status.replace('_', ' ')}
              </span>
              
              <button className="text-xs text-cyan-600 hover:text-cyan-800">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="py-2 px-3 border-t text-center">
        <button className="text-sm text-cyan-600 hover:text-cyan-800">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default AlertDropdown;