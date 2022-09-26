const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*",
    "./app/inputs/**/*.rb",
    "./app/views/**/*",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/aspect-ratio"),
    // require("@tailwindcss/typography"),
  ],
};