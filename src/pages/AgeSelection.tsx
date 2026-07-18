import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Baby, User, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AgeSelection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getAgeCategory = () => {
    if (!user) return null;
    if (user.age <= 17) return 'kid';
    if (user.age <= 64) return 'adult';
    return 'elderly';
  };

  const handleContinue = () => {
    const category = getAgeCategory();
    if (category === 'kid') navigate('/kids');
    else if (category === 'adult') navigate('/adults');
    else navigate('/elderly');
  };

  const ageCategory = getAgeCategory();
  
  const getCategoryInfo = () => {
    switch (ageCategory) {
      case 'kid':
        return {
          title: 'Kids Interface',
          description: 'Colorful, fun, and easy-to-understand health monitoring designed specifically for children',
          icon: Baby,
          color: 'from-pink-500 to-purple-600'
        };
      case 'adult':
        return {
          title: 'Adult Interface',
          description: 'Professional, detailed health dashboard with comprehensive monitoring features',
          icon: User,
          color: 'from-blue-500 to-indigo-600'
        };
      case 'elderly':
        return {
          title: 'Senior-Friendly Interface',
          description: 'Large text, audio guidance, and simplified navigation for comfortable use',
          icon: UserCheck,
          color: 'from-green-500 to-emerald-600'
        };
      default:
        return null;
    }
  };

  const categoryInfo = getCategoryInfo();

  if (!categoryInfo) {
    return <div>Loading...</div>;
  }

  const Icon = categoryInfo.icon;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user?.name}!</h2>
          <p className="text-gray-600">We've prepared a personalized interface just for you</p>
        </div>

        <div className={`bg-gradient-to-br ${categoryInfo.color} rounded-2xl p-8 text-white shadow-xl`}>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
              <Icon className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">{categoryInfo.title}</h3>
            <p className="text-lg opacity-90 mb-8">{categoryInfo.description}</p>

            <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-8">
              <div className="text-sm opacity-75 mb-1">Age Group</div>
              <div className="text-xl font-semibold">
                {ageCategory === 'kid' && 'Children (0-17 years)'}
                {ageCategory === 'adult' && 'Adults (18-64 years)'}
                {ageCategory === 'elderly' && 'Seniors (65+ years)'}
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors shadow-lg"
            >
              Continue to My Interface
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Don't worry, you can always switch interfaces later if needed</p>
        </div>
      </div>
    </div>
  );
};

export default AgeSelection;