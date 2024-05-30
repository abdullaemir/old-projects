<template>
  <TheHeader />

  <main class="container">
    <RouterView />
  </main>

  <TheFooter />

  <TheModal />
</template>

<script setup>
import { RouterView } from "vue-router";

import TheFooter from "./components/DefaultLayoutFooter/DefaultLayoutFooter.vue";
import TheHeader from "./components/DefaultLayoutHeader/DefaultLayoutHeader.vue";
import TheModal from "./components/DefaultLayoutModal/DefaultLayoutModal.vue";
</script>
