import type { Config } from "tailwindcss";
const withMT = require('@material-tailwind/react/utils/withMT')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
    },
  },
	plugins: [
		require('tailwind-scrollbar-hide'),
	],
};

module.exports = withMT(config)

