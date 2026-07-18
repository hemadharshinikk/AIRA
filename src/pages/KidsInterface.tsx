import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, Smile, ArrowRight, Play, Sparkles, Wind } from 'lucide-react';

const KidsInterface: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Star className="w-10 h-10 text-yellow-500 animate-pulse" />
            <h1 className="text-5xl font-bold text-purple-600">Hi There, Little Star!</h1>
            <Star className="w-10 h-10 text-yellow-500 animate-pulse" />
          </div>
          <p className="text-2xl text-gray-700">Let's check how healthy you are today! It's going to be super fun! 🌟</p>
        </div>

        {/* Visual Instructions Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-12">
          <h2 className="text-4xl font-bold text-center text-purple-600 mb-8">
            <Sparkles className="inline w-10 h-10 mr-2" />
            How to Use Aira - It's Like Magic!
            <Sparkles className="inline w-10 h-10 ml-2" />
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl font-bold text-white mx-auto shadow-lg">
                  1
                </div>
                <div className="absolute -top-2 -right-2 animate-bounce">
                  <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🌸</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Take a Deep Breath</h3>
              <div className="bg-yellow-50 p-4 rounded-2xl mb-4">
                <p className="text-lg text-gray-700">Breathe in slowly through your nose, like you're smelling beautiful flowers! 🌺</p>
              </div>
              <div className="text-6xl mb-2">👃</div>
              <p className="text-sm text-gray-600">Just like when you smell cookies baking!</p>
            </div>

            {/* Step 2 */}
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-4xl font-bold text-white mx-auto shadow-lg">
                  2
                </div>
                <div className="absolute -top-2 -right-2 animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                    <Wind className="text-white w-4 h-4" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Breathe Out Slowly</h3>
              <div className="bg-green-50 p-4 rounded-2xl mb-4">
                <p className="text-lg text-gray-700">Blow out gently into our special device, like blowing out birthday candles! 🎂</p>
              </div>
              <div className="text-6xl mb-2">🫧</div>
              <p className="text-sm text-gray-600">Make bubbles with your breath!</p>
            </div>

            {/* Step 3 */}
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-4xl font-bold text-white mx-auto shadow-lg">
                  3
                </div>
                <div className="absolute -top-2 -right-2 animate-bounce" style={{ animationDelay: '1s' }}>
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">⭐</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">See Your Results!</h3>
              <div className="bg-purple-50 p-4 rounded-2xl mb-4">
                <p className="text-lg text-gray-700">Watch the colorful dashboard show how healthy you are! 🌈</p>
              </div>
              <div className="text-6xl mb-2">📊</div>
              <p className="text-sm text-gray-600">Like a fun video game score!</p>
            </div>
          </div>
        </div>

        {/* Fun Interactive Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-pink-300 to-pink-500 rounded-3xl p-8 text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="text-center">
              <Heart className="w-16 h-16 mx-auto mb-4 animate-bounce" />
              <h3 className="text-3xl font-bold mb-4">Your Health Journey</h3>
              <p className="text-xl mb-6">
                We're going to look at your breathing to make sure everything is working perfectly inside your body!
              </p>
              <div className="bg-white bg-opacity-20 rounded-2xl p-4">
                <p className="text-lg font-medium">It's like magic - just breathe and we'll know if you're super healthy! ✨</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-300 to-blue-500 rounded-3xl p-8 text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="text-center">
              <Smile className="w-16 h-16 mx-auto mb-4 animate-bounce" />
              <h3 className="text-3xl font-bold mb-4">Fun & Safe</h3>
              <p className="text-xl mb-6">
                Don't worry! This won't hurt at all. It's actually fun - like blowing bubbles but for your health!
              </p>
              <div className="bg-white bg-opacity-20 rounded-2xl p-4">
                <p className="text-lg font-medium">Your parents can see everything too, so you're always safe! 👨‍👩‍👧‍👦</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            Let's Go to My Dashboard! 🚀
            <ArrowRight className="ml-3 w-8 h-8" />
          </button>
        </div>

        {/* Fun Animation Elements */}
        <div className="fixed top-10 left-10 animate-bounce">
          <Star className="w-6 h-6 text-yellow-400" />
        </div>
        <div className="fixed top-20 right-20 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <Heart className="w-6 h-6 text-pink-400" />
        </div>
        <div className="fixed bottom-20 left-20 animate-bounce" style={{ animationDelay: '1s' }}>
          <Smile className="w-6 h-6 text-blue-400" />
        </div>
        <div className="fixed bottom-10 right-10 animate-bounce" style={{ animationDelay: '1.5s' }}>
          <Sparkles className="w-6 h-6 text-purple-400" />
        </div>
      </div>
    </div>
  );
};

export default KidsInterface;