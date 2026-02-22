import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f766e",
          dark: "#0d9488",
          light: "#14b8a6",
          muted: "#ccfbf1",
        },
        accent: {
          DEFAULT: "#d97706",
          light: "#f59e0b",
          muted: "#fef3c7",
        },
        surface: {
          DEFAULT: "#fafaf9",
          card: "#ffffff",
          border: "#e7e5e4",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
