<template>
  <section
    id="report-structure"
    class="structure analytics__section container--wide"
  >
    <AnalyticsTitle>Report Structure</AnalyticsTitle>

    <ul class="structure__list">
      <li
        v-for="(item, itemIndex) in list"
        class="structure__item"
        :key="itemIndex"
      >
        {{ item }}
      </li>
    </ul>
  </section>
</template>

<script setup>
import AnalyticsTitle from "./AnalyticsTitle.vue";

const list = [
  "General Market Analysis",
  "Market analysis by drug category",
  "Competitive analysis by category and country",
  "Regulatory and organizational moments",
  "In-Depth Interviews",
  "Market Forecasts",
  "Expert advice",
];
</script>

<style scoped>
.structure {
  margin-bottom: 52px;
}

@media (min-width: 768px) {
  .structure {
    margin-bottom: 60px;
  }
}

@media (min-width: 1170px) {
  .structure {
    margin-bottom: 120px;
    background-image: url("../assets/images/structure.svg");
    background-size: 700px 700px;
    background-position: left calc(50vw - 44px) top -60px;
    background-repeat: no-repeat;
  }
}

.structure__list {
  display: grid;
  grid-row-gap: 40px;
  margin: 0;
  padding-left: 20px;
}

@media (min-width: 768px) {
  .structure__list {
    grid-row-gap: 56px;
    padding-left: 50px;
  }
}

.structure__item {
  position: relative;
  display: flex;
  align-items: flex-start;
  font-size: 16px;
}

.structure__item::before {
  content: "";
  width: 12px;
  height: 12px;
  margin: 6px 32px 0 0;
  border-radius: 50%;
  background-color: #e80061;
}

.structure__item:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 6px;
  left: 6px;
  width: 1px;
  height: calc(100% + 46px);
  background-color: #e80061;
}

@media (min-width: 768px) {
  .structure__item:not(:last-child)::after {
    height: calc(100% + 62px);
  }
}
</style>
