/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tdb: {
          green: '#26412C',
          dark: '#1a2e1f',
          cream: '#f1e9db',
          lightCream: '#fbf8f2',
          border: '#d8cebc',
          accent: '#48bb78',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Jost', 'sans-serif'],
        serif: ['EB Garamond', 'Georgia', 'serif'],
        arabic: ['Amiri', 'Traditional Arabic', 'serif'],
      }
    },
  },
  plugins: [],
}
