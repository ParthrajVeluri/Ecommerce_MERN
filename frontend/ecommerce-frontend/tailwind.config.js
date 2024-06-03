/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
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
                defaultBg: "#f2f2f2"
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
