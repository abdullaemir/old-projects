<template>
  <section
    id="about-us"
    class="weare analytics__section"
  >
    <AnalyticsBaseTitle> Who We Are </AnalyticsBaseTitle>

    <p class="weare__text">
      <span class="weare__text--bold">YallaRX: Analytics</span>

      is an analytical project which is a part of <span class="weare__text--bold">Pharma.Global group.</span>
    </p>

    <p class="weare__text">
      The Company 5-year presence in the MENA region resulted in a team of international experts in the pharma market,
      and a technological platform with numerous sources of market data.
    </p>

    <p class="weare__text">
      The Company analytical services and consulting solutions are based on BigData, AI, ML-model in combination with
      pharmaceutical business intelligence by local practitioners and business strategists.
    </p>

    <p class="weare__text">
      <span class="weare__text--bold">Pharma.Global</span> is a company providing the services of pharma companies
      launch to the MENA Region market and rapid promotion through market expertise, IT-solutions, and Company online
      portals.
    </p>
  </section>
</template>

<script setup>
import AnalyticsBaseTitle from "./AnalyticsTitle.vue";
</script>

<style scoped>
.weare {
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .weare {
    margin-bottom: 60px;
  }
}

@media (min-width: 1170px) {
  .weare {
    margin-bottom: 100px;
  }
}

.weare__text {
  margin-bottom: 16px;
  font-size: 16px;
}

.weare__text--bold {
  font-weight: 600;
}
</style>
