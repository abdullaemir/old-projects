import { useTokenStore } from "@pg/helpers";
import { useApolloClient } from "@vue/apollo-composable";
import { defineStore } from "pinia";

import userSchema from "~/api/graphql/queries/user.graphql";

const useUserStore = defineStore("user", {
  actions: {
    async resetStore() {
      const { resolveClient } = useApolloClient();
      const client = resolveClient();

      this.user = {
        id: null,
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
  },
  state: () => ({
    user: {
      id: null,
      permissions: {},
    },
  }),
});

export default useUserStore;
