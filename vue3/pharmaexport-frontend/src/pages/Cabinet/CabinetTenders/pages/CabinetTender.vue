<template>
  <BaseBreadcrumbs
    :breadcrumbs="breadcrumbs"
    class="tender__breadcrumbs"
  />

  <div class="tender__wrapper">
    <CabinetTenderSubmit v-if="useCheckAccess('TENDERS_VIEW_SELLER')" />

    <CabinetTenderInformation
      :features="features"
      :number="tenderNumber"
    />
  </div>

  <CabinetTendersScopedTable :items="tableItems" />
</template>

<script setup>
import { useRoute } from "vue-router";

import useCheckAccess from "~/assets/scripts/functions/useCheckAccess.js";
import BaseBreadcrumbs from "~/components/base/BaseBreadcrumbs.vue";

import CabinetTenderInformation from "../components/CabinetTenderInformation.vue";
import CabinetTendersScopedTable from "../components/CabinetTendersScopedTable.vue";
import CabinetTenderSubmit from "../components/CabinetTenderSubmit.vue";

const route = useRoute();

const tenderNumber = route.params.number;

const breadcrumbs = [
  {
    name: `TendeRx № ${tenderNumber}`,
    to: {
      name: "cabinetTenders",
    },
  },
];

const features = [
  {
    name: "Date",
    value: "22.06.2022",
  },
  {
    name: "Items amount",
    value: 5,
  },
  {
    name: "Status",
    value: "Active",
  },
  {
    name: "Delivery status",
    value: "-",
  },
];

const tableItems = [
  {
    description: "Paracetamol, Tablet 500 mg",
    form: "Tablet",
    price: "4.5 AED",
    quantity: "5 000",
    reference: "Panadol",
    remark: "Self life minimum 18 month required",
    size: "24",
    time: "Immediate",
  },
  {
    description: "Paracetamol, Tablet 500 mg",
    form: "Tablet",
    price: "4.5 AED",
    quantity: "5 000",
    reference: "Panadol",
    remark: "Self life minimum 18 month required",
    size: "24",
    time: "Immediate",
  },
  {
    description: "Paracetamol, Tablet 500 mg",
    form: "Tablet",
    price: "4.5 AED",
    quantity: "5 000",
    reference: "Panadol",
    remark: "Self life minimum 18 month required",
    size: "24",
    time: "Immediate",
  },
  {
    description: "Paracetamol, Tablet 500 mg",
    form: "Tablet",
    price: "4.5 AED",
    quantity: "5 000",
    reference: "Panadol",
    remark: "Self life minimum 18 month required",
    size: "24",
    time: "Immediate",
  },
  {
    description: "Paracetamol, Tablet 500 mg",
    form: "Tablet",
    price: "4.5 AED",
    quantity: "5 000",
    reference: "Panadol",
    remark: "Self life minimum 18 month required",
    size: "24",
    time: "Immediate",
  },
];
</script>

<style scoped>
.tender__breadcrumbs {
  margin-bottom: 28px;
}

@media (min-width: 768px) {
  .tender__wrapper {
    max-width: 943px;
    width: 100%;
  }
}

@media (min-width: 1170px) {
  .tender__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
