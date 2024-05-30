import { InMemoryCache } from "@apollo/client/core";
import { useTokenStore } from "@pg/helpers";
import { BrowserTracing } from "@sentry/tracing";
import { init, vueRouterInstrumentation } from "@sentry/vue";
import { createHead } from "@vueuse/head";
import { createPinia } from "pinia";
import { viteSSR } from "vite-ssr/vue";

import UseMetric from "~/assets/scripts/functions/UseMetric.js";
import { dsn, tunnel } from "../.sentryrc.json";

import apolloClient from "./api/graphql/index.js";
import App from "./App.vue";
import layouts from "./layouts/index.js";
import locales from "./locales/index.js";
import middlewares from "./middlewares/index.js";
import routes from "./router/routes.js";
import useUserStore from "./stores/user.js";

const viteSSRConfig = {
  pageProps: {
    passToPage: false,
  },
  routerOptions: {
    scrollBehavior() {
      return {
        top: 0,
      };
    },
  },
  routes,
  transformState(state, defaultTransformer) {
    if (import.meta.env.SSR) {
      state.apolloCache = state.apolloCache.extract();
    }

    return defaultTransformer(state);
  },
};

export default viteSSR(App, viteSSRConfig, async ({ app, initialState, isClient, router, response, request, url }) => {
  if (import.meta.env.MODE === "production") {
    init({
      app,
      dsn,
      environment: import.meta.env.MODE,
      integrations: [
        new BrowserTracing({
          routingInstrumentation: vueRouterInstrumentation(router),
        }),
      ],
      tracesSampleRate: 1.0,
      trackComponents: true,
      tunnel,
    });
  }

  const pinia = createPinia();
  const head = createHead();

  if (isClient) {
    initialState.apolloCache = new InMemoryCache().restore(initialState.apolloCache);
    pinia.state.value = initialState.pinia;
  } else {
    initialState.apolloCache = new InMemoryCache();
    initialState.pinia = pinia.state.value;
  }

  app.use(head);
  app.use(layouts);
  app.use(pinia);
  app.use(locales);

  apolloClient(initialState, request, url);

  if (!isClient) {
    const tokenStore = useTokenStore();

    await tokenStore.refreshToken(request, response, url);

    if (tokenStore.accessToken) {
      await useUserStore().setUser();
    }
  }

  if (isClient) {
    UseMetric.initMetric();
  }

  middlewares({
    router,
  });

  return {
    ...head,
  };
});
