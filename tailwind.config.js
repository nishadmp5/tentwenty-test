/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}", // Include your React components and HTML files
  ],
  theme: {
    extend: {
      fontFamily: {
        'work-sans': ['"Work Sans"', 'sans-serif'],
      },
      colors:{
        'contactsBg': '#FFFCFA',
        'contactsText': '#221F20',
        'titleText': '#EEF4F9',
        'productsTitle': '#7A7777',
      }
    },
  },
  plugins: [],
};
