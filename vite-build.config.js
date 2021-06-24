import vue from "@vitejs/plugin-vue";
import path from "path";

export default {
	plugins: [vue()],
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/vue3-slide-up-down.js"),
			name: "Vue3SlideUpDown",
			formats: ["es", "umd", "cjs"],
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
		sourcemap: true,
	},
};
