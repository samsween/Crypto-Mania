/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        changeRed: {
          "0%, 100%": { color: "inherent" },
          "50%": { color: "#FF0000" },
        },
        changeGreen: {
          "0%, 100%": { color: "inherent" },
          "50%": { color: "#00FF00" },
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
        change_red: "changeRed 1s ease-in-out",
        change_green: "changeGreen 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
