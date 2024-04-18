import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'media',
  // darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        s: "var(--ff-size-s)",
        m: "var(--ff-size-m)",
        l: "var(--ff-size-l)",
        xl: "var(--ff-size-xl)",
        "2xl": "var(--ff-size-2xl)",
        "3xl": "var(--ff-size-3xl)",
        "4xl": "var(--ff-size-4xl)",
        "5xl": "var(--ff-size-5xl)",
      },
      colors: {
        lightblack: "var(--clr-black)",
        lightwhite: "var(--clr-white)"
      },
      screens: {
        sm: "640px",
        md: "960px",
        lg: "1280px",
        xl: "1600px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
