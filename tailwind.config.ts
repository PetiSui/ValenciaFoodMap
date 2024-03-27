import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
      },
      screens: {
        sm: "640px",
        md: "960px",
        lg: "1280px",
        xl: "1600px",
      },
    },
  },
  plugins: [],
};
export default config;
