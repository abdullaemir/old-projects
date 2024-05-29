import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "./../build/",
    emptyOutDir: true
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./source/"),
    },
  },
  root: resolve(__dirname, "./source/"),
  server: {
    port: 8080,
  },
});
