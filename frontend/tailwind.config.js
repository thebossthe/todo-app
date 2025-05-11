/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}' // Tailwind がクラスをスキャンする場所を指定
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}