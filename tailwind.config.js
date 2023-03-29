/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--roboto)"],
        notoSans: ["var(--notoSansKr)"],
      },
    },
  },
  plugins: [],
};
