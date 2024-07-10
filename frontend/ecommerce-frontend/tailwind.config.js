/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        128: "32rem",
      },
      height: {
        128: "32rem",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        nexus: "#ffaa33",
        "nexus-shade": {
          100: "#dcecdf",
          200: "#b9d9bf",
          300: "#96c6a0",
          400: "#73b380",
          500: "#50a060",
          600: "#40804d",
          700: "#30603a",
          800: "#204026",
          900: "#102013",
        },
        galaxy: {
          100: "#7b337d",
        },
        defaultBg: "#f2f2f2",
      },
      borderRadius:{
        "50%" : "50%",
      },
      spacing:{
        '480': '480px',
        '500': '500px',
        '2000': '2000px',
        '2px':'2px',
      },
      fontFamily: {
        sans: [
          '"Inter"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [],
};
