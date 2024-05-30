<template>
  <div class="tenders__container">
    <BaseBreadcrumbs :breadcrumbs="breadcrumbs" />

    <CabinetTitle>Upload Price</CabinetTitle>

    <CabinetRequest
      :comeback-link="{ name: 'cabinetTenders' }"
      is-example
      page="tenders"
    />
  </div>
</template>

<script setup>
import BaseBreadcrumbs from "~/components/base/BaseBreadcrumbs.vue";

import CabinetRequest from "../../components/CabinetRequest.vue";
import CabinetTitle from "../../components/CabinetTitle.vue";

const breadcrumbs = [
  {
    name: "TendeRx",
    to: {
      name: "cabinetTenders",
    },
  },
];
</script>

<style scoped>
@media (min-width: 768px) {
  .tenders__container {
    max-width: 692px;
    width: 100%;
  }
}
</style>
