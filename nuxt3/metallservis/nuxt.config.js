export default defineNuxtConfig({
  components: [{ path: "~/components/", pathPrefix: false }],
  css: [
    "modern-css-reset",
    "~/assets/styles/fonts.scss",
    "~/assets/styles/utilities.scss",
    "~/assets/styles/utilities.old.scss",
  ],
  imports: {
    dirs: ["./stores/"],
  },
  modules: [
    [
      "@nuxtjs/i18n",
      {
        locales: [
          { code: "en", name: "English", iso: "en-US" },
          { code: "ru", name: "Русский", iso: "ru-RU" },
        ],
        defaultLocale: "ru",
        strategy: "prefix_except_default",
        vueI18n: "./i18n.config.js",
      },
    ],
    ["@nuxtjs/html-validator", { usePrettier: true, failOnError: true }],
    "@nuxtjs/fontaine",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore"],
      },
    ],
    "@vueuse/nuxt",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "~/assets/styles/variables.scss";
            @import "~/assets/styles/mixins.scss";
            @import "~/assets/styles/mixins.old.scss";
          `,
        },
      },
    },
  },
});
