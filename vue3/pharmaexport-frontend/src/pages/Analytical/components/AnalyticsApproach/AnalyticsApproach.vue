<template>
  <section
    id="unique-approach"
    class="approach analytics__section"
  >
    <AnalyticsApproachDiagram />

    <div class="approach__wrapper">
      <AnalyticsTitle class="approach__title">
        Unique
        <span class="approach__title--highlighted">360&deg;</span>
        Approach
      </AnalyticsTitle>

      <span class="approach__subtitle">
        Pharmaceutical business intelligence and analytics for comprehensive and constructive decisions.
      </span>

      <div class="approach__wrapper">
        <p class="approach__description">
          We not only conduct pharmaceutical market research and carry on pharmaceutical industry analysis,
          but also help in launching your business at new markets.
        </p>

        <p class="approach__description">
          We offer customized solutions for your business development tasks.
        </p>
      </div>

      <BaseButton
        class="approach__button"
        :modifiers="['medium', 'round', 'purple']"
        @click="useModal.openModal('analytics-request')"
      >
        Yalla
      </BaseButton>
    </div>
  </section>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";
import { useModal } from "~/components/base/BaseModal.vue";

import AnalyticsTitle from "../AnalyticsTitle.vue";

import AnalyticsApproachDiagram from "./components/AnalyticsApproachDiagram.vue";
</script>

<style scoped>
.approach {
  margin-bottom: 32px;
  font-size: 16px;
}

@media (min-width: 768px) {
  .approach {
    margin-bottom: 60px;
  }
}

@media (min-width: 1170px) {
  .approach {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 600px;
    align-items: center;
    margin-bottom: 20px;
  }
}

@media (min-width: 1170px) {
  .approach__wrapper {
    grid-column: 1 / 2;
    padding-right: 80px;
  }
}

@media (min-width: 768px) {
  .approach__title {
    margin-bottom: 20px;
  }
}

.approach__subtitle {
  display: block;
  margin-bottom: 20px;
  font-weight: 600;
}

@media (min-width: 768px) {
  .approach__subtitle {
    margin-bottom: 40px;
  }
}

.approach__title--highlighted {
  color: #e80061;
}

.approach__description:not(:last-child) {
  margin-bottom: 20px;
}

.approach__wrapper:last-of-type {
  margin-bottom: 40px;
}

@media (min-width: 450px) {
  .approach__button {
    width: auto;
  }
}
</style>
