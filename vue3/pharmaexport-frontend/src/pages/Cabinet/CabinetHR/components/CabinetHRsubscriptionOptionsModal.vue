<template>
  <BaseModal id="subscription-options">
    <p class="subscription-options__title">Choose the most suitable option</p>
    <div class="subscription-options__box-options">
      <CabinetHRsubscriptionOptionItem
        v-for="option in dataSubscriptionOptions"
        :key="option.title"
        :optionData="option"
        class="subscription-options__item"
      />
    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from "~/components/base/BaseModal.vue";
import CabinetHRsubscriptionOptionItem from "./CabinetHRsubscriptionOptionItem.vue";

const dataSubscriptionOptions = [
  {img: 'subscription-easy-start.svg', title: 'Easy start', price: 'Free',priceColor: 'base', amountVacancy: '1', duration: '7 days'},
  {img: 'subscription-forward.svg', title: 'GO forward', price: '30',priceColor: 'orange', amountVacancy: 'from 1 to 3', duration: '1 month'},
  {img: 'subscription-headHunt-prof.svg', title: 'HeadHunt Prof', price: '50',priceColor: 'purple', amountVacancy: 'from 1 to 10', duration: '6 month'},
]
</script>

<style scoped>
.subscription-options__title {
  font-weight: 600;
  line-height: 1.8;
  margin-top: -10px;
}

@media (min-width: 768px) {
  .subscription-options__title {
    margin-bottom: 30px;
  }
}

.subscription-options__box-options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px 16px;
  margin: 0 -16px;
}

@media (min-width: 768px) {
  .subscription-options__box-options {
    padding: 0;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .subscription-options__box-options {
    overflow-x: scroll;
  }
}

:global(#subscription-options.modal) {
  max-width: fit-content;
}

.subscription-options__box-options :deep(.subscription-option) {
  padding: 40px 16px;
  box-shadow: 0 0 50px rgba(0, 89, 193, 0.1);
  border-radius: 8px;
  min-width: 288px;
}
.subscription-options__box-options :deep(.subscription-option:first-child) {
  margin-right: 50px;
}
.subscription-options__box-options :deep(.subscription-option:last-child) {
  margin-left: 50px;
}

@media (min-width: 768px) {
  .subscription-options__box-options :deep(.subscription-option) {
    padding: 0 50px;
    box-shadow: none;
    border-radius: 0;
    min-width: auto;
  }
  .subscription-options__box-options :deep(.subscription-option:first-child) {
    padding-left: 0;
    border-right: 1px solid #E7F0FE;
    margin: 0;
  }
  .subscription-options__box-options :deep(.subscription-option:last-child) {
    padding-right: 0;
    border-left: 1px solid #E7F0FE;
    margin: 0;
  }
}
</style>
