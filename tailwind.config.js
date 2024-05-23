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
      colors: {
        primary: {
          default: "#0D0D0D",
          hover: "#F2E205"
        },
        secondary: "#736B62",
        accent: {
          default: "#EAF205",
          secondary: "#BF9D7E",
        },
      },
    },
  },
  plugins: [flowbitePlugin],
};
