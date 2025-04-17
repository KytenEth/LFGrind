/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-neon': '#00ffaa',
        'cyber-teal': '#00b3a1',
        'cyber-aqua': '#00e5ff',
        'cyber-blue': '#0077ff',
        'background-dark': '#0a0a0a',
      },
    },
  },
  plugins: [],
} 