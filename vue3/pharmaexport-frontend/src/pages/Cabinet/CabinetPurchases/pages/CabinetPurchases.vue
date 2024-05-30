<template>
  <section class="purchases__container">
    <div class="purchases__title-wrapper">
      <CabinetTitle class="purchases__title">
        Purchases
      </CabinetTitle>
      <RouterLink :to="{ ...useCheckAccess('PURCHASES_VIEW_BUTTON_UPLOAD') && { name: 'CabinetPurchasesUpload' } }">
        <BaseButton
          v-if="useCheckAccess('PURCHASES_VIEW_BUTTON_UPLOAD')"
          :modifiers="['small', 'half-round', 'purple']"
        >
          Upload price
        </BaseButton>
      </RouterLink>
    </div>

    <CabinetPurchasesFiltersProductName
      :current-tab="currentTab"
      @filters="updateFilterByName($event)"
    />

    <BaseTabs v-model="currentTab">
      <BaseTabItem
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
      >
        <RouterView
          :filter-by-name="filterByName"
          :name="tab.component"
        />
      </BaseTabItem>
    </BaseTabs>

    <CabinetPurchasesBasket :current-tab="currentTab" />
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter, RouterLink, onBeforeRouteUpdate } from "vue-router";

import useCheckAccess from "~/assets/scripts/functions/useCheckAccess.js";
import BaseButton from "~/components/base/BaseButton.vue";
import BaseTabItem from "~/components/base/BaseTabItem.vue";
import BaseTabs from "~/components/base/BaseTabs.vue";

import CabinetTitle from "../../components/CabinetTitle.vue";
import CabinetPurchasesBasket from "../components/CabinetPurchasesBasket.vue";
import CabinetPurchasesFiltersProductName from "../components/CabinetPurchasesFiltersProductName.vue";

const router = useRouter();
const filterByName = ref({});
const isCurrentTab = ref("INN");

const tabs = ref([
  {
    component: "inn",
    name: "INN",
  },
  {
    component: "ctd",
    name: "CTD-Dossier",
  },
  {
    component: "api",
    name: "API",
  },
]);

const changeTab = async (tabName) => {
  let routeName = "cabinetPurchasesInn";

  isCurrentTab.value = tabName;

  switch (tabName) {
    case "INN": {
      routeName = "cabinetPurchasesInn";

      break;
    }

    case "CTD-Dossier": {
      routeName = "cabinetPurchasesCtd";

      break;
    }

    case "API": {
      routeName = "cabinetPurchasesApi";

      break;
    }

    default: {
      break;
    }
  }

  await router.push({
    name: routeName,
  });
};

const currentTab = computed({
  get() {
    return isCurrentTab.value;
  },
  set(tab) {
    changeTab(tab);
  },
});

onBeforeRouteUpdate((to) => {
  if (to.name === "cabinetPurchases") {
    changeTab(currentTab.value);
  }
});

const updateFilterByName = (event) => {
  filterByName.value = event;
};
</script>

<style scoped>
.purchases__container {
  width: 100%;
}

.purchases__title-wrapper {
  display: grid;
  grid-row-gap: 16px;
  margin-bottom: 24px;
}

@media (min-width: 450px) {
  .purchases__title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.purchases__title {
  margin-bottom: 0;
}

@media (min-width: 1170px) {
  .purchases__container {
    max-width: 943px;
  }
}

:deep(.purchases__form-row--select) {
  grid-column-gap: 16px;
  margin-bottom: 24px;
}

:deep(.tabs__list) {
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  border-bottom: 1px solid #e7f0fe;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}

:deep(.tabs__list::-webkit-scrollbar) {
  display: none;
}

:deep(.tabs__item) {
  scroll-snap-align: center;
}

:deep(.tabs__button) {
  position: relative;
  padding: 4px 16px 24px;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
}

:deep(.tabs__button::after) {
  content: "";
  position: absolute;
  bottom: 0 /* TODO: Лучше -1px, но тогда обрезается половина обводки */;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--border-color-secondary);
  transform: scale(0);
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

:deep(.tabs__button.active::after) {
  transform: scale(1);
}

:deep(.purchases__divider) {
  margin: 0 0 24px;
  border: none;
  border-bottom: 1px solid #e7f0fe;
}

:deep(.purchases__text) {
  color: #647c9f;
}

:deep(.purchases-table__wrapper) {
  position: relative;
  margin: 0 -16px;
  border-top: 1px solid var(--border-color-primary);
  border-bottom: 1px solid var(--border-color-primary);
  font-size: 12px;
}

@media (min-width: 768px) {
  :deep(.purchases-table__wrapper) {
    width: 100%;
    margin: 0;
    border: 1px solid var(--border-color-primary);
    border-radius: 8px;
  }
}

/* TODO: Вынести в helpers */

:deep(.purchases-table__wrapper::-webkit-scrollbar) {
  height: 16px;
  background-color: transparent;
}

:deep(.purchases-table__wrapper::-webkit-scrollbar-track) {
  margin: 16px;
}

@media (min-width: 768px) {
  :deep(.purchases-table__wrapper::-webkit-scrollbar-track) {
    margin: 0;
  }
}

:deep(.purchases-table__wrapper::-webkit-scrollbar-thumb) {
  min-height: 150px;
  border: 4px solid transparent;
  border-radius: 8px;
  background-color: #647c9f;
  background-clip: content-box;
}

@media (any-pointer: fine) {
  :deep(.purchases-table__wrapper::-webkit-scrollbar-thumb:hover) {
    background-color: #2b4c6a;
  }
}

:deep(.purchases-table) {
  width: 100%;
  border-collapse: collapse;
}

:deep(.purchases-table__header) {
  position: sticky;
  top: 0;
  z-index: 1;
}

@media (min-width: 1170px) {
  :deep(.purchases-table__header) {
    top: 0;
  }
}

:deep(.purchases-table__row:not(:last-child)) {
  border-bottom: 1px solid var(--border-color-primary);
}

:deep(.purchases-table__header .purchases-table__cell) {
  align-items: center;
  text-align: left;
}

:deep(.purchases-table__header .purchases-table__cell, .purchases-table__header .purchases-table__cell--tablet) {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  justify-content: start;
}

:deep(.purchases-table__header .purchases-table__cell--tablet) {
  display: none;
}

@media (max-width: 570px) {
  :deep(.purchases-table__header .purchases-table__cell--mobile) {
    display: none;
  }
}

@media (min-width: 768px) {
  :deep(.purchases-table__header .purchases-table__cell--tablet) {
    display: grid;
  }
}

:deep(.purchases-table__body .purchases-table__row) {
  position: relative;
  padding: 20px 16px;
  background-color: transparent;
}

:deep(.purchases-table__body .purchases-table__cell:not(.purchases-table__cell--action)) {
  padding-right: 10px;
  word-break: break-word;
}

:deep(.button-add-basket) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
}

:deep(.purchases__form-filters-wrapper) {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-flow: row;
  grid-gap: 20px;
  margin-bottom: 20px;
}

@media (min-width: 570px) {
  :deep(.purchases__form-filters-wrapper) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
