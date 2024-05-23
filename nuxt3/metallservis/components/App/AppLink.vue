<script setup>
defineProps({
  text: {
    type: Object,
    default: null,
  },
  isStatic: {
    type: Boolean,
    default: false,
  },
  isInteractive: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <nuxt-link
    :class="[
      'link',
      text?.size ? `text-size-${text.size}` : '',
      text?.color ? `text-color-${text.color}` : 'text-color-default',
      { static: isStatic },
      { interactive: isInteractive },
    ]"
  >
    <slot />
  </nuxt-link>
</template>

<style lang="scss" scoped>
.link {
  color: inherit;
  text-decoration: none;

  @include transition(
    $property: (
      background-color,
      color,
    )
  );

  &.interactive {
    @include gradient();
  }

  &.text-size-xsmall {
    @include textQ($font-size: 18px, $font-weight: 500, $letter-spacing: -0.05em);
  }

  &.text-size-small {
    @include text-medium($font-weight: 500, $letter-spacing: -0.05em);
  }

  &.text-size-medium {
    @include text-large();
  }

  &.text-size-large {
    @include textQ($font-size: 64px, $font-weight: 500, $letter-spacing: -0.03em);
  }

  &.text-color-blue {
    color: $link-color-blue;

    @include hover() {
      color: #001e51;
    }

    @include active() {
      color: $blue;
    }
  }
}
</style>
