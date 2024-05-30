<template>
  <section class="promotions__container">
    <CabinetTitle>This service is coming soon</CabinetTitle>

    <p class="promotions__description">
      In case you would like to test this service before official Launch, please fill in the form
    </p>

    <CabinetRequest page="promotions" />
  </section>
</template>

<script setup>
import CabinetRequest from "../components/CabinetRequest.vue";
import CabinetTitle from "../components/CabinetTitle.vue";
</script>

<style scoped>
@media (min-width: 768px) {
  .promotions__container {
    max-width: 692px;
    width: 100%;
  }
}

.promotions__description {
  margin-bottom: 20px;
}
</style>
