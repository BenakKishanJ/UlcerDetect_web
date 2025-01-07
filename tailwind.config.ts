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
        primary: "#49111c",   // Main brand color
        secondary: "#5e503f", // Supporting color
        tertiary: "#a9927d",  // Additional accent
        neutral: "#f2f4f3",   // Backgrounds/subtle UI elements
        highlight: "#0a0908", // Attention-grabbing color
      },
      borderRadius: {
        lg: "var(--radius)",               // Uses CSS variable
        md: "calc(var(--radius) - 2px)",   // Slightly smaller than lg
        sm: "calc(var(--radius) - 4px)",   // Smallest radius
      },
    },
  },
  plugins: [tailwindcssAnimate], // Adds animation utilities
} satisfies Config;
