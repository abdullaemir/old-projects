<template>
  <CabinetLayoutHeader />

  <main class="main">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";

import CabinetLayoutHeader from "./components/CabinetLayoutHeader/CabinetLayoutHeader.vue";
</script>

<style scoped>
.main {
  height: 100%;
  padding: 28px 16px 40px;
}

@media (min-width: 768px) {
  .main {
    padding: 32px 32px 40px;
  }
}

@media (min-width: 1170px) {
  .main {
    padding: 28px 52px 100px 345px;
  }
}
</style>
