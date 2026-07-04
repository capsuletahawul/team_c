/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#164961",
          teal: "#387B84",
          "teal-light": "#7FB1BC",
          slate: "#537E84",
          indigo: "#343A60",
          yellow: "#FFD369",
          offwhite: "#F0F5F9",
          gray: "#C9D6DF",
          green: "#3E5F44",
          amber: "#D19E22",
        },
      },
      fontFamily: {
        sans: ["RH Zak", "Tahoma", "Arial", "sans-serif"],
        display: ["Air Strip Arabic", "Tahoma", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
