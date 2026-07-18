import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Activity, Heart, Stethoscope, Microscope } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Column Layout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Quote and Details Column */}
            <div className="text-white">
              <div className="mb-8">
                <Stethoscope className="w-16 h-16 text-blue-200 mb-4" />
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Your Health, Our Priority
                </h1>
                <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8 border-l-4 border-blue-300">
                  <blockquote className="text-xl md:text-2xl italic text-blue-100 mb-4">
                    "Early detection saves lives. With Swasam's advanced breath analysis technology, 
                    monitor your respiratory health and detect potential conditions before they become serious."
                  </blockquote>
                  <cite className="text-blue-200 font-medium">- Aira  Medical Team</cite>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Microscope className="w-6 h-6 text-blue-300 mr-3" />
                  <p className="text-lg text-blue-100">Advanced breath analysis technology</p>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-blue-300 mr-3" />
                  <p className="text-lg text-blue-100">Early detection of respiratory conditions</p>
                </div>
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-blue-300 mr-3" />
                  <p className="text-lg text-blue-100">Non-invasive and painless testing</p>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-blue-300 mr-3" />
                  <p className="text-lg text-blue-100">Family health monitoring system</p>
                </div>
              </div>

              <Link
                to="/services"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg text-lg"
              >
                Explore Our Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* Image Column */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Health Monitoring Technology"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent rounded-2xl"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-xl z-20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-xl z-20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5min</div>
                  <div className="text-sm text-gray-600">Quick Test</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Conditions Detection */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Comprehensive Health Detection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced breath analysis can detect early symptoms of various health conditions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Cancer', color: 'red', icon: '🎗️' },
              { name: 'Asthma', color: 'blue', icon: '🫁' },
              { name: 'Tuberculosis (TB)', color: 'orange', icon: '🦠' },
              { name: 'Diabetes', color: 'purple', icon: '🩸' },
              { name: 'Allergies', color: 'green', icon: '🤧' },
              { name: 'Respiratory Issues', color: 'indigo', icon: '💨' }
            ].map((condition, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{condition.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-800">{condition.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Early detection through breath analysis with simple Yes/No results
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Detection Status:</span>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Yes</span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">No</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Aira?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary health monitoring through advanced breath analysis technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Early Detection</h3>
              <p className="text-gray-600 text-lg">
                Detect symptoms of various health conditions early through advanced breath analysis
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Family Care</h3>
              <p className="text-gray-600 text-lg">
                Monitor the health of your entire family with personalized interfaces for all ages
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Real-time Monitoring</h3>
              <p className="text-gray-600 text-lg">
                Track health metrics in real-time with interactive dashboards and daily tracking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who trust Aira for their health monitoring needs. 
            Start your journey to better health today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg text-lg"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition-colors text-lg"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;