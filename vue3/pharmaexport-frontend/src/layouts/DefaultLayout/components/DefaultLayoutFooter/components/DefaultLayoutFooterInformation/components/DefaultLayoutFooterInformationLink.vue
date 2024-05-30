<template>
  <BaseLink class="link">
    <slot />
  </BaseLink>
</template>

<script setup>
import BaseLink from "~/components/base/BaseLink.vue";
</script>

<style scoped>
@media (any-pointer: fine) {
  .link:hover,
  .link:focus,
  .link:active {
    text-decoration: underline;
  }
}
</style>
