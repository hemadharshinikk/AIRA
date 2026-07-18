import React, { useEffect, useState } from 'react';

interface HealthSpeedometerProps {
  value: number; // 0-100
}

const HealthSpeedometer: React.FC<HealthSpeedometerProps> = ({ value }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValue(value);
    }, 500);
    return () => clearTimeout(timeout);
  }, [value]);

  // Convert value to rotation angle (-90 to 90 degrees)
  const angle = ((animatedValue / 100) * 180) - 90;
  
  // Determine color based on value
  const getColor = (val: number) => {
    if (val >= 80) return '#10b981'; // Green
    if (val >= 60) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  const getHealthStatus = (val: number) => {
    if (val >= 90) return 'Excellent';
    if (val >= 80) return 'Good';
    if (val >= 70) return 'Fair';
    if (val >= 60) return 'Needs Attention';
    return 'Critical';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-32 mb-6">
        {/* Speedometer Background */}
        <svg className="w-full h-full" viewBox="0 0 200 100">
          {/* Background Arc */}
          <path
            d="M 20 80 A 60 60 0 0 1 180 80"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Red Zone */}
          <path
            d="M 20 80 A 60 60 0 0 0 100 20"
            fill="none"
            stroke="#fee2e2"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Yellow Zone */}
          <path
            d="M 100 20 A 60 60 0 0 0 140 40"
            fill="none"
            stroke="#fef3c7"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Green Zone */}
          <path
            d="M 140 40 A 60 60 0 0 0 180 80"
            fill="none"
            stroke="#d1fae5"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Active Arc */}
          <path
            d="M 20 80 A 60 60 0 0 1 180 80"
            fill="none"
            stroke={getColor(animatedValue)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(animatedValue / 100) * 188.5} 188.5`}
            className="transition-all duration-1000 ease-out"
          />

          {/* Needle */}
          <g className="transition-all duration-1000 ease-out" style={{ transformOrigin: '100px 80px' }}>
            <line
              x1="100"
              y1="80"
              x2="100"
              y2="30"
              stroke="#374151"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${angle} 100 80)`}
            />
            <circle
              cx="100"
              cy="80"
              r="5"
              fill="#374151"
            />
          </g>

          {/* Scale Numbers */}
          <text x="30" y="75" fontSize="12" fill="#6b7280" textAnchor="middle">0</text>
          <text x="60" y="35" fontSize="12" fill="#6b7280" textAnchor="middle">25</text>
          <text x="100" y="25" fontSize="12" fill="#6b7280" textAnchor="middle">50</text>
          <text x="140" y="35" fontSize="12" fill="#6b7280" textAnchor="middle">75</text>
          <text x="170" y="75" fontSize="12" fill="#6b7280" textAnchor="middle">100</text>
        </svg>
      </div>

      {/* Value Display */}
      <div className="text-center">
        <div className="text-4xl font-bold" style={{ color: getColor(animatedValue) }}>
          {Math.round(animatedValue)}%
        </div>
        <div className="text-lg text-gray-600 font-medium">
          {getHealthStatus(animatedValue)}
        </div>
      </div>

      {/* Health Status Indicators */}
      <div className="flex justify-between w-full mt-6 text-xs">
        <div className="text-center">
          <div className="w-4 h-4 bg-red-200 rounded-full mx-auto mb-1"></div>
          <span className="text-gray-600">Critical</span>
        </div>
        <div className="text-center">
          <div className="w-4 h-4 bg-yellow-200 rounded-full mx-auto mb-1"></div>
          <span className="text-gray-600">Fair</span>
        </div>
        <div className="text-center">
          <div className="w-4 h-4 bg-green-200 rounded-full mx-auto mb-1"></div>
          <span className="text-gray-600">Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default HealthSpeedometer;