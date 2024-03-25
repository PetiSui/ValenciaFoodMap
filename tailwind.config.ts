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
        's': 'var(--ff-size-s)',
        'm': 'var(--ff-size-m)',
        'l': 'var(--ff-size-l)',
        'xl': 'var(--ff-size-xl)',
        '2xl': 'var(--ff-size-2xl)',
      },
    },
  },
  plugins: [],
};
export default config;
