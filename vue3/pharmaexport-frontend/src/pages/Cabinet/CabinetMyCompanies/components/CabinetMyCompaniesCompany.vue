<template>
  <section
    v-if="currentCompany"
    class="company"
  >
    <p class="company__title">
      {{ currentCompany.name }}
    </p>

    <ul class="company__list">
      <CabinetMyCompaniesItem
        :description="currentCompany.name"
        title="Company name"
      />
      <CabinetMyCompaniesItem
        :description="currentCompany.registration_number"
        title="Registration number"
      />
      <CabinetMyCompaniesItem
        :description="currentCountry?.name"
        title="Country of registration"
      />
      <CabinetMyCompaniesItem
        v-if="currentCompany.site"
        :description="currentCompany.site"
        title="Site"
      />
    </ul>

    <CabinetMyCompaniesFiles :current-company-files="currentCompany.documents_verification" />

    <RouterLink :to="{ name: 'cabinetCompanyEdit', params: { id: currentCompany.id } }">
      <!-- TODO: Убрать кнопку -->
      <BaseButton
        class="company__button"
        :modifiers="['round', 'small', 'blue']"
      >
        Edit
      </BaseButton>
    </RouterLink>
  </section>

  <p v-else>
    Companies is not found, create NEW!
  </p>
</template>

<script setup>
import { RouterLink } from "vue-router";

import BaseButton from "~/components/base/BaseButton.vue";

import CabinetMyCompaniesFiles from "./CabinetMyCompaniesFiles.vue";
import CabinetMyCompaniesItem from "./CabinetMyCompaniesItem.vue";

defineProps({
  currentCompany: {
    default: null,
    required: true,
    type: [
      Object,
      null,
    ],
  },
  currentCountry: {
    default: null,
    required: true,
    type: [
      Object,
      null,
    ],
  },
});
</script>

<style scoped>
.company {
  padding-top: 20px;
}

@media (min-width: 768px) {
  .company {
    padding: 32px;
    border: 1px solid var(--border-color-primary);
    border-radius: 8px;
  }
}

.company__title {
  margin-bottom: 20px;
  font-weight: 600;
}

.company__list {
  display: grid;
  grid-auto-flow: row;
  grid-gap: 20px;
  margin: 0 0 24px;
  padding-left: 0;
}

@media (min-width: 550px) {
  .company__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-row-gap: 20px;
  }
}

.company__button {
  width: auto;
}
</style>
