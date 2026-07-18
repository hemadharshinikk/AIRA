import React from 'react';
import { Heart, Activity, Zap, Shield } from 'lucide-react';

interface OrganData {
  name: string;
  percentage: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

const OrganHealth: React.FC = () => {
  const organs: OrganData[] = [
    {
      name: 'Lungs',
      percentage: 92,
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Liver',
      percentage: 85,
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Kidney',
      percentage: 78,
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Digestive System',
      percentage: 88,
      icon: Heart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const getHealthStatus = (percentage: number) => {
    if (percentage >= 90) return { status: 'Excellent', color: 'text-green-600' };
    if (percentage >= 80) return { status: 'Good', color: 'text-blue-600' };
    if (percentage >= 70) return { status: 'Fair', color: 'text-yellow-600' };
    return { status: 'Needs Attention', color: 'text-red-600' };
  };

  return (
    <div className="space-y-6">
      {organs.map((organ) => {
        const Icon = organ.icon;
        const healthStatus = getHealthStatus(organ.percentage);
        
        return (
          <div key={organ.name} className={`p-4 ${organ.bgColor} rounded-lg`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className={`p-2 ${organ.bgColor} rounded-lg mr-3`}>
                  <Icon className={`w-6 h-6 ${organ.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{organ.name}</h4>
                  <p className={`text-sm ${healthStatus.color} font-medium`}>
                    {healthStatus.status}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${organ.color}`}>
                  {organ.percentage}%
                </div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                  organ.percentage >= 90 ? 'bg-green-500' :
                  organ.percentage >= 80 ? 'bg-blue-500' :
                  organ.percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${organ.percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrganHealth;