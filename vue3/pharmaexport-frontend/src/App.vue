<template>
  <Suspense>
    <Component :is="layout">
      <RouterView />
    </Component>
  </Suspense>

  <TheCookie />

  <BaseNotification />
</template>

<script setup>
import { computed, onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useHead } from "@vueuse/head";

import UseMetric from "~/assets/scripts/functions/UseMetric.js";
import useUserStore from "~/stores/user.js";
import BaseNotification from "~/components/base/BaseNotification.vue";
import TheCookie from "~/components/common/TheCookie.vue";
import { PROJECT_NAME } from "~/constants/meta.js";

const userStore = useUserStore();
const route = useRoute();
const layout = computed(() => route.meta.layout || "DefaultLayout");

useHead({
  title: PROJECT_NAME,
});

onMounted(() => {
  const { body, documentElement } = document;
  const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

  body.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
});

userStore.$subscribe( (_) => {
  UseMetric.initMetric();
});
</script>
