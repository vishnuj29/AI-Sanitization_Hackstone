import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface CameraFeedProps {
  seatId: string;
  seatName: string;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ seatId, seatName }) => {
  const [detectionStatus, setDetectionStatus] = useState<'idle' | 'detecting' | 'detected' | 'failed'>('idle');
  const [confidenceScore, setConfidenceScore] = useState(0);
  
  // Simulate detection process
  useEffect(() => {
    if (detectionStatus === 'detecting') {
      const interval = setInterval(() => {
        setConfidenceScore(prev => {
          const newScore = prev + Math.random() * 10;
          
          if (newScore >= 100) {
            clearInterval(interval);
            setDetectionStatus('detected');
            return 100;
          }
          
          return newScore;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [detectionStatus]);
  
  const handleStartDetection = () => {
    setDetectionStatus('detecting');
    setConfidenceScore(0);
  };
  
  const renderDetectionOverlay = () => {
    if (detectionStatus === 'idle') {
      return null;
    }
    
    if (detectionStatus === 'detecting') {
      return (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
          <Loader2 className="h-10 w-10 animate-spin mb-2" />
          <p className="font-medium">Analyzing Sanitization</p>
          <div className="w-48 h-2 bg-gray-700 rounded-full mt-2">
            <div 
              className="h-full bg-cyan-500 rounded-full transition-all duration-300"
              style={{ width: `${confidenceScore}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{Math.round(confidenceScore)}% complete</p>
        </div>
      );
    }
    
    if (detectionStatus === 'detected') {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-green-500/20 flex items-center justify-center"
        >
          <motion.div 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <h3 className="text-xl font-semibold text-gray-800">Sanitization Verified</h3>
            <p className="text-gray-500 mt-1">All requirements met</p>
            <button 
              onClick={() => setDetectionStatus('idle')}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Confirm
            </button>
          </motion.div>
        </motion.div>
      );
    }
    
    if (detectionStatus === 'failed') {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-red-500/20 flex items-center justify-center"
        >
          <motion.div 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-2" />
            <h3 className="text-xl font-semibold text-gray-800">Sanitization Incomplete</h3>
            <p className="text-gray-500 mt-1">Please complete all required steps</p>
            <div className="flex justify-center gap-2 mt-4">
              <button 
                onClick={() => setDetectionStatus('idle')}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleStartDetection}
                className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
              >
                Retry
              </button>
            </div>
          </motion.div>
        </motion.div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
      <div className="p-3 border-b bg-gray-50">
        <h3 className="font-medium text-gray-800">{seatName}</h3>
        <p className="text-xs text-gray-500">ID: {seatId}</p>
      </div>
      
      <div className="relative">
        {/* This would be a real camera feed in a production app */}
        <div className="bg-gray-800 h-64 w-full relative">
          <img 
            src="https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Camera feed simulation" 
            className="w-full h-full object-cover opacity-70"
          />
          
          {renderDetectionOverlay()}
        </div>
      </div>
      
      <div className="p-3 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {detectionStatus === 'idle' ? 'Ready for detection' : 
           detectionStatus === 'detecting' ? 'Detecting...' : 
           detectionStatus === 'detected' ? 'Sanitization verified' : 
           'Detection failed'}
        </span>
        
        {detectionStatus === 'idle' && (
          <button 
            onClick={handleStartDetection}
            className="px-3 py-1 bg-cyan-500 text-white text-sm rounded hover:bg-cyan-600"
          >
            Start Detection
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraFeed;