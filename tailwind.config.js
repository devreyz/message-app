/** @type {import('tailwindcss').Config} */
const colors = require('./src/constants/colors.json');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        // Tema claro
        light: colors.light,
        // Tema escuro
        dark: colors.dark
      }
    }
  },
  plugins: []
};
