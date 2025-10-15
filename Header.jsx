import React from 'react';
import { CartIcon, LogoutIcon } from './Icons';
import logo1 from '../assets/logo1.png'; // <-- Import your logo here

const Header = ({ setView, cartItemCount, onLogout, searchTerm, onSearchChange }) => (
  <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4 gap-4">
        
        {/* --- Logo + App Name --- */}
        <div
          className="flex items-center gap-3 cursor-pointer flex-shrink-0"
          onClick={() => setView({ name: 'products' })}
        >
          <img
            src={logo1}
            alt="Namma Kadai Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain animate-pulse"
          />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            Namma Kadai
          </h1>
        </div>

        {/* --- Desktop Search Bar with Animation --- */}
        <div className="flex-grow max-w-lg hidden sm:block">
          <div
            className="p-[2px] rounded-full bg-gray-200 focus-within:bg-gradient-to-r focus-within:from-purple-500 focus-within:via-indigo-500 focus-within:to-cyan-500 focus-within:animate-gradient-border"
            style={{ backgroundSize: '200% 200%' }}
          >
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 rounded-full focus:outline-none bg-white"
            />
          </div>
        </div>

        {/* --- Cart + Logout --- */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <button
            className="relative text-gray-600 hover:text-indigo-500 transition-colors"
            onClick={() => setView({ name: 'cart' })}
            aria-label="View Cart"
          >
            <CartIcon />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cartItemCount}
              </span>
            )}
          </button>
          <button
            onClick={onLogout}
            className="text-gray-600 hover:text-red-500 transition-colors"
            aria-label="Logout"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>

      {/* --- Mobile Search Bar --- */}
      <div className="sm:hidden pb-4">
        <div
          className="p-[2px] rounded-full bg-gray-200 focus-within:bg-gradient-to-r focus-within:from-purple-500 focus-within:via-indigo-500 focus-within:to-cyan-500 focus-within:animate-gradient-border"
          style={{ backgroundSize: '200% 200%' }}
        >
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 rounded-full focus:outline-none bg-white"
          />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
