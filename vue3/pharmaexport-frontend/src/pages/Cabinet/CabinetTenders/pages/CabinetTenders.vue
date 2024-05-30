<template>
  <div class="tenders__container">
    <div class="tenders__wrapper">
      <CabinetTitle class="tenders__title">
        My Tenders
      </CabinetTitle>

      <RouterLink
        :to="{
          ...useCheckAccess('TENDERS_VIEW_SELLER') && { name: 'cabinetTendersUpload' },
          ...useCheckAccess('TENDERS_VIEW_BUYER') && { name: 'cabinetTendersStart' },
        }"
      >
        <BaseButton :modifiers="['small', 'half-round', 'blue']">
          <template v-if="useCheckAccess('TENDERS_VIEW_SELLER')">
            Upload price
          </template>
          <template v-if="useCheckAccess('TENDERS_VIEW_BUYER')">
            Start new Tender
          </template>
        </BaseButton>
      </RouterLink>
    </div>

    <!--    <BaseTabs v-if="useCheckAccess('TENDERS_VIEW_SELLER')"> -->
    <!--      <BaseTabItem name="My INN"> -->
    <!--        <BaseInput -->
    <!--          id="search-inn" -->
    <!--          label="Найти" -->
    <!--          name="search-inn" -->
    <!--          placeholder="Найти" -->
    <!--        /> -->
    <!--        <CabinetTendersINNTable :items="INN" /> -->
    <!--      </BaseTabItem> -->

    <!--      <BaseTabItem name="Active"> -->
    <!--        <BaseInput -->
    <!--          id="search-active" -->
    <!--          label="Найти" -->
    <!--          name="search-active" -->
    <!--          placeholder="Найти" -->
    <!--        /> -->
    <!--        <CabinetTendersTable :tenders="distributorTendersActive" /> -->
    <!--      </BaseTabItem> -->

    <!--      <BaseTabItem name="Archive"> -->
    <!--        <BaseInput -->
    <!--          id="search-archive" -->
    <!--          label="Найти" -->
    <!--          name="search-archive" -->
    <!--          placeholder="Найти" -->
    <!--        /> -->
    <!--        <CabinetTendersTable :tenders="distributorTendersArchive" /> -->
    <!--      </BaseTabItem> -->
    <!--    </BaseTabs> -->

    <!--    <BaseTabs v-if="useCheckAccess('TENDERS_VIEW_BUYER')"> -->
    <!--      <BaseTabItem name="Active"> -->
    <!--        <CabinetTendersTable :tenders="tendersActive" /> -->
    <!--      </BaseTabItem> -->

    <!--      <BaseTabItem name="Archive"> -->
    <!--        <CabinetTendersTable :tenders="tendersArchive" /> -->
    <!--      </BaseTabItem> -->
    <!--    </BaseTabs> -->
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";

import useCheckAccess from "~/assets/scripts/functions/useCheckAccess.js";
import BaseButton from "~/components/base/BaseButton.vue";

/*
 * Import BaseInput from "~/components/base/BaseInput.vue";
 * import BaseTabItem from "~/components/base/BaseTabItem.vue";
 * import BaseTabs from "~/components/base/BaseTabs.vue";
 */

import CabinetTitle from "../../components/CabinetTitle.vue";

/*
 * Import CabinetTendersINNTable from "../components/CabinetTendersINNTable.vue";
 * import CabinetTendersTable from "../components/CabinetTendersTable.vue";
 */

