<template>
  <section class="profile__container">
    <CabinetTitle>My profile</CabinetTitle>

    <BaseTabs
      :default="currentTab"
      @switch="changeTab"
    >
      <BaseTabItem
        v-for="tab in tabs"
        :key="tab.name"
        :disabled="tab.disabled"
        :name="tab.name"
      >
        <Component
          :is="tab.component"
          class="profile__wrapper"
        />
      </BaseTabItem>
    </BaseTabs>
  </section>
</template>

<script setup>
import { useHead } from "@vueuse/head";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import useCheckAccess from "~/assets/scripts/functions/useCheckAccess.js";
import BaseTabItem from "~/components/base/BaseTabItem.vue";
import BaseTabs from "~/components/base/BaseTabs.vue";
import { PROJECT_NAME } from "~/constants/meta.js";

import CabinetTitle from "../components/CabinetTitle.vue";

import CabinetProfileEmail from "./components/CabinetProfileEmail.vue";
import CabinetProfilePassword from "./components/CabinetProfilePassword.vue";
import CabinetProfileUser from "./components/CabinetProfileUser.vue";

useHead({
  title: `Profile | ${PROJECT_NAME}`,
});

const route = useRoute();
const router = useRouter();

const tabs = [
  {
    component: CabinetProfileUser,
    disabled: false,
    name: "Personal information",
  },
  {
    component: CabinetProfilePassword,
    disabled: false,
    name: "Change password",
  },
  {
    component: CabinetProfileEmail,
    disabled: !useCheckAccess("MY_PROFILE_CHANGE_EMAIL"),
    name: "Change email",
  },
];

const currentTab = computed(() => {
  switch (route.name) {
    case "cabinetProfileChangeEmail": {
      return useCheckAccess("MY_PROFILE_CHANGE_EMAIL") ? "Change email" : "Personal information";
    }

    case "cabinetProfileChangePassword": {
      return "Change password";
    }

    default: {
      return "Personal information";
    }
  }
});

const changeTab = async (tabName) => {
  let routeName = "cabinetProfile";

  switch (tabName) {
    case "Change email": {
      routeName = "cabinetProfileChangeEmail";

      break;
    }

    case "Change password": {
      routeName = "cabinetProfileChangePassword";

      break;
    }

    default: {
      break;
    }
  }

  await router.push({
    name: routeName,
  });
};
</script>

<style scoped>
.profile__container {
  max-width: 692px;
  width: 100%;
}

.profile__wrapper {
  margin: 0 -16px;
  padding: 28px 16px 32px;
  border-top: 1px solid var(--border-color-primary);
  border-bottom: 1px solid var(--border-color-primary);
  box-shadow: 0 1px 16px rgb(0 42 81 / 0.06);
}

@media (min-width: 768px) {
  .profile__wrapper {
    margin: 0;
    padding: 28px 142px 32px;
    border: 1px solid var(--border-color-primary);
    border-radius: 8px;
  }
}

:deep(.tabs__list) {
  grid-column-gap: 18px;
  max-width: 100%;
  margin-bottom: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}

:deep(.tabs__list::-webkit-scrollbar) {
  display: none;
}

:deep(.tabs__item) {
  scroll-snap-align: center;
}

:deep(.tabs__button) {
  padding: 7px 9px;
  font-weight: 500;
  font-size: 12px;
  white-space: nowrap;
}

:deep(.tabs__button.active) {
  border-bottom: 2px solid var(--border-color-secondary);
  font-weight: 600;
}
</style>
