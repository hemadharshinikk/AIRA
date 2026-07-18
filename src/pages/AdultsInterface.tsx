import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Shield, TrendingUp, ArrowRight, Stethoscope, Heart, Microscope } from 'lucide-react';

const AdultsInterface: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Stethoscope className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-6xl font-bold text-gray-800 mb-6">Professional Health Monitoring</h1>
          <p className="text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Access comprehensive health insights through advanced breath analysis technology
          </p>
        </div>

        {/* Visual Instructions */}
        <div className="bg-white rounded-2xl p-12 shadow-xl mb-16">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-12">How Aira  Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                1
              </div>
              <div className="mb-4">
                <Microscope className="w-12 h-12 text-blue-600 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Breath Sample Collection</h3>
              <p className="text-lg text-gray-600">
                Provide a breath sample using our specialized collection device in a comfortable, non-invasive process.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                2
              </div>
              <div className="mb-4">
                <Activity className="w-12 h-12 text-green-600 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">AI-Powered Analysis</h3>
              <p className="text-lg text-gray-600">
                Advanced algorithms analyze molecular composition and biomarkers in your breath sample.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                3
              </div>
              <div className="mb-4">
                <Shield className="w-12 h-12 text-purple-600 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Health Insights</h3>
              <p className="text-lg text-gray-600">
                Receive detailed health reports with organ-specific analysis and risk assessments.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                4
              </div>
              <div className="mb-4">
                <TrendingUp className="w-12 h-12 text-orange-600 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Action Plan</h3>
              <p className="text-lg text-gray-600">
                Get personalized recommendations and track your health progress over time.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
            <Activity className="w-16 h-16 text-blue-600 mb-6" />
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Real-time Analysis</h3>
            <p className="text-xl text-gray-600 mb-6">
              Get instant health insights with our advanced AI-powered breath analysis system that monitors multiple health indicators simultaneously.
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                Respiratory health monitoring
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                Metabolic indicators
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                Disease detection markers
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
            <Shield className="w-16 h-16 text-green-600 mb-6" />
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Early Detection</h3>
            <p className="text-xl text-gray-600 mb-6">
              Identify potential health issues before they become serious with our comprehensive screening capabilities.
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-center">
                <div className="w-3 h-3 bg-green-600 rounded-full mr-4"></div>
                Cancer biomarkers
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-green-600 rounded-full mr-4"></div>
                Diabetes indicators
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-green-600 rounded-full mr-4"></div>
                Respiratory conditions
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
            <TrendingUp className="w-16 h-16 text-purple-600 mb-6" />
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Trend Analysis</h3>
            <p className="text-xl text-gray-600 mb-6">
              Track your health progress over time with detailed analytics and personalized recommendations.
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full mr-4"></div>
                Historical data analysis
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full mr-4"></div>
                Predictive insights
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full mr-4"></div>
                Family health tracking
              </li>
            </ul>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            className="inline-flex items-center px-16 py-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-3xl font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            Access My Dashboard
            <ArrowRight className="ml-4 w-10 h-10" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdultsInterface;