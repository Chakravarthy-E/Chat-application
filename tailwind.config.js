/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#8051f9",
        thickgreen: "#055555",
        white: "#ffffff",
        brown: "#393939",
        lightBrown: "#8a8888",
        constrast: "#f8f8f8",
        thickblue: "#190482",
        skyblue: "#7752FE",
        lightSky: "#8E8FFA",
        constrastSky: "#C2D9FF",
        light: "#EEF5FF",
        light2: "#F5F7F8",
      },
      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
        obi: ["Orbitron", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
