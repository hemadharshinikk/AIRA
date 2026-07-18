import React from 'react';
import { Settings as Lungs, Heart, Shield, Users, Clock, Activity } from 'lucide-react';

const services = [
  {
    icon: Lungs,
    title: "Respiratory Health Analysis",
    description: "Comprehensive breath analysis to detect early signs of respiratory conditions including asthma, COPD, and lung infections.",
    features: ["Real-time breath pattern analysis", "Lung capacity measurement", "Inflammation indicators", "Air quality impact assessment"]
  },
  {
    icon: Heart,
    title: "Cardiovascular Monitoring",
    description: "Monitor heart health through breath analysis patterns that can indicate cardiovascular stress and circulation issues.",
    features: ["Heart rate variability", "Blood oxygen levels", "Circulation analysis", "Stress level indicators"]
  },
  {
    icon: Shield,
    title: "Disease Detection",
    description: "Early detection system for various conditions including diabetes, cancer markers, TB, and other systemic diseases.",
    features: ["Cancer biomarker detection", "Diabetes indicators", "TB screening", "Allergy identification"]
  },
  {
    icon: Users,
    title: "Family Health Management",
    description: "Comprehensive family health tracking with personalized interfaces for different age groups and health needs.",
    features: ["Multi-user accounts", "Age-appropriate interfaces", "Family health trends", "Shared health insights"]
  },
  {
    icon: Clock,
    title: "Daily Health Tracking",
    description: "Continuous health monitoring with daily tracking capabilities and long-term trend analysis.",
    features: ["Daily health scores", "Progress tracking", "Streak monitoring", "Historical data analysis"]
  },
  {
    icon: Activity,
    title: "Real-time Health Dashboard",
    description: "Interactive dashboard with organ health visualization, real-time monitoring, and actionable health insights.",
    features: ["Organ health percentages", "ECG-style visualizations", "Health speedometer", "Personalized recommendations"]
  }
];

const Services: React.FC = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Services</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Swasam offers a comprehensive suite of health monitoring services powered by advanced 
            breath analysis technology. Discover how we can help you take control of your health.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-6">
                <service.icon className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <section className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How Swasam Works</h2>
            <p className="text-lg text-gray-600">
              Our advanced breath analysis process is simple, non-invasive, and highly accurate
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Breath Collection</h3>
              <p className="text-gray-600">
                Use our specialized hardware device to collect your breath sample in a comfortable, 
                non-invasive way that takes just minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our advanced AI algorithms analyze your breath composition to identify potential 
                health markers and patterns.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Instant Results</h3>
              <p className="text-gray-600">
                Receive comprehensive health insights and recommendations through your personalized 
                dashboard immediately.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;