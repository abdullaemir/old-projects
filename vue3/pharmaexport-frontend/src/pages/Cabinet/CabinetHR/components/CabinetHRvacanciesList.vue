<template>
  <div class="vacancies-list">
    <div class="vacancies-list__header">
      <p class="vacancies-list__counter">
        All your vacancies
        <span class="vacancies-list__count">
          ({{arrVacancies.length}})
        </span>
      </p>
      <div class="vacancies-list__box-actions">
        <BaseSelect
          v-if="arrVacancies && arrVacancies.length"
          id="more-service"
          name="more-service"
          class="vacancies__select-service"
          label="Choose an option"
          :options="optionsVacancy"
          tag="title"
          valueKey="value"
          rounded
          :filterable="false"
          :size="isTablet ? 'medium' : 'large'"
        ></BaseSelect>

        <BaseButton
          class="vacancies-list__button-post"
          :modifiers="['round', 'blue', isTablet? 'small' : 'large']"
          type="submit"
          @click.prevent=""
        >
          Post vacancy
        </BaseButton>
      </div>
    </div>
    <div v-if="arrVacancies && arrVacancies.length" class="vacancies-list__container-items">
      <CabinetHRvacancyItem v-for="vacancy in arrVacancies" :key="vacancy.id" :data-vacancy="vacancy" />
    </div>
    <p v-else class="vacancies-list__null-published">Nothing has been published yet</p>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {useBreakpoints} from "@vueuse/core";
import BaseSelect from "~/components/base/BaseSelectBox/BaseSelect.vue";
import BaseButton from "~/components/base/BaseButton.vue";
import CabinetHRvacancyItem from "./CabinetHRvacancyItem.vue";

const breakpoints = useBreakpoints({
  tablet: 768,
});

const tablet = ref(breakpoints.greater("tablet"));
const isTablet = ref(false)

onMounted(()=>{
  isTablet.value = tablet.value
})
watch(tablet, (newVal) => {
  isTablet.value = newVal
})

/* eslint-disable vue/sort-keys */
const arrVacancies = [
  {id: 1, title: "Gastroenterologist 1", status: "Published", },
  {id: 2, title: "Pharmacist 1", status: "Moderation", },
  {id: 3, title: "Gastroenterologist 2", status: "Show stopped", },
  {id: 4, title: "Pharmacist 2", status: "Archived", },
  {id: 5, title: "Gastroenterologist 1", status: "Published", },
  {id: 6, title: "Pharmacist 1", status: "Moderation", },
  {id: 7, title: "Gastroenterologist 2", status: "Show stopped", },
  {id: 8, title: "Pharmacist 2", status: "Archived", },
]

const optionsVacancy = [
  {id: 1, value: 'all', title: "All options"},
  {id: 2, value: 'published', title: "Published"},
  {id: 3, value: 'moderated', title: "Moderated",},
  {id: 4, value: 'show-stopped', title: "Show stopped"},
  {id: 5, value: 'archived', title: "Archived"},
]

</script>

<style scoped>

.vacancies-list__header {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

@media (min-width: 768px) {
  .vacancies-list__header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}

.vacancies-list__count {
  color: #8292A1;
}

.vacancies__select-service {
  width: 100%;
  margin-right: 0;
}
@media (min-width: 768px) {
  .vacancies__select-service {
    width: 200px;
    margin-right: 20px;
  }
}

.vacancies-list__box-actions {
  display: flex;
  flex-direction: column-reverse;
}

@media (min-width: 768px) {
  .vacancies-list__box-actions {
    flex-direction: row;
    align-items: center;
  }
}

.vacancies-list__button-post {
  width: 100%;
  margin-top: 12px;
  margin-bottom: 18px;
}

@media (min-width: 768px) {
  .vacancies-list__button-post {
    width: auto;
    margin: 0;
  }
}

.vacancies-list__container-items {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 12px;
}

@media (min-width: 600px) {
  .vacancies-list__container-items {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 20px;
  }
}

.vacancies-list__null-published {
  color: #647C9F;
}
</style>
