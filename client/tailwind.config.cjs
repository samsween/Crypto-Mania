/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#131519",
          200: "#25282C",
          300: "#191A1E",
        },
      },
    },
  },
  plugins: [],
};
