<template>
  <BaseFormRow class="button__row">
    <BaseButton
      class="button"
      :modifiers="['medium', 'round', 'blue']"
      type="submit"
    >
      <slot />
    </BaseButton>
  </BaseFormRow>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";
import BaseFormRow from "~/components/base/BaseFormRow.vue";
</script>

<style scoped>
.button {
  position: relative;
  left: 100%;
  width: auto;
  transform: translateX(-100%);
}

.button__row {
  display: block;
}
</style>
