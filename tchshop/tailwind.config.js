/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orangeTime: '321C3A',
        paymentBtn: 'rgba(2 173 148)' ,
      },
    },
  },
  plugins: [],
}