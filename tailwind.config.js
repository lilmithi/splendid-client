/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        mdPro: "1020px",
        mdMore: "762px",
        lgPro: "1087px",
      },
    },
  },
  plugins: [],
};
