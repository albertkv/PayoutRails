import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#05060f",
          800: "#0a0b1a",
          700: "#11132b",
          600: "#1a1d3d",
        },
        iris: {
          DEFAULT: "#6d5ef9",
          300: "#a78bfa",
          500: "#7c6cff",
          700: "#4f3fd8",
        },
        aqua: {
          DEFAULT: "#22d3ee",
          300: "#67e8f9",
        },
        lime: {
          DEFAULT: "#a3e635",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(124,108,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,108,255,0.08) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(109,94,249,0.15), transparent 70%)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        "pulse-ring": "pulse-ring 3s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
