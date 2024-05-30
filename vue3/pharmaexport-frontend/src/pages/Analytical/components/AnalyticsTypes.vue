<template>
  <section class="analytics__section container--wide types">
    <AnalyticsTitle>What Types of Reports do we Provide?</AnalyticsTitle>

    <BaseTabs
      v-model="currentTab"
      class="types__tabs"
      :class="[{ full: isFull, 'active-first-tab': currentTab === tabs[0].name }]"
      @switch="isFull = false"
    >
      <BaseTabItem
        v-for="(tab, tabIndex) in tabs"
        :key="tabIndex"
        :name="tab.name"
      >
        <ul class="types__list">
          <li
            v-for="(item, itemIndex) in tab.list"
            :key="itemIndex"
            class="types__item"
          >
            {{ item }}
          </li>
        </ul>

        <BaseButton
          class="types__button"
          modifiers="transparent"
          @click="isFull = !isFull"
        >
          {{ isFull ? "Close" : "Read more" }}

          <img
            alt=""
            class="types__icon"
            src="../assets/icons/arrow.svg"
          />
        </BaseButton>
      </BaseTabItem>
    </BaseTabs>
  </section>
</template>

<script setup>
import { ref } from "vue";

import BaseButton from "~/components/base/BaseButton.vue";
import BaseTabItem from "~/components/base/BaseTabItem.vue";
import BaseTabs from "~/components/base/BaseTabs.vue";

import AnalyticsTitle from "./AnalyticsTitle.vue";

const currentTab = ref(null);
const isFull = ref(false);

const tabs = [
  {
    list: [
      "Assessment of the portfolio/selected SKUs for the export economic feasibility",
      "Assessment of the validity of the manufactured drug and dosage form for the market",
      "Competitors analysis across the segment and pricing policy",
      "Missing dosage forms of a certain MNN",
      "Drugs in high demand at the market and low competition within the segment",
      "Drugs in high demand at the market and high competition within the segment",
      "Drug registration system and timing",
      "Drug launch expense forecast",
    ],
    name: "Pharmaceutical Manufacturers",
  },
  {
    list: [
      "Undervalued manufacturers registered in the GCC countries, but supplying a very limited number of drugs; " +
        "including drugs produced by these manufacturers with high market potential",
      "Unique dosages and dosage forms of the drugs not available in the market. Manufacturers having such drugs in " +
        "their portfolios",
      "Manufacturers with the product line at the distributor request (availability of a certain drug from different " +
        "suppliers)",
      "Competitors with similar drugs range",
      "Distributors analysis by country, and your Company place in it. Business development strategies",
      "Competitor analysis with regard to product line groups (what are other distributors offering)",
    ],
    name: "Market Distributors",
  },
];
</script>

<style scoped>
.types {
  margin-bottom: 32px;
  padding-top: 32px;
  background-image: linear-gradient(#fbfbfe, #fbfbfe);
  background-position: top center;
  background-size: 100% calc(100% - 68px);
  background-repeat: no-repeat;
}

@media (min-width: 768px) {
  .types {
    margin-bottom: 60px;
    padding-top: 60px;
  }
}

@media (min-width: 1170px) {
  .types {
    z-index: 1;
    margin: 0;
    padding: 0;
    background-image: none;
  }
}

@media (min-width: 1170px) {
  :deep(.tabs) {
    position: relative;
  }
}

:deep(.tabs__list) {
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
}

:deep(.tabs__item) {
  position: relative;
  z-index: 1;
}

:deep(.tabs__list::-webkit-scrollbar) {
  display: none;
}

:deep(.tabs__button) {
  width: 180px;
  height: 100%;
  padding: 16px 16px 36px;
  font-size: 16px;
  text-align: center;
}

@media (min-width: 768px) {
  :deep(.tabs__button) {
    width: 232px;
    padding: 16px 50px 36px;
  }
}

@media (min-width: 1170px) {
  :deep(.tabs__button) {
    width: 245px;
  }
}

:deep(.tabs__button.active) {
  border-radius: 8px 8px 0 0;
  font-weight: 600;
  color: #e80061;
  background-color: #ffffff;
}

:deep(.tab) {
  position: relative;
  top: -1px;
  padding: 28px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 50px rgb(0 89 193 / 0.1);
}

@media (min-width: 1170px) {
  :deep(.tab) {
    position: absolute;
    top: 100px;
    left: 0;
  }
}

:deep(.tabs.active-first-tab .tab) {
  border-top-left-radius: 0;
}

.types__list {
  display: grid;
  grid-row-gap: 24px;
  margin: 0;
  padding-left: 0;
}

.types__item {
  display: flex;
  align-items: flex-start;
  font-size: 16px;
}

.types__tabs:not(.full) .types__item:nth-last-child(-n + 4) {
  display: none;
}

.types__item::before {
  content: "";
  flex: none;
  width: 7px;
  height: 7px;
  margin: 7px 20px 7px 7px;
  border-radius: 50%;
  background-color: #e80061;
}

.types__button {
  grid-column-gap: 12px;
  width: auto;
  margin-top: 40px;
  padding-left: 34px;
  font-weight: 600;
  font-size: 16px;
  color: #e80061;
}

.types__tabs.full .types__icon {
  transform: rotate(180deg);
}
</style>
