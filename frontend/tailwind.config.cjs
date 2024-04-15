/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
        colors: {
            "primary": "var(--primary)",
            "base-100": "var(--base-100)",
            "base-200": "var(--base-200)",
            "base-300": "var(--base-300)",
            "neutral-100": "var(--neutral-100)",
            "neutral-200": "var(--neutral-200)",
            "accent": "var(--accent)",
        },
    },
	plugins: [],
};
