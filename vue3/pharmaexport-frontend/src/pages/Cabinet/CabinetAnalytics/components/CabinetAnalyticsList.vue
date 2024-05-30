<template>
  <h2 class="table__heading">
    {{ data.title }}
  </h2>
  <ul class="table__list">
    <li
      v-for="(text, textIndex) in data.list"
      :key="textIndex"
      class="table__item"
    >
      {{ text }}
    </li>
  </ul>
</template>

<script setup>
defineProps({
  data: {
    default() {
      return {};
    },
    type: Object,
  },
});
</script>

<style scoped>
.table__heading {
  margin-bottom: 28px;
  font-weight: 300;
  font-size: 24px;
  line-height: 1.9;
  color: var(--blue-darkest);
}

.table__list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 32px;
  margin: 0;
  padding: 0;
}

.table__item {
  display: flex;
  font-size: 14px;
  color: var(--blue-darkest);
  counter-increment: number;
}

.table__item::before {
  content: counter(number);
  position: relative;
  top: -4px;
  margin-right: 20px;
  font-weight: 600;
  font-size: 20px;
  color: var(--pink);
}
</style>
