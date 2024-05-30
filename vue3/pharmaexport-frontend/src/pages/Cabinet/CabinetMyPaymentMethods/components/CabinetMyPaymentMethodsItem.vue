<template>
  <li class="item">
    <span class="item__title">
      {{ title }}
    </span>
    <template v-if="description">
      {{ description }}
    </template>
  </li>
</template>

<script setup>
defineProps({
  description: {
    default: null,
    required: false,
    type: String,
  },

  title: {
    default: null,
    required: true,
    type: String,
  },
});
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
}

.item__title {
  margin-bottom: 4px;
  font-size: 12px;
  color: var(--text-color-five);
}
</style>
