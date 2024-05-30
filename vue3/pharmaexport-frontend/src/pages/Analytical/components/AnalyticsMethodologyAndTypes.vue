<template>
  <div
    id="methodology-and-types-of-report"
    class="methodology-and-types analytics__section container--wide"
  >
    <AnalyticsMethodology />

    <AnalyticsTypes />
  </div>
</template>

<script setup>
import AnalyticsMethodology from "./AnalyticsMethodology.vue";
import AnalyticsTypes from "./AnalyticsTypes.vue";
</script>

<style scoped>
@media (min-width: 1170px) {
  .methodology-and-types {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 490px);
    grid-column-gap: 160px;
    margin-bottom: 28px;
  }

  .methodology-and-types::after {
    content: "";
    position: absolute;
    top: -238px;
    right: 0;
    width: 50%;
    height: 806px;
    background-color: #fbfbfe;
  }
}
</style>
