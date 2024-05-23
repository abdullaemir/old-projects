<script setup>
import { AppContainer } from "#components";

const slots = useSlots();
</script>

<template>
  <component
    :is="slots.sidebar ? AppContainer : 'main'"
    class="page"
    is-extended
  >
    <slot name="sidebar" />

    <component :is="slots.sidebar ? 'main' : AppContainer">
      <slot />
    </component>
  </component>
</template>

<style lang="scss" scoped>
.page {
  padding-top: 24px;
  padding-bottom: 40px;

  @include breakpoint($device: "laptop") {
    padding-top: 32px;
    padding-bottom: 48px;
  }
}
</style>
