<template>
  <section class="hr-create-container">
    <CabinetTitle>Create vacancy</CabinetTitle>
    <BaseAccordion
      v-for="accordion in accordions"
      :key="accordion.id"
      class="accordion"
      :is-opened="step === accordion.id"
      @opened="clickOpened(accordion.id)"
    >
      <div class="accordion__title">
        <span class="accordion__number">
          {{ accordion.id }}
        </span>
        <span>
          {{ accordion.title }}
        </span>
      </div>
      <template #content>
        <div class="accordion__body">
          <CabinetHRCreateMainInformation v-if="accordion.id === 1" />
          <CabinetHRCreateDescription v-if="accordion.id === 2" />
          <CabinetHRCreateContact v-if="accordion.id === 3" />
          <CabinetHRCreateButtonsBlock
            :is-first-block="accordion.id === 1"
            :is-last-block="accordion.id === 3"
            :next-button-text="accordion.nextButtonText"
            @back-step="backStep"
            @next-step="nextStep"
          />
        </div>
      </template>
    </BaseAccordion>
  </section>
</template>

<script setup>
import { ref } from "vue";

import BaseAccordion from "~/components/base/BaseAccordion.vue";

import CabinetTitle from "../components/CabinetTitle.vue";

import CabinetHRCreateButtonsBlock from "./components/cabinetHRCreate/CabinetHRCreateButtonsBlock.vue";
import CabinetHRCreateContact from "./components/cabinetHRCreate/CabinetHRCreateContact.vue";
import CabinetHRCreateDescription from "./components/cabinetHRCreate/CabinetHRCreateDescription.vue";
import CabinetHRCreateMainInformation from "./components/cabinetHRCreate/CabinetHRCreateMainInformation.vue";

const accordions = [
  {
    id: 1,
    isOpened: true,
    nextButtonText: "Next step",
    title: "Main information",
  },
  {
    id: 2,
    isOpened: false,
    nextButtonText: "Next step",
    title: "Description",
  },
  {
    id: 3,
    isOpened: false,
    nextButtonText: "Yalla!",
    title: "Contact",
  },
];

const step = ref(1);

const clickOpened = (stepId) => {
  step.value = stepId;
};

const nextStep = () => {
  if (step.value !== 3) {
    step.value += 1;
  }
};

const backStep = () => {
  step.value -= 1;
};
</script>

<style scoped>
@media (min-width: 768px) {
  .hr-create-container {
    max-width: 692px;
  }
}

.accordion {
  margin: 0 -16px 16px;
}

@media (min-width: 768px) {
  .accordion {
    margin: 0 0 16px;
  }
}

.accordion__title {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 32px;
  border: 1px solid #f6f7fb;
  background-color: #ffffff;
  box-shadow: 0 1px 16px rgb(0 42 81 / 0.06);
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .accordion__title {
    border-radius: 8px;
  }
}

.accordion--active .accordion__title {
  border: 1px solid #f6f7fb;
  background-color: #f6f7fb;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .accordion--active .accordion__title {
    border-radius: 8px 8px 0 0;
  }
}

.accordion__body {
  padding: 24px 16px;
  border-bottom: 1px solid #e7f0fe;
  border-left: 1px solid #e7f0fe;
  border-right: 1px solid #e7f0fe;
  background: #ffffff;
  box-shadow: 0 1px 16px rgb(0 42 81 / 0.06);
}

@media (min-width: 768px) {
  .accordion__body {
    padding: 24px 94px;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 1px 16px rgb(0 42 81 / 0.06);
  }
}

@media (min-width: 768px) {
  .accordion__body {
    padding: 24px 94px 32px;
  }
}

.accordion__number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  border: 2px solid #e7f0fe;
  border-radius: 50%;

  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  color: #647c9f;
  background: #ffffff;

  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.accordion--active .accordion__number {
  color: #ffffff;
  background-color: #e80061;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}
</style>
