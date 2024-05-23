<template>
  <div class="overlay">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  z-index: $z-index-overlay;
  padding: 5px $container-padding;
  background-color: $overlay-background-color;
  inset: 0;
  overflow-y: auto;

  &.v-enter-active,
  &.v-leave-active {
    @include transition($property: opacity);
  }

  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
  }
}
</style>
