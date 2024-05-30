import { ApolloClient, createHttpLink } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useTokenStore } from "@pg/helpers";
import { provideApolloClient } from "@vue/apollo-composable";

import { useNotification } from "~/components/base/BaseNotification.vue";

const apolloClient = (initialState, request, url) => {
  const httpLink = createHttpLink({
    uri: `${url.origin}/graphql`,
  });

  const authLink = setContext(async (_, { headers, ...context }) => {
    const tokenStore = useTokenStore();

    await tokenStore.updateToken();

    const token = tokenStore.accessToken;

    return {
      headers: {
        ...headers,
        credentials: "same-origin",
        ...token
          ? {
            Authorization: `Bearer ${token}`,
          }
          : {},
        ...request && {
          "User-agent": request.headers["user-agent"],
        },
      },
      ...context,
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error, index) => {
        if (error.extensions.category === "graphql") {
          console.error(error);

          if (index === graphQLErrors.length - 1) {
            useNotification.openNotification("An error occurred on the server. Try again later.");
          }
        } else if (!error.extensions.fields) {
          useNotification.openNotification(error.message);
        }
      });
    }

    if (networkError) {
      useNotification.openNotification(String(networkError));
    }
  });

  const cache = initialState.apolloCache;

  const client = new ApolloClient({
    ...request
      ? {
        ssrForceFetchDelay: 100,
      }
      : {
        ssrMode: true,
      },
    cache,
    connectToDevTools: true,
    link: errorLink.concat(authLink.concat(httpLink)),
  });

  return provideApolloClient(client);
};

export default apolloClient;
