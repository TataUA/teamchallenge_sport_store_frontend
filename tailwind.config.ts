import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      pangram: ["PP Pangram Sans", "sans-serif"],
      nunito: ["Nunito_Sans", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    extend: {
      container: {
        center: true,
        screens: {
          DEFAULT: "100%",
          xl: "1440",
        },
      },
      screens: {
        "608": "608px",
        xl: "1440px",
        "1440": "1440px",
        "custom-height-mq": {
          raw: "((max-height: 1200px))",
        },
      },
      lineHeight: {
        "114": "114%",
        "129": "129%",
        "140": "140%", //використовуємо клас leading-140
        "150": "150%",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "colorful-circle":
          "radial-gradient(circle at top left, #00ffff, #0080ff, #8000ff, #ff00ff, #ff0080, #ff8000, #ffff00)",
      },
      width: {
        "18": "72px",
      },
      height: {
        "144": "574px",
      },
      margin: {
        "55": "165px",
      },
      letterSpacing: {
        custom_2: "0.02em", //2% - використовуємо клас tracking-custom_2
        custom_4: "0.04em",
      },
      colors: {
        primary: "#272728",
        secondary: "#575758",
        title: "#1A1A1C",
        common: "#3E3E40",
        label: "#868687",
        border: "#CFCFCF",
        border_button: "#E7E7E8",
        white: "#fff",
        gray: "#6E6E70",
        blue: "#0A4CF6",
        blue_trans5: "rgba(10, 76, 246, 0.05)",
        active_blue: "#0735AC",
        active_lightblue: "#E7EDFE",
        red: "#DF0707",
        green: "#42BE65",
        bgSearch: "#F3F3F3",
        timer: "#b7b7b8",
        blured: "rgba(14, 14, 16, 0.4)",
      },
    },
  },

  plugins: [
    // implemantation price filter with slider-thumb
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        ".appearance-none::-webkit-slider-thumb": {
          "-webkit-appearance": "none",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: "#0A4CF6",
          cursor: "pointer",
          pointerEvents: "auto",
          "@screen xl": {
            backgroundColor: "#FFFFFF",
            border: "1px solid #DBDBDB",
          },
        },

        ".appearance-none::-moz-range-thumb": {
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "#0A4CF6",
          cursor: "pointer",
          pointerEvents: "auto",
          "@screen xl": {
            backgroundColor: "#FFFFFF",
            border: "1px solid #DBDBDB",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
export default config;
