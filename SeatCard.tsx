import React, { useState } from 'react';
import { Seat } from '../../types/sanitization';
import { CheckCircle, AlertTriangle, RotateCcw, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface SeatCardProps {
  seat: Seat;
  onClick?: (seat: Seat) => void;
}

const SeatCard: React.FC<SeatCardProps> = ({ seat, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getStatusIcon = () => {
    switch (seat.status) {
      case 'CLEAN':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'DIRTY':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'IN_PROGRESS':
        return <RotateCcw className="h-5 w-5 text-blue-500" />;
      case 'NEEDS_ATTENTION':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getStatusBg = () => {
    switch (seat.status) {
      case 'CLEAN':
        return 'bg-green-50 border-green-200';
      case 'DIRTY':
        return 'bg-red-50 border-red-200';
      case 'IN_PROGRESS':
        return 'bg-blue-50 border-blue-200';
      case 'NEEDS_ATTENTION':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };
  
  const formatTime = (timestamp?: string) => {
    if (!timestamp) return 'N/A';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleClick = () => {
    if (onClick) {
      onClick(seat);
    }
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`border rounded-lg shadow-sm overflow-hidden ${getStatusBg()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800">{seat.name}</h3>
            <p className="text-sm text-gray-500">{seat.location}</p>
          </div>
          {getStatusIcon()}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex justify-between text-xs">
            <div>
              <p className="text-gray-500">Last Cleaned</p>
              <p className="font-medium">{formatTime(seat.lastCleaned)}</p>
            </div>
            <div>
              <p className="text-gray-500">Next Scheduled</p>
              <p className="font-medium">{formatTime(seat.nextScheduledCleaning)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {isHovered && (
        <div className="bg-white p-2 border-t text-center">
          <button className="text-xs text-cyan-600 hover:text-cyan-800">
            View Details
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default SeatCard;