import { defineConfig } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: { minify: true },
  plugins: [react(), ViteMinifyPlugin({})],
});
