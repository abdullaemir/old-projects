<template>
  <div class="purchases__container">
    <BaseBreadcrumbs :breadcrumbs="breadcrumbs" />

    <CabinetTitle>Upload Price</CabinetTitle>

    <CabinetRequest
      :comeback-link="{ name: 'cabinetPurchases' }"
      is-example
      page="purchases"
    />
  </div>
</template>

<script setup>
import BaseBreadcrumbs from "~/components/base/BaseBreadcrumbs.vue";

import CabinetRequest from "../../components/CabinetRequest.vue";
import CabinetTitle from "../../components/CabinetTitle.vue";

const breadcrumbs = [
  {
    name: "Purchases",
    to: {
      name: "cabinetPurchases",
    },
  },
];
</script>

<style scoped>
@media (min-width: 768px) {
  .purchases__container {
    max-width: 692px;
    width: 100%;
  }
}
</style>
