/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1a1a1a",
        primary: "#FFC107",
        dark: "#2C2C2C",
        darkGray: "#3a3a3a",
      },
    },
  },
  plugins: [],
};
