<script setup>
defineProps({
  size: {
    type: String,
    default: "S",
  },
  tag: {
    type: String,
    default: null,
  },
});

const tags = {
  S: "h4",
  M: "h3",
  L: "h2",
  XL: "h1",
};
</script>

<template>
  <component
    :is="tag ?? tags[size]"
    :class="['title', size]"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.title {
  line-height: 1;

  @include text($size: "XL");

  &:not(.S) {
    @include breakpoint($device: "tablet") {
      letter-spacing: -1.92px;
    }
  }

  &.M {
    @include breakpoint($device: "tablet") {
      font-size: 48px;
    }
  }

  &.L {
    @include breakpoint($device: "tablet") {
      font-size: 64px;
      font-weight: 500;
    }
  }

  &.XL {
    font-size: 40px;
    font-weight: 500;
    letter-spacing: -2px;

    @include breakpoint($device: "tablet") {
      font-size: 80px;
      font-weight: 600;
      letter-spacing: -4px;
    }
  }
}
</style>
