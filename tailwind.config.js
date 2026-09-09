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
          top: '#07152F',
          navy: '#0B2348',
          navyLight: '#102A52',
          saffron: '#E85D04',
          saffronDark: '#DC2F02',
          green: '#138A4B',
          red: '#D90429',
          gold: '#D4AF37',
          cream: '#FDFBF7',
          lightBg: '#F4F5F7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
