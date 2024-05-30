<template>
  <section class="tab__container">
    <BaseTabs>
      <BaseTabItem name="Pharmaceutical manufacturers">
        <CabinetAnalyticsList :data="data.manufacturer" />
      </BaseTabItem>

      <BaseTabItem name="Market distributors">
        <CabinetAnalyticsList :data="data.distributors" />
      </BaseTabItem>
    </BaseTabs>
  </section>
</template>

<script setup>
import BaseTabItem from "~/components/base/BaseTabItem.vue";
import BaseTabs from "~/components/base/BaseTabs.vue";
import CabinetAnalyticsList from "~/pages/Cabinet/CabinetAnalytics/components/CabinetAnalyticsList.vue";

const data = {
  distributors: {
    list: [
      "Undervalued manufacturers - list of manufacturers registered in the GCC countries, but supplying a very limited number of medicinal products; and also the list of  medicinal products produced by these manufacturers with high market potential",
      "List of unique dosages and dosage forms of the drugs not available in the market. List of manufacturers having such medicinal products in their portfolios",
      "List of manufacturers with the product line at the distributor request (availability of a certain medicinal product from different suppliers)",
      "List of competitors with a similar list of medicinal products",
      "Distributors analysis by country, and your Company place in it. Options of development strategies",
      "Analysis of the product line groups of the competitors (what other distributors sell)",
    ],
    title: "Reports for the GCC market distributors",
  },
  manufacturer: {
    list: [
      "Assessment of the portfolio/selected SKUs for the economic feasibility of export",
      "Assessment of the validity of the manufactured medicinal product and dosage form for the market",
      "Analysis of competitors in the segment and pricing policy",
      "Missing dosage forms of a certain MNN",
      "List of medicinal products with high demand at the market and low competition within the segment",
      "List of medicinal products with high demand at the market and high competition within the segment",
      "Drug registration system and timing",
      "Drug launch expense forecast",
    ],
    title: "Reports for pharmaceutical manufacturers from around the world",
  },
};
</script>

<style scoped>
.tab__container {
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .tab__container {
    margin-bottom: 60px;
  }
}

:deep(.tabs) {
  margin-bottom: 24px;
}

:deep(.tabs__list) {
  grid-column-gap: 18px;
  margin-bottom: 32px;
}

:deep(.tabs__button) {
  padding: 0 16px 22px;
  font-weight: 500;
  font-size: 14px;
}

:deep(.tabs__button.active) {
  border-bottom: 2px solid var(--border-color-secondary);
  font-weight: 600;
}
</style>
