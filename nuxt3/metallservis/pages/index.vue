<script setup>
const title = "Главная";

useHead({
  title: title,
});
</script>

<template>
  <app-page class="index">
    <app-title
      class="index__title"
      size="XL"
    >
      {{ title }}
    </app-title>
  </app-page>
</template>
