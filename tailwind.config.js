/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add these keyframes and animation properties
      keyframes: {
        
        'popup': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'gradient-move': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'slideUpFadeIn': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'popup': 'popup 1.5s ease-out forwards',
        'gradient-move': 'gradient-move 8s ease infinite',
        'slideUpFadeIn': 'slideUpFadeIn 0.7s ease-out forwards',
        'gradient-border': 'gradient-move 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}