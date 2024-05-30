<template>
  <TheHeader
    :notifications="notifications"
    @toggle-notifications="notificationsSchemaRefetch"
  />

  <main class="container">
    <RouterView />
  </main>

  <TheFooter :notifications="notifications" />

  <TheModal />
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { RouterView } from "vue-router";

import TheFooter from "~/components/common/TheFooter/TheFooter.vue";
import TheHeader from "~/components/common/TheHeader/TheHeader.vue";
import TheModal from "~/components/common/TheModal/TheModal.vue";
import useUserStore from "~/stores/user.js";

import notificationsSchema from "../api/graphql/queries/notifications.graphql";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const notificationsEnabled = computed(() => Boolean(user.value.id));

const { result: notificationsSchemaResult, refetch: notificationsSchemaRefetch } = useQuery(notificationsSchema, null, {
  enabled: notificationsEnabled,
});

const notifications = computed(() => notificationsSchemaResult.value?.notifications ?? []);
</script>
