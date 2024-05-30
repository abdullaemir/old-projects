module.exports = {
  axios: {

  },
  build: {
    extractCSS: true,
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [

  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/styles/main.css"
  ],
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: "ru",
    },
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
      {
        rel: "icon",
        href: "/icon.svg",
        type: "text/svg+xml",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
      },
    ],
    meta: [
      {
        charset: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        hid: "description",
        content: "",
        name: "description",
      },
      {
        content: "telephone=no",
        name: "format-detection",
      },
      {
        content: "",
        name: "og:site_name",
      },
      {
        content: "",
        name: "og:site_name",
      },
      {
        name: "og:url",
        content: "",
      },
      {
        name: "og:title",
        content: "",
      },
      {
        name: "og:description",
        content: "",
      },
      {
        name: "og:image",
        content: "",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:image",
        content: "",
      },
    ],
    title: "alisa-spa",
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    // Simple usage
    [
      "nuxt-mq",
      {
        breakpoints: {
          mobile: 768,
          tablet: 1024,
          laptop: 1280,
          desktop: Infinity
        },
      },
    ],
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/axios",
  ],
  render: {
    bundleRenderer: {
      runInNewContext: false,
    },
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      return {
        x: 0,
        y: 0,
      };
    },
  },
};
