/** @type {import('tailwindcss').Config} */
const colors = require('./src/constants/colors.json');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: colors.light,
        dark: colors.dark
      }
    }
  },
  plugins: [],
};
