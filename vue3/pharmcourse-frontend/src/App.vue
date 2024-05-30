<template>
  <Suspense>
    <Component :is="layout">
      <RouterView />
    </Component>
  </Suspense>

  <BaseNotification />

  <TheTray />
</template>

<script setup>
import {
  useApolloClient,
} from "@vue/apollo-composable";
import {
  useHead,
} from "@vueuse/head";
import {
  computed, onMounted,
} from "vue";
import {
  RouterView, useRoute, useRouter,
} from "vue-router";

import UseMetric from "~/assets/scripts/UseMetric.js";
import BaseNotification from "~/components/base/BaseNotification.vue";
import TheTray from "~/components/common/TheTray/TheTray.vue";
import {
  PROJECT_NAME,
} from "~/constants/meta.js";
import useUserStore from "~/stores/user.js";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const layout = computed(() => route.meta.layout || "DefaultLayout");

useHead({
  title: PROJECT_NAME,
});

onMounted(() => {
  const {
    body, documentElement,
  } = document;
  const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

  body.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
});

userStore.$subscribe(async (_, state) => {
  UseMetric.initMetric();

  if (route.params.location !== state.user.main_region.url || route.params.language !== state.user.language.url) {
    const {
      resolveClient,
    } = useApolloClient();
    const client = resolveClient();

    await client.clearStore();

    await client.refetchQueries({
      include: "active",
    });

    await router.replace({
      hash: route.hash,
      params: {
        language: state.user.language.url,
        location: state.user.main_region.url,
      },
      query: route.query,
    });
  }
});
</script>
