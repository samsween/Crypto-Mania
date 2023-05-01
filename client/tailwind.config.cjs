/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "change-red": {
          "0%, 100%": { color: "" },
          "50%": { color: "#25282C" },
        },
        "change-green": {
          "0%, 100%": { color: "#131519" },
          "50%": { color: "#191A1E" },
        },
      },
      colors: {
        primary: {
          100: "#131519",
          200: "#25282C",
          300: "#191A1E",
        },
      },
      animation: {
        "animate-change-red": "change-red 1s ease-in-out",
        "animate-change-green": "change-green 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
