<template>
  <section class="vacancies">
    <div class="vacancies__box-title">
      <CabinetTitle class="vacancies__title">
        HR
      </CabinetTitle>
      <BaseSelect
        id="more-service"
        class="vacancies__select-service"
        label="More about the service"
        name="more-service"
        :options="moreService"
        size="medium"
        tag="title"
        value-key="id"
      />
    </div>
    <CabinetHRcardSubscription />

    <hr class="divider" />

    <CabinetHRvacanciesList />
  </section>
</template>

<script setup>
import { useHead } from "@vueuse/head";
import {PROJECT_NAME} from "~/constants/meta.js";

import BaseSelect from "~/components/base/BaseSelectBox/BaseSelect.vue";
import CabinetTitle from "~/pages/Cabinet/components/CabinetTitle.vue";

import CabinetHRcardSubscription from "./components/CabinetHRcardSubscription.vue";
import CabinetHRvacanciesList from "./components/CabinetHRvacanciesList.vue";

useHead({
  title: `HR - vacancies | ${PROJECT_NAME}`,
});

const moreService = [
  {
    id: 1,
    title: "Service 1",
  },
  {
    id: 2,
    title: "Service 2",
  },
  {
    id: 3,
    title: "Service 3",
  },
  {
    id: 4,
    title: "Service 4",
  },
  {
    id: 5,
    title: "Service 5",
  },
];
</script>

<style scoped>
.vacancies {
  position: relative;
  max-width: 1440px;
  width: 100%;
}

.vacancies__box-title {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

@media (min-width: 768px) {
  .vacancies__box-title {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.vacancies__title.title {
  margin-bottom: 8px;
}

@media (min-width: 768px) {
  .vacancies__title.title {
    margin-bottom: 0;
  }
}

@media (min-width: 572px) {
  .vacancies__select-service {
    max-width: 250px;
  }
}

.divider {
  width: 100%;
  height: 1px;
  margin: 32px 0;
  border: none;
  background-color: #e7f0fe;
}
</style>
