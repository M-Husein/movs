/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  separator: '_',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '1': '1',
        '2': '2',
      },
      aspectRatio: {
        '4x3': '4 / 3',
        '21x9': '21 / 9',
        '9x16': '9 / 16',
      },
      fontSize: {
        '0': '0',
      },
    },
  },
  plugins: [],
}

