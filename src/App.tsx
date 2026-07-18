import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AgeSelection from './pages/AgeSelection';
import KidsInterface from './pages/KidsInterface';
import AdultsInterface from './pages/AdultsInterface';
import ElderlyInterface from './pages/ElderlyInterface';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/age-selection" element={<AgeSelection />} />
            <Route path="/kids" element={<KidsInterface />} />
            <Route path="/adults" element={<AdultsInterface />} />
            <Route path="/elderly" element={<ElderlyInterface />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;