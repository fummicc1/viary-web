import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          "50": "#fff0f1",
          "100": "#ffe2e6",
          "200": "#ffcad2",
          "300": "#ff9fad",
          "400": "#ff6982",
          "500": "#ff2d55",
          "600": "#ed1145",
          "700": "#c8083b",
          "800": "#a80938",
          "900": "#8f0c37",
          "950": "#500119",
        },
      },
    },
  },
  plugins: [],
};
export default config;