/*
 * const INN = [
 *   {
 *     form: "Tablets",
 *     inn: "Acetylsalicylic acid + Coffeine",
 *     name: "Acetylsalicylic acid + Coffeine, Tablets 500 mg + 50 mg",
 *   },
 *   {
 *     form: "Tablets",
 *     inn: "Acetylsalicylic acid + Coffeine",
 *     name: "Acetylsalicylic acid + Coffeine, Tablets 500 mg + 50 mg",
 *   },
 *   {
 *     form: "Tablets",
 *     inn: "Acetylsalicylic acid + Coffeine",
 *     name: "Acetylsalicylic acid + Coffeine, Tablets 500 mg + 50 mg",
 *   },
 *   {
 *     form: "Tablets",
 *     inn: "Acetylsalicylic acid + Coffeine",
 *     name: "Acetylsalicylic acid + Coffeine, Tablets 500 mg + 50 mg",
 *   },
 *   {
 *     form: "Tablets",
 *     inn: "Acetylsalicylic acid + Coffeine",
 *     name: "Acetylsalicylic acid + Coffeine, Tablets 500 mg + 50 mg",
 *   },
 * ];
 *
 * const distributorTendersActive = [
 *   {
 *     amount: 3,
 *     date: "22.06.2022",
 *     deliveryStatus: "Is delivering",
 *     number: 45673,
 *     status: "In processing",
 *     sum: "$ 521 000",
 *   },
 *   {
 *     amount: 5,
 *     date: "22.06.2022",
 *     deliveryStatus: "-",
 *     number: 45670,
 *     status: "Active",
 *     sum: "$ 12 000",
 *   },
 *   {
 *     amount: 10,
 *     date: "22.06.2022",
 *     deliveryStatus: "Delivered",
 *     number: 45668,
 *     status: "In processing",
 *     sum: "$ 48 000",
 *   },
 *   {
 *     amount: 6,
 *     date: "22.06.2022",
 *     deliveryStatus: "Delivered",
 *     number: 45667,
 *     status: "Closed",
 *     sum: "$ 871 000",
 *   },
 *   {
 *     amount: 2,
 *     date: "22.06.2022",
 *     deliveryStatus: "Delivered",
 *     number: 45662,
 *     status: "Closed",
 *     sum: "$ 2 500",
 *   },
 * ];
 *
 * const distributorTendersArchive = [
 *   {
 *     amount: 3,
 *     date: "22.06.2022",
 *     deliveryStatus: "Is delivering",
 *     number: 45673,
 *     status: "In processing",
 *     sum: "$ 521 000",
 *   },
 *   {
 *     amount: 5,
 *     date: "22.06.2022",
 *     deliveryStatus: "-",
 *     number: 45670,
 *     status: "Active",
 *     sum: "$ 12 000",
 *   },
 *   {
 *     amount: 10,
 *     date: "22.06.2022",
 *     deliveryStatus: "Delivered",
 *     number: 45668,
 *     status: "In processing",
 *     sum: "$ 48 000",
 *   },
 *   {
 *     amount: 6,
 *     date: "22.06.2022",
 *     deliveryStatus: "Delivered",
 *     number: 45667,
 *     status: "Closed",
 *     sum: "$ 871 000",
 *   },
 *   {
 *     amount: 2,
 *     date: "22.06.2022",
 *     deliveryStatus: "Delivered",
 *     number: 45662,
 *     status: "Closed",
 *     sum: "$ 2 500",
 *   },
 * ];
 *
 * const tendersActive = [
 *   {
 *     amount: 3,
 *     date: "22.06.2022",
 *     deliveryStatus: "Is delivering",
 *     number: 45673,
 *     status: "In processing",
 *     sum: "$ 521 000",
 *   },
 *   {
 *     amount: 5,
 *     date: "22.06.2022",
 *     deliveryStatus: "-",
 *     number: 45670,
 *     status: "Active",
 *     sum: "$ 12 000",
 *   },
 *   {
 *     amount: 10,
 *     date: "22.06.2022",
 *     deliveryStatus: "Delivered",
 *     number: 45668,
 *     status: "In processing",
 *     sum: "$ 48 000",
 *   },
 *   {
 *     amount: 6,
 *     date: "22.06.2022",
 *     deliveryStatus: "Delivered",
 *     number: 45667,
 *     status: "Closed",
 *     sum: "$ 871 000",
 *   },
 *   {
 *     amount: 2,
 *     date: "22.06.2022",
 *     deliveryStatus: "Delivered",
 *     number: 45662,
 *     status: "Closed",
 *     sum: "$ 2 500",
 *   },
 * ];
 *
 * const tendersArchive = [
 *   {
 *     amount: 3,
 *     date: "22.06.2022",
 *     deliveryStatus: "Is delivering",
 *     number: 45673,
 *     status: "In processing",
 *     sum: "$ 521 000",
 *   },
 *   {
 *     amount: 5,
 *     date: "22.06.2022",
 *     deliveryStatus: "-",
 *     number: 45670,
 *     status: "Active",
 *     sum: "$ 12 000",
 *   },
 *   {
 *     amount: 10,
 *     date: "22.06.2022",
 *     deliveryStatus: "Delivered",
 *     number: 45668,
 *     status: "In processing",
 *     sum: "$ 48 000",
 *   },
 *   {
 *     amount: 6,
 *     date: "22.06.2022",
 *     deliveryStatus: "Delivered",
 *     number: 45667,
 *     status: "Closed",
 *     sum: "$ 871 000",
 *   },
 *   {
 *     amount: 2,
 *     date: "22.06.2022",
 *     deliveryStatus: "Delivered",
 *     number: 45662,
 *     status: "Closed",
 *     sum: "$ 2 500",
 *   },
 * ];
 */
</script>

<style scoped>
@media (min-width: 768px) {
  .tenders__container {
    max-width: 943px;
    width: 100%;
  }
}

.tenders__wrapper {
  display: grid;
  grid-row-gap: 16px;
  margin-bottom: 6px;
}

@media (min-width: 450px) {
  .tenders__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.tenders__title {
  margin-bottom: 0;
}

:deep(.tabs) {
  margin-bottom: 24px;
}

:deep(.tabs__list) {
  grid-column-gap: 18px;
  margin-bottom: 32px;
}

:deep(.tabs__button) {
  padding: 22px 0;
}

:deep(.tabs__button.active) {
  border-bottom: 2px solid var(--border-color-secondary);
  font-weight: 600;
}

/* TODO: Утащить в отдельный компонент */

:deep(.input__container) {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  :deep(.input__container::before) {
    content: "Filters";
    margin-right: 20px;
    font-size: 12px;
    color: #8292a1;
  }
}

:deep(.input__wrapper) {
  max-width: 405px;
}

:deep(.input) {
  background-image: url("~/assets/icons/search.svg");
  background-position: left 12px center;
  background-size: 18px 18px;
  background-repeat: no-repeat;
}

:deep(.input),
:deep(.input:focus) {
  height: 40px;
  padding: 12px 12px 12px 38px;
}

:deep(.input__label) {
  left: 38px;
}

:deep(.input:focus ~ .input__label),
:deep(.input:not(:placeholder-shown) ~ .input__label) {
  display: none;
}
</style>
