/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure this points to your file structure
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')], // Add the plugin here
};
