<template>
  <h1 class="title">
    <slot />
  </h1>
</template>

<style scoped>
.title {
  margin-bottom: 20px;
  font-weight: 300;
  font-size: 24px;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .title {
    font-size: 28px;
  }
}
</style>
