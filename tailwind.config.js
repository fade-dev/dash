/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'cta-button': '#4A82EF',
        nav: '#2F2F2F',
      },
      borderColor: {
        'nav-button': '#454545;',
      },
    },
  },
  plugins: [],
}
