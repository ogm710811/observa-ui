import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { Optimist: 'Optimist, sans-serif' },
      colors: {
        primary: '#013d5b',
        favorable: '#1f7d08',
        warning: '#8f5400',
        critical: '#cc2427',
      },
      animation: {
        spin: 'spin 1s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
