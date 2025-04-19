/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0a0a1a',
        'cyber-neon': '#00ffaa',
        'cyber-teal': '#00b3a1',
        'cyber-aqua': '#00e5ff',
        'cyber-blue': '#0077ff',
        'cyber-indigo': '#1a1a3a',
        'cyber-violet': '#3a1a5a',
      },
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'],
        'accent': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 10px var(--tw-shadow-color)',
        'neon-lg': '0 0 20px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [],
} 