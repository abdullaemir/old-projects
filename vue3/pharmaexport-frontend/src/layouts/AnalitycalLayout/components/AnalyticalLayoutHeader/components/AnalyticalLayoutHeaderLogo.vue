<template>
  <img
    aria-hidden="true"
    width="69"
    height="26"
    alt=""
    loading="lazy"
    class="logo"
    :src="getLogo(isColored ? 'yallarx' : 'yallarx--white')"
  />
</template>

<script setup>
const getLogo = (name) => {
  const path = `../assets/logo/${name}.png`;
  const modules = import.meta.globEager("../assets/logo/*");

  return modules[path].default;
};

defineProps({
  isColored: {
    required: true,
    type: Boolean,
  }
});
</script>

<style scoped>
.logo {
  z-index: calc(var(--z-index-header) + 1);
}
</style>
