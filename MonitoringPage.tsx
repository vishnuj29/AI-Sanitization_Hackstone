import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import CameraFeed from '../components/sanitization/CameraFeed';
import { Seat } from '../types/sanitization';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MonitoringPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('floor1');
  
  // Mock data for seats grouped by floors
  const seatsByFloor = {
    floor1: [
      { id: 'seat-101', name: 'Room 101 - Bed A' },
      { id: 'seat-102', name: 'Room 101 - Bed B' },
      { id: 'seat-103', name: 'Room 102 - Bed A' },
    ],
    floor2: [
      { id: 'seat-201', name: 'Room 201 - Bed A' },
      { id: 'seat-202', name: 'Room 201 - Bed B' },
    ],
    floor3: [
      { id: 'seat-301', name: 'Room 301 - Bed A' },
    ]
  };
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  return (
    <Layout title="Live Monitoring">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Camera Feeds</h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor sanitization in real-time with AI-assisted detection
          </p>
        </div>
        
        <div className="p-4">
          <div className="space-y-4">
            {/* Floor 1 */}
            <div className="border rounded-md overflow-hidden">
              <div 
                className="bg-gray-50 p-3 border-b flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('floor1')}
              >
                <h3 className="font-medium text-gray-800">Floor 1 - West Wing</h3>
                {expandedSection === 'floor1' ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              
              {expandedSection === 'floor1' && (
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {seatsByFloor.floor1.map(seat => (
                      <CameraFeed 
                        key={seat.id} 
                        seatId={seat.id} 
                        seatName={seat.name} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Floor 2 */}
            <div className="border rounded-md overflow-hidden">
              <div 
                className="bg-gray-50 p-3 border-b flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('floor2')}
              >
                <h3 className="font-medium text-gray-800">Floor 2 - East Wing</h3>
                {expandedSection === 'floor2' ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              
              {expandedSection === 'floor2' && (
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {seatsByFloor.floor2.map(seat => (
                      <CameraFeed 
                        key={seat.id} 
                        seatId={seat.id} 
                        seatName={seat.name} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Floor 3 */}
            <div className="border rounded-md overflow-hidden">
              <div 
                className="bg-gray-50 p-3 border-b flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('floor3')}
              >
                <h3 className="font-medium text-gray-800">Floor 3 - South Wing</h3>
                {expandedSection === 'floor3' ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              
              {expandedSection === 'floor3' && (
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {seatsByFloor.floor3.map(seat => (
                      <CameraFeed 
                        key={seat.id} 
                        seatId={seat.id} 
                        seatName={seat.name} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">AI Detection Details</h2>
        </div>
        
        <div className="p-4">
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Detection Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Sanitization Detection</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Wiping Gesture</span>
                    <span className="text-xs font-medium">Enabled</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Spray Detection</span>
                    <span className="text-xs font-medium">Enabled</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Minimum Time</span>
                    <span className="text-xs font-medium">30 seconds</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Coverage Requirements</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Surface Area</span>
                    <span className="text-xs font-medium">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">High-Touch Points</span>
                    <span className="text-xs font-medium">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Verification Method</span>
                    <span className="text-xs font-medium">Computer Vision</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Alert Settings</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Missed Cleaning</span>
                    <span className="text-xs font-medium">Immediate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Incomplete Coverage</span>
                    <span className="text-xs font-medium">Warning</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Verification Timeout</span>
                    <span className="text-xs font-medium">2 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Detection Process</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <ol className="space-y-3">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">1</div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Motion Detection</p>
                    <p className="text-xs text-gray-500">System detects cleaning staff presence near hospital seat</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">2</div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Action Recognition</p>
                    <p className="text-xs text-gray-500">AI algorithms identify sanitization movements and product usage</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">3</div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Coverage Analysis</p>
                    <p className="text-xs text-gray-500">System maps cleaning coverage across all required surfaces</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">4</div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Duration Verification</p>
                    <p className="text-xs text-gray-500">Ensures minimum sanitization time requirements are met</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">5</div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Status Update</p>
                    <p className="text-xs text-gray-500">Green checkmark displayed when all criteria are satisfied</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MonitoringPage;