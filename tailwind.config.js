import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.jsx",
  ],
  theme: {
    container: {
      padding: {
        default: "15px",
      },
      color: {
      button: "#F2E30F",
    },
  },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontFamily: {
      primary: "Poppins",
      secondary: "Lexend",
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: { 
        button: "#F2E30F",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
