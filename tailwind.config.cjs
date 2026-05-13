/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'esports-dark': '#0a0e27',
        'esports-darker': '#050812',
      },
    },
  },
  plugins: [],
}
