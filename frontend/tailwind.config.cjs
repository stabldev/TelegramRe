/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		extend: {
			animation: {
				enter: "enter .2s ease-out",
				leave: "leave .15s ease-in forwards"
			},
			keyframes: {
				enter: {
					"0%": {
						opacity: "0",
						transform: "scale(.9)"
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)"
					}
				},
				leave: {
					"0%": {
						opacity: "1",
						transform: "scale(1)"
					},
					"100%": {
						opacity: "0",
						transform: "scale(.9)"
					}
				}
			}
		}
	},
	daisyui: {
		themes: [
			{
				dark_re: {
					"primary": "#8774e1",
					"secondary": "#aaaaaa",
					"accent": "#FFFFFF",
					"neutral": "#2B2B2B",
					"base-100": "#212121",
				},
			},
		],
	},
	plugins: [require("daisyui")],
};
