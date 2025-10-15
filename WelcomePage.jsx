import React from 'react';
import logo1 from '../assets/logo1.png';



const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 overflow-hidden">
      {/* Logo with smooth float & glow animation */}
      <img
        src={logo1}
        alt="Namma Kadai Logo"
        className="w-40 h-40 mb-8 animate-floatUp animate-pulseGlow"
      />

      {/* Stylish App Name with gradient text animation */}
      <h1
        className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 animate-floatUp tracking-wide"
      >
        Namma Kadai
      </h1>

      {/* Tagline or subtitle */}
      <p className="mt-4 text-lg sm:text-xl text-gray-600 animate-floatUp opacity-80 delay-100">
        Your Own Shopping Experience
      </p>
    </div>
  );
};

export default WelcomePage;
