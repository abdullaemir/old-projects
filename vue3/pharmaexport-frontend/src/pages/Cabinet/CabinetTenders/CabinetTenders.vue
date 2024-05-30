<template>
  <RouterView />
</template>

<script setup>
import { useHead } from "@vueuse/head";
import {PROJECT_NAME} from "~/constants/meta.js"

useHead({
  title: `TendeRx | ${PROJECT_NAME}`,
});
</script>
