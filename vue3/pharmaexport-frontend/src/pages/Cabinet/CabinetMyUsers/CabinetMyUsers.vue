<template>
  <section class="users__container">
    <RouterView />
  </section>
</template>

<script setup>
import { useHead } from "@vueuse/head";
import {PROJECT_NAME} from "~/constants/meta.js";

useHead({
  title: `My Users | ${PROJECT_NAME}`,
});
</script>

<style scoped>
@media (min-width: 768px) {
  .users__container {
    max-width: 943px;
    width: 100%;
  }
}
</style>
