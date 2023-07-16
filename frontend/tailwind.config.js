/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#137576",
        secondary: "#E5CDA7",
      },
      fontFamily: {
        quickSand: ["Quicksand"],
      },
    },
  },
  plugins: [],
}
