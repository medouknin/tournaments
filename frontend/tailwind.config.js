/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				darkBlue: "#001529",
				main: "#136d15",
			},
		},
	},
	plugins: [],
};

