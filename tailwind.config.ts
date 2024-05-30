import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'body': ['"PP Pangram Sans"', '"Open Sans"']
    },
    colors: {
      bluredbackground: "rgba(14, 14, 16, 0.8)",
      mainbackground: "#FFFFFF"
    },
    borderRadius: {
      buttonborder: "12px",
      popupborder: "24px"
    },
    fontSize: {
      basic: "14px",
      button: "16px",
      subheading: "20px"
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
    },
  },
  plugins: [],
};
export default config;
