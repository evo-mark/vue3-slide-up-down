const colours = require("tailwindcss/colors");

module.exports = {
	mode: "jit",
	purge: ["./demo/**/*.{js,vue}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			saturate: {
				500: "5",
			},
		},
		colors: {
			blue: colours.blue,
			primary: "#41b883",
			secondary: "#34495e",
			white: "#fff",
			current: "currentColor",
		},
	},
	variants: {
		extend: {
			saturate: ["hover", "focus"],
			sepia: ["hover", "focus"],
		},
	},
	plugins: [],
};
