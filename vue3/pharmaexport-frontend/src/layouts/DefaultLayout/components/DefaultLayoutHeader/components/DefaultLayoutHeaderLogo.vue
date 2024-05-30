<template>
  <RouterLink
    :to="{ name: 'index' }"
  >
    <img
      alt="YallaRX"
      class="logo"
      height="26"
      src="/src/assets/logo/yallarx.svg"
      width="87"
    />
  </RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.logo {
  display: block;
}
</style>
