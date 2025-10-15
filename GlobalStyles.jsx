import React from 'react';

const GlobalStyles = () => (
    <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes background-pan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-background-pan { animation: background-pan 15s linear infinite; }
        .stagger-in > * {
            animation: slideInUp 0.5s ease-out both;
        }
    `}</style>
);

export default GlobalStyles;