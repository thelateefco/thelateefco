import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["PT Serif", "Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        cream: "#ECE6DF",
        dark: "#1A1A1A",
        mid: "#4A4A4A",
        muted: "#8A8A8A",
        hair: "#D0C9C1",
      },
    },
  },
  plugins: [],
};

export default config;