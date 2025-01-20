import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"], // Enables class-based dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Scans these directories for class usage
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4B88A2", // Main brand color #49111c
        secondary: "#AA968A", // Supporting color
        tertiary: "#252627", // Additional accent
        neutral: "#D3D4D9", // Backgrounds/subtle UI elements
        highlight: "#BB0A21", // Attention-grabbing color
      },
      borderRadius: {
        lg: "var(--radius)", // Uses CSS variable
        md: "calc(var(--radius) - 2px)", // Slightly smaller than lg
        sm: "calc(var(--radius) - 4px)", // Smallest radius
      },
    },
  },
  plugins: [tailwindcssAnimate], // Adds animation utilities
} satisfies Config;
