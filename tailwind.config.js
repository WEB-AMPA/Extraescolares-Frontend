/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.jsx",
  ],
  theme: {
    extend: {},
    color: {
      button: "#F2E30F",
    },
  },
  plugins: [require("flowbite/plugin")],
};


