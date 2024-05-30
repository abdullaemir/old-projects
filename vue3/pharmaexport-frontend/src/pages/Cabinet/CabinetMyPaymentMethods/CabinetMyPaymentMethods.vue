<template>
  <section class="payments__container">
    <RouterView />
  </section>
</template>

<script setup>
import { useHead } from "@vueuse/head";
import {PROJECT_NAME} from "~/constants/meta.js";

useHead({
  title: `My Payment Methods | ${PROJECT_NAME}`,
});
</script>

<style scoped>
@media (min-width: 768px) {
  .payments__container {
    max-width: 692px;
    width: 100%;
  }
}
</style>
