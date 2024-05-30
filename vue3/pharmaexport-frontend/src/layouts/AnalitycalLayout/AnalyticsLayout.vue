<template>
  <AnalyticalLayoutHeader />

  <main class="container">
    <RouterView />
  </main>

  <AnalyticalLayoutFooter />
</template>

<script setup>
import { RouterView } from "vue-router";

import AnalyticalLayoutFooter from "./components/AnalyticalLayoutFooter/AnalyticalLayoutFooter.vue";
import AnalyticalLayoutHeader from "./components/AnalyticalLayoutHeader/AnalyticalLayoutHeader.vue";
</script>
