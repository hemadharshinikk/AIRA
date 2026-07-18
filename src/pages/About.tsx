import React from 'react';
import { Mail, Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Chief Medical Officer",
    image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "sarah@swasam.com"
  },
  {
    name: "Alex Chen",
    role: "Lead Technology Engineer",
    image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "alex@swasam.com"
  },
  {
    name: "Dr. Maria Rodriguez",
    role: "Research Director",
    image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "maria@swasam.com"
  },
  {
    name: "James Wilson",
    role: "Product Manager",
    image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "james@swasam.com"
  }
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* About Us Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">About Swasam</h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
               Air is a revolutionary health monitoring platform that combines cutting-edge breath analysis 
                technology with artificial intelligence to provide early detection of various health conditions. 
                Our mission is to make healthcare more accessible, affordable, and proactive by enabling people 
                to monitor their health from the comfort of their homes.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded by a team of medical professionals and technology experts,  Aira represents the future 
                of personalized healthcare. We believe that everyone deserves access to advanced health monitoring 
                tools that can detect potential issues before they become serious medical conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              Our diverse team of experts is dedicated to revolutionizing healthcare through innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="grid md:grid-cols-2 gap-12">
          <div className="bg-blue-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To democratize healthcare by providing cutting-edge, non-invasive breath analysis technology 
              that enables early detection of health conditions. We strive to make preventive healthcare 
              accessible to everyone, regardless of their location or economic status, ultimately saving 
              lives through early intervention.
            </p>
          </div>

          <div className="bg-green-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To create a world where health monitoring is as simple as breathing. We envision a future 
              where advanced AI-powered diagnostics are integrated into daily life, enabling individuals 
              and families to maintain optimal health through continuous, effortless monitoring and 
              personalized health insights.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;