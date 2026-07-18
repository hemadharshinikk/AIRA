import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HealthGraph: React.FC = () => {
  const [data, setData] = useState<Array<{
    time: string;
    lungs: number;
    liver: number;
    kidney: number;
    digestive: number;
  }>>([]);

  useEffect(() => {
    // Initialize with some data points
    const initialData = [];
    for (let i = 0; i < 20; i++) {
      initialData.push({
        time: `${i}s`,
        lungs: 85 + Math.random() * 10,
        liver: 80 + Math.random() * 10,
        kidney: 75 + Math.random() * 10,
        digestive: 82 + Math.random() * 10,
      });
    }
    setData(initialData);

    // Update data every 2 seconds to simulate real-time ECG-like monitoring
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)]; // Remove first element
        const lastTime = parseInt(prevData[prevData.length - 1]?.time) || 0;
        
        // Add new data point with slight variations to simulate heartbeat-like patterns
        newData.push({
          time: `${lastTime + 1}s`,
          lungs: 85 + Math.sin(Date.now() / 1000) * 5 + Math.random() * 3,
          liver: 80 + Math.cos(Date.now() / 1200) * 4 + Math.random() * 3,
          kidney: 75 + Math.sin(Date.now() / 800) * 6 + Math.random() * 3,
          digestive: 82 + Math.cos(Date.now() / 1500) * 3 + Math.random() * 3,
        });
        
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" />
          <XAxis 
            dataKey="time" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            domain={[60, 100]}
            stroke="#6b7280"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="lungs" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={false}
            name="Lungs"
            strokeDasharray="0"
          />
          <Line 
            type="monotone" 
            dataKey="liver" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={false}
            name="Liver"
            strokeDasharray="0"
          />
          <Line 
            type="monotone" 
            dataKey="kidney" 
            stroke="#f59e0b" 
            strokeWidth={2}
            dot={false}
            name="Kidney"
            strokeDasharray="0"
          />
          <Line 
            type="monotone" 
            dataKey="digestive" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            dot={false}
            name="Digestive"
            strokeDasharray="0"
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Lungs</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-600 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Liver</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-600 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Kidney</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-600 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Digestive</span>
        </div>
      </div>
    </div>
  );
};

export default HealthGraph;