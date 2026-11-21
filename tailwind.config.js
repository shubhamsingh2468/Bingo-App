/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bingo: {
          navy: '#0F172A',
          blue: '#2563EB',
          cyan: '#0EA5E9',
          green: '#22C55E',
          orange: '#F97316',
        },
      },
    },
  },
  plugins: [],
};
