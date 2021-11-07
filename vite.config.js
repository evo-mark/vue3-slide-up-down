import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue({ refTransform: true })],
	root: "demo",
	server: {
		port: 3333,
	},
});
