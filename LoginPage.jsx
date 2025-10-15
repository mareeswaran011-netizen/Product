import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 p-6">
      <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-10 space-y-8 animate-slideInUp">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 text-center">
          Welcome to <br /> Namma Kadai
        </h1>

        {/* Toggle Buttons */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setIsLoginView(true)}
            className={`flex-1 py-3 font-semibold transition-colors ${
              isLoginView
                ? 'text-white border-b-4 border-indigo-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginView(false)}
            className={`flex-1 py-3 font-semibold transition-colors ${
              !isLoginView
                ? 'text-white border-b-4 border-indigo-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLoginView && (
            <div className="animate-fadeIn">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

         
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-transform transform hover:scale-105 text-white font-semibold shadow-lg"
          >
            {isLoginView ? 'Login' : 'Create Account'}
          </button>

         
          <button
            type="button"
            onClick={() => onLogin('guest')}
            className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white font-semibold shadow-md"
          >
            Continue without login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
