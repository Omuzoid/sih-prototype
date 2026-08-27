/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0A192F',
          navyLight: '#112240',
          blue: '#1E3A8A',
          saffron: '#FF9933',
          saffronDark: '#D97706',
          green: '#138808',
          greenLight: '#16A34A',
          ash: '#4B5563',
          lightBg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
