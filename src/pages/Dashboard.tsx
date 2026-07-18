import React, { useState, useEffect } from 'react';
import { Calendar, Users, Activity, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import OrganHealth from '../components/OrganHealth';
import HealthGraph from '../components/HealthGraph';
import HealthSpeedometer from '../components/HealthSpeedometer';
import DailyTracking from '../components/DailyTracking';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedMember, setSelectedMember] = useState('self');
  const [overallHealth, setOverallHealth] = useState(78);

  // Simulate health data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOverallHealth(prev => {
        const change = (Math.random() - 0.5) * 4;
        return Math.max(60, Math.min(95, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const familyMembers = [
    { id: 'self', name: user?.name || 'You', age: user?.age || 0 },
    { id: 'spouse', name: 'Sarah', age: 45 },
    { id: 'child1', name: 'Alex', age: 12 },
    { id: 'child2', name: 'Emma', age: 8 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Health Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor your family's health in real-time</p>
            </div>
            
            {/* Family Member Selector */}
            <div className="mt-4 md:mt-0">
              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {familyMembers.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.age} years)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Overall Health</p>
                <p className="text-2xl font-bold text-gray-800">{Math.round(overallHealth)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Days Tracked</p>
                <p className="text-2xl font-bold text-gray-800">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Family Members</p>
                <p className="text-2xl font-bold text-gray-800">{familyMembers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Health Trend</p>
                <p className="text-2xl font-bold text-green-600">+5.2%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Organ Health */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Organ Health Status</h3>
            <OrganHealth />
          </div>

          {/* Health Speedometer */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Health Level</h3>
            <HealthSpeedometer value={overallHealth} />
          </div>
        </div>

        {/* Health Graph */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Real-time Health Monitoring</h3>
          <HealthGraph />
        </div>

        {/* Daily Tracking */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Daily Health Tracking</h3>
          <DailyTracking selectedMember={selectedMember} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;