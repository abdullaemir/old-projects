<template>
  <h2 class="title">
    <slot />
  </h2>
</template>

<style scoped>
.title {
  position: relative;
  margin-bottom: 20px;
  padding-top: 16px;
  font-weight: 800;
  font-size: 20px;
  line-height: 2;
}

@media (min-width: 768px) {
  .title {
    margin: 0 0 40px;
    padding-top: 24px;
    font-size: 28px;
    line-height: 1.4;
  }
}

.title::before {
  content: "";
  position: absolute;
  top: 0;
  width: 76px;
  height: 4px;
  background-image: url("../assets/icons/dashes.svg");
}
</style>
