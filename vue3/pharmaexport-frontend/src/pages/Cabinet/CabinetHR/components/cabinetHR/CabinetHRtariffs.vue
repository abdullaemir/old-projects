<template>
  <div
    id="request-tariff"
    class="tariffs"
  >
    <p class="tariffs__title">
      This service is coming soon
    </p>
    <p class="tariffs__desc">
      In case you would like to test this service before official Launch, please send your request
    </p>
    <CabinetRequest page="hr" />
  </div>
</template>

<script setup>
import CabinetRequest from "~/pages/Cabinet/components/CabinetRequest.vue";
</script>

<style scoped>
.tariffs {
  padding: 0 16px;
}

.tariffs__title,
.tariffs__desc {
  text-align: center;
}

.tariffs__title {
  margin-bottom: 10px;
  font-weight: 300;
  font-size: 24px;
}

.tariffs__desc {
  margin-bottom: 30px;
}

.tariffs :deep(.form) {
  margin: 0 auto;
}
</style>
