/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'picton-blue': '#00a7e1',
        'poppy': '#df2935',
        'onyx': '#3D3D3D',
        'ivory': '#FFFFF2',
        'jet': '#292929',
      }
    },
  },
  plugins: [],
}

