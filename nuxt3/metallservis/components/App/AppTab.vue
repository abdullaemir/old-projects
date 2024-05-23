<template>
  <div v-if="name === selectedTab">
    <slot />
  </div>
</template>

<script setup>
const selectedTab = inject("selectedTab");

defineProps({
  name: String,
});
</script>
