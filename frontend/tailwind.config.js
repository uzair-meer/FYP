/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      headings: "1.8rem",
      paragraph: "1.1rem",
    },
    extend: {
      colors: {
        primary: "#E4503A",
        secondary: "#C9CAC866",
        sky: "#557cf2",
      },
    },
  },
  plugins: [],
};
