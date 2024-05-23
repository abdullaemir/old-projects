<script setup>
defineProps({
  isExtended: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div :class="['container', { extended: isExtended }]">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 0 $container-padding;

  @include breakpoint($device: "desktop") {
    width: 100%;
    max-width: $container-max-width;
    margin: 0 auto;
  }

  &.extended {
    @include breakpoint($device: "desktop") {
      display: grid;
      grid-column-gap: 24px;
      grid-template-columns: 1fr $container-extended-content-max-width;
    }
  }
}
</style>
