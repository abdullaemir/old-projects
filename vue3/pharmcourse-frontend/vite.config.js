import path, { dirname } from "path";
import { fileURLToPath } from "url";

import graphql from "@rollup/plugin-graphql";
import replace from "@rollup/plugin-replace";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import viteSSR from "vite-ssr/plugin.js";

const dirName = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    assetsDir: "vue-assets",
    sourcemap: "hidden",
  },
  css: {
    devSourcemap: true,
  },
  esbuild: {
    legalComments: "none",
    minify: true,
    treeShaking: true,
  },
  plugins: [
    graphql(),
    viteSSR(),
    vue(),
    replace({
      __SENTRY_DEBUG__: false,
      __SENTRY_TRACING__: false,
    }),
  ],
  resolve: {
    alias: {
      "~/": `${path.resolve(dirName, "src")}/`,
    },
  },
  server: {
    proxy: {
      "/api": {
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/api/u, ""),
        target: "https://test.pharmcourse.com/api",
      },
      "/graphql": {
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/graphql/u, ""),
        target: "https://test.pharmcourse.com/graphql",
      },
      "/sentry": {
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/sentry/u, ""),
        target: "https://test.pharmacourse.com/sentry",
      },
    },
  },
});
