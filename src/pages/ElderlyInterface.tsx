import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, ArrowRight, Heart, Shield, VolumeX, Play } from 'lucide-react';

const ElderlyInterface: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const speakInstructions = () => {
    if ('speechSynthesis' in window) {
      const text = `Welcome to Swasam Health Monitoring System. 
      This is your personalized health monitoring system designed especially for you. 
      To use Swasam, simply breathe normally into our device. 
      We will analyze your breath to check your health. 
      The process is completely safe and painless. 
      First, take a slow, deep breath through your nose. 
      Then, breathe out slowly into our device. 
      We will show you how healthy you are. 
      Click the continue button when you are ready to see your health dashboard.
      If you need help, ask a family member to assist you.`;
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.7;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Heart className="w-24 h-24 text-red-500 mx-auto mb-8" />
          <h1 className="text-7xl font-bold text-gray-800 mb-8 leading-tight">Welcome to Aira</h1>
          <p className="text-4xl text-gray-600 leading-relaxed">
            Your Simple Health Monitoring System
          </p>
        </div>

        {/* Audio Controls */}
        <div className="text-center mb-16">
          <div className="flex justify-center space-x-6">
            <button
              onClick={isPlaying ? stopSpeaking : speakInstructions}
              className={`inline-flex items-center px-12 py-8 text-3xl font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isPlaying ? <VolumeX className="mr-4 w-10 h-10" /> : <Volume2 className="mr-4 w-10 h-10" />}
              {isPlaying ? 'Stop Audio Instructions' : 'Listen to Instructions'}
            </button>
          </div>
          <p className="text-2xl text-gray-600 mt-6">Click the button above to hear instructions</p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Simple Instructions */}
          <div className="bg-white rounded-3xl p-16 shadow-xl">
            <div className="text-center">
              <h2 className="text-5xl font-bold text-gray-800 mb-12">Easy Health Check</h2>
              <p className="text-3xl text-gray-700 leading-relaxed mb-12">
                Aira checks your health by looking at your breath. 
                It's safe, easy, and helps keep you healthy.
              </p>
              <div className="bg-blue-50 p-8 rounded-2xl">
                <p className="text-2xl text-blue-800 font-medium">
                  No needles, no pain - just breathe normally!
                </p>
              </div>
            </div>
          </div>

          {/* Step by Step with Large Visual Instructions */}
          <div className="bg-white rounded-3xl p-16 shadow-xl">
            <h3 className="text-5xl font-bold text-center text-gray-800 mb-16">How to Use Aira</h3>
            
            <div className="space-y-12">
              <div className="flex items-center p-8 bg-blue-50 rounded-3xl">
                <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-4xl font-bold mr-12 flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-gray-800 mb-4">Take a Deep Breath</h4>
                  <p className="text-3xl text-gray-700">
                    Breathe in slowly through your nose, like smelling flowers
                  </p>
                </div>
                <div className="text-8xl ml-8">👃</div>
              </div>

              <div className="flex items-center p-8 bg-green-50 rounded-3xl">
                <div className="w-24 h-24 bg-green-600 text-white rounded-full flex items-center justify-center text-4xl font-bold mr-12 flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-gray-800 mb-4">Breathe Out Slowly</h4>
                  <p className="text-3xl text-gray-700">
                    Breathe out gently into our device
                  </p>
                </div>
                <div className="text-8xl ml-8">💨</div>
              </div>

              <div className="flex items-center p-8 bg-purple-50 rounded-3xl">
                <div className="w-24 h-24 bg-purple-600 text-white rounded-full flex items-center justify-center text-4xl font-bold mr-12 flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-gray-800 mb-4">See Your Results</h4>
                  <p className="text-3xl text-gray-700">
                    We'll show you how healthy you are
                  </p>
                </div>
                <div className="text-8xl ml-8">📊</div>
              </div>
            </div>
          </div>

          {/* Safety Assurance */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-16 text-white shadow-xl">
            <div className="text-center">
              <Shield className="w-24 h-24 mx-auto mb-12" />
              <h3 className="text-5xl font-bold mb-8">Safe & Simple</h3>
              <p className="text-3xl leading-relaxed mb-8">
                This test is completely safe. It doesn't hurt at all. 
                We just need you to breathe normally.
              </p>
              <div className="bg-white bg-opacity-20 rounded-2xl p-8">
                <p className="text-2xl font-medium">
                  Your family can help you too! Ask them if you need assistance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center mt-16">
          <button
            onClick={handleContinue}
            className="inline-flex items-center px-16 py-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-4xl font-bold rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            Continue to My Health Dashboard
            <ArrowRight className="ml-6 w-12 h-12" />
          </button>
        </div>

        {/* Help Text */}
        <div className="text-center mt-12">
          <p className="text-2xl text-gray-600">
            Need help? Ask a family member to assist you, or call our support line
          </p>
          <p className="text-xl text-gray-500 mt-4">
            Support: 1-800-Aira-1 (Available 24/7)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElderlyInterface;