import vue from "@vitejs/plugin-vue";
import path from "path";

export default {
	plugins: [
		vue({
			refTransform: true,
		}),
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/index.js"),
			name: "Vue3SlideUpDown",
			formats: ["es", "umd", "cjs", "iife"],
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
	},
};
