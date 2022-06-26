const brandColors = {
  "birdBlue": '#1D9BF0',
  "platinum": '#E7E9EA',
  "silver": '#71767B',
  "onix": '#333639',
  "richBlack": '#15202B',
  "RichBlack": "#15202B",
  "Onix": "#333639",
  "Silver": "#71767B",
  "Platinum": "#E7E9EA",
  "Blue": "#1D9BF0",
  "Red": "red"
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...brandColors,
        backgroundColor: brandColors.richBlack,
        textColor: brandColors.platinum,
      }
    },
  },
  plugins: [],
}