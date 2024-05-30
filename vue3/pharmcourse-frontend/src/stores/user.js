import { useTokenStore } from "@pg/helpers";
import { useApolloClient } from "@vue/apollo-composable";
import { defineStore } from "pinia";

import { BASE_URL, GET_LOCALE_URL } from "~/constants/urls.js";

import userSchema from "~/api/graphql/queries/user.graphql";

const useUserStore = defineStore("user", {
  actions: {
    async resetStore() {
      const { resolveClient } = useApolloClient();
      const client = resolveClient();

      this.user = {
        id: null,
        language: this.user.language,
        main_region: this.user.main_region,
        permissions: {},
      };

      await client.clearStore();
    },
    async setUser() {
      const tokenStore = useTokenStore();

      if (tokenStore.accessToken) {
        try {
          const { resolveClient } = useApolloClient();
          const client = resolveClient();

          const result = await client.query({
            fetchPolicy: "no-cache",
            query: userSchema,
          });

          this.user = result.data.user;

          return true;
        } catch (error) {
          console.error(error);
        }
      }

      return false;
    },
    async setUserLocale(url = null, request = null) {
      try {
        /** TODO Перенести на useFetch() */
        /** TODO: Вытащить заголовки в фетч */
        const response = await fetch(`https://${BASE_URL() + GET_LOCALE_URL}?currentUrl=${url.href}`, {
          headers: {
            "X-User-Country": request.headers["x-user-country"],
            "X-User-IP": request.headers["x-user-ip"],
          },
        });

        const json = await response.json();

        this.user.language = json.data.language;
        this.user.main_region = json.data.mainRegion;
      } catch (error) {
        console.error(error);
      }
    },
  },
  state: () => ({
    user: {
      id: null,
      language: {
        list: [],
        url: "en",
      },
      main_region: {
        list: [],
        url: "mena",
      },
      permissions: {},
    },
  }),
});

export default useUserStore;
