<template>
  <section class="methodology analytics__section">
    <AnalyticsTitle>Methodology of the Research is Based on</AnalyticsTitle>

    <ul class="methodology__list">
      <li class="methodology__item">Sales market data</li>
      <li class="methodology__item">Unified list of pharmaceutical goods worldwide</li>
      <li class="methodology__item">Final patients behaviour and prescription</li>
      <li class="methodology__item">Data from Ministry of Health of each GCC country</li>
    </ul>

    <p class="methodology__description">
      Our methodology is based on comparison of the sales of drugs in relation to consumption per capita
    </p>
  </section>
</template>

<script setup>
import AnalyticsTitle from "./AnalyticsTitle.vue";
</script>

<style scoped>
.methodology {
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .methodology {
    margin-bottom: 60px;
  }
}

.methodology__list {
  display: grid;
  grid-row-gap: 40px;
  margin: 0 0 32px;
  padding-left: 0;
}

@media (min-width: 768px) {
  .methodology__list {
    margin-bottom: 60px;
  }
}

.methodology__item {
  counter-increment: item;
  display: flex;
  align-items: flex-start;
  font-size: 16px;
}

.methodology__item::before {
  content: counter(item) ".";
  width: 32px;
  margin-right: 28px;
  font-weight: 600;
  font-size: 16px;
  color: rgba(4, 32, 47, 0.5);
}

.methodology__item:nth-child(-n+9)::before {
  content: "0" counter(item) ".";
}

.methodology__description {
  font-weight: 600;
  font-size: 16px;
}
</style>
