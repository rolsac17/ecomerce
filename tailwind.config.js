const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      'transparent': 'transparent',
      'current': 'currentColor',
      'blue': {
        ...colors.blue,
        DEFAULT: '#0066b2',
      },
      'greenBlue': '#0062AC',
      'cblue-500': '#01517c',
      'cblue-100': '#027ba6',
      'cblue-50': '#005f8b',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar-hide')],
};
