/** @type {import('tailwindcss').Config} */
const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'] 
      },
    },
  },
  plugins: [],
}
