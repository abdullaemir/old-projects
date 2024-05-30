<template>
  <div>
    <TheHeader @openModal="" />
    <main class="main">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import TheHeader from "~/components/common/TheHeader/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .main {
    height: 100vh;
    padding-left: 272px;
    overflow-y: hidden;
  }
}

@media (min-width: 1280px) {
  .main {
    padding-left: 305px;
  }
}

@media (min-width: 1920px) {
  .main {
    padding-left: 355px;
  }
}
</style>
