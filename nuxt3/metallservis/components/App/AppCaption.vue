<script setup>
defineProps({
  tag: {
    type: String,
    default: "p",
  },
});
</script>

<template>
  <component
    :is="tag"
    class="caption"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.caption {
  color: $caption-color;

  @include breakpoint($device: "tablet") {
    @include text($size: "S");
  }
}
</style>
