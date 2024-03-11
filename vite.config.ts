import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@views": "/src/views",
      "@utils": "/src/utils",
      "@components": "/src/components",
      "@typings": "/src/typings",
      "@reducers": "/src/reducers",
      "@definitions": "/src/definitions",
      "@containers": "/src/containers",
      "@layouts": "/src/layouts",
      "@routes": "/src/routes",
      "@signals": "/src/signals",
    },
  },
  build: {
    minify: process.env.BUILD_DEV ? false : "terser",
  },
});
