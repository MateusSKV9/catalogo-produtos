import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	plugins: [react(), visualizer({ open: true, gzipSize: true, brotliSize: true })],
	resolve: {
		alias: { "@": path.resolve(__dirname, "./src") },
	},
	build: { chunkSizeWarningLimit: 700 },
});
