<template>
  <IndexPromo />
  <IndexBrand />
  <IndexBusiness />
  <IndexPartners />
</template>

<script setup>
import { useTokenStore } from "@pg/helpers";
import { storeToRefs } from "pinia";
import { useContext } from "vite-ssr";
import { useRoute, useRouter } from "vue-router";

import Auth from "~/api/rest/Auth.js";
import { useModal } from "~/components/base/BaseModal.vue";
import { useNotification } from "~/components/base/BaseNotification.vue";
import useUserStore from "~/stores/user.js";

import IndexBrand from "./components/IndexBrand.vue";
import IndexBusiness from "./components/IndexBusiness.vue";
import IndexPartners from "./components/IndexPartners.vue";
import IndexPromo from "./components/IndexPromo.vue";

const route = useRoute();
const router = useRouter();
const { isClient } = useContext();
const userStore = useUserStore();
const tokenStore = useTokenStore();

const refreshUserAndGoToCabinet = async () => {
  await tokenStore.refreshToken();
  await userStore.setUser();

  router.push({
    name: "cabinetProfile",
  });
};

if (isClient) {
  const queryParams = route.query;
  const { token } = queryParams;
  const { user } = storeToRefs(userStore);

  if (queryParams.modal) {
    switch (queryParams.modal) {
      case "login": {
        if (user?.value.id) {
          router.replace({
            query: {},
          });
        } else {
          useModal.openModal("login");
        }

        break;
      }

      default: {
        useModal.openModal(queryParams.modal);
      }
    }
  }

  if (token) {
    switch (queryParams.action) {
      case "changePassword": {
        const result = await Auth.checkPasswordResetToken(token);

        if (result.errors) {
          useNotification.openNotification(result.errors.message);

          router.replace({
            query: {},
          });

          useModal.openModal("forgot-password");
        } else {
          useModal.openModal("forgot-password-change");
        }

        break;
      }

      case "confirmChangeEmail": {
        const result = await Auth.confirmChangeEmail(token);

        router.replace({
          query: {},
        });

        useNotification.openNotification(result.errors ? result.errors.message : result.extensions.message);

        if (user?.value.id) {
          if (result.errors) {
            router.push({
              name: "cabinetProfileChangeEmail",
            });
          } else {
            refreshUserAndGoToCabinet();
          }
        } else {
          router.push({
            name: "index",
            query: {
              modal: "login",
            },
          });

          useModal.openModal("login");
        }

        break;
      }

      case "confirmEmail": {
        const result = await Auth.confirmEmail(token);

        router.replace({
          query: {},
        });

        useNotification.openNotification(result.errors ? result.errors.message : result.extensions.message);

        if (user?.value.id) {
          if (!result.errors) {
            refreshUserAndGoToCabinet();
          }
        } else {
          router.push({
            name: "index",
            query: {
              modal: "login",
            },
          });

          useModal.openModal("login");
        }

        break;
      }

      case "banUserAgent": {
        const result = await Auth.banUserAgent(token);

        useNotification.openNotification(result.errors ? result.errors.message : result.extensions.message);

        router.replace({
          query: {},
        });

        break;
      }

      case "userInvite": {
        const result = await Auth.userInvite(token);

        if (result.errors) {
          useNotification.openNotification(result.errors.message);
        } else {
          localStorage.setItem("inviteToken", token);
          localStorage.setItem("registrationFormData", JSON.stringify(result.data));
          useModal.openModal("registration");
        }

        router.replace({
          query: {},
        });

        break;
      }

      case "unsubscribeUser": {
        const result = await Auth.userUnsubscribe(token);

        useNotification.openNotification(result.errors ? result.errors.message : result.extensions.message);

        router.replace({
          query: {},
        });

        break;
      }

      case "unsubscribeUserInvite": {
        const result = await Auth.userInviteUnsubscribe(token);

        useNotification.openNotification(result.errors ? result.errors.message : result.extensions.message);

        router.replace({
          query: {},
        });

        break;
      }

      default: {
        break;
      }
    }
  }
}
</script>
