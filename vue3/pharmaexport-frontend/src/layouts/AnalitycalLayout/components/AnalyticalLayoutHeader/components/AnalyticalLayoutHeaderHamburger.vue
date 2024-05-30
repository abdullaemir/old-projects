<template>
  <BaseButton
    aria-controls="cabinet-menu"
    :aria-expanded="isMenuVisible"
    :aria-label="isMenuVisible ? 'Close menu' : 'Open menu'"
    class="hamburger"
    modifiers="transparent"
  >
    <svg
      v-if="isMenuVisible"
      aria-hidden="true"
      fill="none"
      height="18"
      width="18"
    >
      <path
        d="M17 8v2H4.8l5.6 5.6L9 17 1 9l8-8 1.4 1.4L4.8 8H17Z"
        fill="#031017"
      />
    </svg>

    <svg
      v-else
      aria-hidden="true"
      fill="none"
      height="12"
      width="18"
    >
      <path
        d="M0 0h18v2H0V0Zm0 7V5h18v2H0Zm0 5v-2h18v2H0Z"
        :fill="`#${isBlack ? '04202f' : 'ffffff' }`"
      />
    </svg>
  </BaseButton>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";

defineProps({
  isBlack: {
    required: true,
    type: Boolean,
  },
  isMenuVisible: {
    required: true,
    type: Boolean,
  },
});
</script>

<style scoped>
.hamburger {
  z-index: calc(var(--z-index-header) + 1);
  width: 40px;
  height: 40px;
  margin: 0 12px 0 -8px;
}

@media (min-width: 768px) {
  .hamburger {
    margin: 0 20px 0 -8px;
  }
}

@media (min-width: 1170px) {
  .hamburger {
    display: none;
  }
}
</style>
