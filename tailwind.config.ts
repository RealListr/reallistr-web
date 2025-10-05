import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",       // (if you have non-src app/)
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",     // (if you have non-src pages/)
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;