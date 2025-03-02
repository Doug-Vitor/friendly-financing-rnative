/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#8bff00',
          dark: '#5ed600',
        },
        secondary: {
          light: '#008900',
          dark: '#005400',
        },
        typography: {
          light: '#212121',
          dark: '#fff',
        },
        background: {
          light: '#fff',
          dark: '#000',
        },
      },
    },
  },
  plugins: [],
};
