import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface DailyTrackingProps {
  selectedMember: string;
}

const DailyTracking: React.FC<DailyTrackingProps> = ({ selectedMember }) => {
  // Generate calendar data for the current month
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Mock tracking data - in real app, this would come from backend
  const [trackingData, setTrackingData] = useState<{ [key: string]: boolean }>({
    '2024-1-5': true,
    '2024-1-6': true,
    '2024-1-7': false,
    '2024-1-8': true,
    '2024-1-9': true,
    '2024-1-10': true,
    '2024-1-11': false,
    '2024-1-12': true,
    '2024-1-13': true,
    '2024-1-14': true,
    '2024-1-15': true,
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDateKey = (day: number) => {
    return `${currentYear}-${currentMonth + 1}-${day}`;
  };

  const getDayStatus = (day: number) => {
    const dateKey = getDateKey(day);
    return trackingData[dateKey];
  };

  const getConsecutiveDays = () => {
    let streak = 0;
    const today = new Date().getDate();
    
    for (let i = today; i >= 1; i--) {
      if (getDayStatus(i) === true) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getTotalDaysThisMonth = () => {
    return Object.values(trackingData).filter(Boolean).length;
  };

  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{getConsecutiveDays()}</div>
          <div className="text-sm text-gray-600">Current Streak</div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{getTotalDaysThisMonth()}</div>
          <div className="text-sm text-gray-600">Days This Month</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round((getTotalDaysThisMonth() / today.getDate()) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Completion Rate</div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg">
        <div className="text-center py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            {monthNames[currentMonth]} {currentYear}
          </h3>
        </div>
        
        <div className="p-4">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={index} className="h-10"></div>;
              }
              
              const status = getDayStatus(day);
              const isToday = day === today.getDate();
              const isFuture = day > today.getDate();
              
              return (
                <div
                  key={day}
                  className={`
                    h-10 flex items-center justify-center rounded-lg text-sm font-medium relative
                    ${isToday ? 'ring-2 ring-blue-500' : ''}
                    ${isFuture ? 'text-gray-300 cursor-not-allowed' : ''}
                    ${status === true ? 'bg-green-100 text-green-800' : ''}
                    ${status === false ? 'bg-red-100 text-red-800' : ''}
                    ${status === undefined && !isFuture ? 'bg-gray-100 text-gray-600' : ''}
                  `}
                >
                  <span>{day}</span>
                  {status === true && (
                    <Check className="w-3 h-3 text-green-600 absolute top-1 right-1" />
                  )}
                  {status === false && (
                    <X className="w-3 h-3 text-red-600 absolute top-1 right-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
          <Check className="w-3 h-3 text-green-600 mr-1" />
          <span className="text-gray-600">Completed</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-100 rounded mr-2"></div>
          <X className="w-3 h-3 text-red-600 mr-1" />
          <span className="text-gray-600">Missed</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-100 rounded mr-2"></div>
          <span className="text-gray-600">No data</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-blue-500 rounded mr-2"></div>
          <span className="text-gray-600">Today</span>
        </div>
      </div>
    </div>
  );
};

export default DailyTracking;