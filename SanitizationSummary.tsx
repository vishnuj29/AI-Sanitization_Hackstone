import React from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  RotateCcw,
  TrendingUp
} from 'lucide-react';

interface SanitizationSummaryProps {
  stats: {
    total: number;
    clean: number;
    dirty: number;
    inProgress: number;
    needsAttention: number;
  };
}

const SanitizationSummary: React.FC<SanitizationSummaryProps> = ({ stats }) => {
  const { total, clean, dirty, inProgress, needsAttention } = stats;
  
  // Calculate percentages
  const cleanPercent = Math.round((clean / total) * 100) || 0;
  const dirtyPercent = Math.round((dirty / total) * 100) || 0;
  const inProgressPercent = Math.round((inProgress / total) * 100) || 0;
  const needsAttentionPercent = Math.round((needsAttention / total) * 100) || 0;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Sanitization Summary</h2>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500">Total Stations</p>
            <p className="text-3xl font-bold text-gray-800">{total}</p>
          </div>
          <div className="h-16 w-16 bg-cyan-50 rounded-full flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-cyan-500" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium">Clean</span>
              </div>
              <span className="text-sm font-medium">{clean} ({cleanPercent}%)</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${cleanPercent}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm font-medium">Dirty</span>
              </div>
              <span className="text-sm font-medium">{dirty} ({dirtyPercent}%)</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${dirtyPercent}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <div className="flex items-center">
                <RotateCcw className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm font-medium">In Progress</span>
              </div>
              <span className="text-sm font-medium">{inProgress} ({inProgressPercent}%)</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${inProgressPercent}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">Needs Attention</span>
              </div>
              <span className="text-sm font-medium">{needsAttention} ({needsAttentionPercent}%)</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 rounded-full"
                style={{ width: `${needsAttentionPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanitizationSummary;