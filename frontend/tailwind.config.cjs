/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    boxShadow: {
      DEFAULT: "0 4px 4px 0 rgb(0 0 0 / 0.04)",
      l: "0 4px 4px 0 rgb(0 0 0 / 0.25)",
      none: "none"
    },
    colors: {
      transparent: "transparent",
      primary: "rgb(var(--primary) / <alpha-value>)",
      "base-100": "rgb(var(--base-100) / <alpha-value>)",
      "base-200": "rgb(var(--base-200) / <alpha-value>)",
      "base-300": "rgb(var(--base-300) / <alpha-value>)",
      "neutral-100": "rgb(var(--neutral-100) / <alpha-value>)",
      "neutral-200": "rgb(var(--neutral-200) / <alpha-value>)",
      "neutral-300": "rgb(var(--neutral-300) / <alpha-value>)",
      accent: "rgb(var(--accent) / <alpha-value>)",
      error: "rgb(var(--error) / <alpha-value>)"
    }
  },
  plugins: []
};
