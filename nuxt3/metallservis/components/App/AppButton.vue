<script setup>
defineProps({
  isInteractive: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :class="['button', { interactive: isInteractive }]"
    type="button"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  padding: 0;
  border: none;
  background-color: $button-background-color;
  color: inherit;
  cursor: pointer;

  @include transition(
    $property: (
      background-color,
      color,
    )
  );

  &.interactive {
    @include gradient();
  }

  &:disabled {
    color: $button-color-disabled;
    pointer-events: none;
  }
}
</style>
