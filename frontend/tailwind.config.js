/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        headings: "1.8rem",
        paragraph: "1.1rem",
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Default font for body text
        heading: ['Montserrat', 'sans-serif'], // Specific font for headings
      },
      colors: {
        primary: "#E4503A",
        secondary: "#C9CAC866",
        sky: "#557cf2",
        redish: "#FEF8F8",
      },
    },
  },
  plugins: [],
};
