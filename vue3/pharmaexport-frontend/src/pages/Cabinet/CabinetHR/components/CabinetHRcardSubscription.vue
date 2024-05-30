<template>
  <div class="card-subscription">
    <div>
      <p class="card-subscription__available-title">Subscription available until</p>
      <p class="card-subscription__available-date">01.01.22</p>
      <p class="card-subscription__vacancy-counter">Available vacancies for placement: 3</p>
    </div>
    <BaseButton
      class="card-subscription__button-pay"
      :modifiers="['medium', 'round', 'purple']"
      type="submit"
      @click.prevent="useModal.openModal('subscription-options', $event)"
    >
      <svg width="21" height="21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="a" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
          <path fill="#D9D9D9" d="M0 0h21v21H0z"/>
        </mask>
        <g mask="url(#a)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7h14v2h2V7a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v11c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-2h-2v2H3V7Z" fill="#fff"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3 4h13v5h2V4a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h13a2 2 0 0 0 2-2v-2h-2v2H3V4Z" fill="#fff"/>
          <rect x="13" y="10" width="7" height="5" rx="1" stroke="#fff" stroke-width="2"/>
          <rect x="15" y="12" width="3" height="1" rx=".5" fill="#fff"/>
        </g>
      </svg>
      Pay
    </BaseButton>
  </div>

  <CabinetHRsubscriptionOptionsModal/>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";
import { useModal } from "~/components/base/BaseModal.vue";
import CabinetHRsubscriptionOptionsModal from "./CabinetHRsubscriptionOptionsModal.vue";
</script>

<style scoped>
p, span {
  color: #fff
}

.card-subscription {
  margin: 0 -16px;
  padding: 16px 16px 24px;
  background: center right no-repeat url("../assets/images/bg-card-subscription.svg"), linear-gradient(75.41deg, #011965 -0.67%, #00063D 78.99%, #FF0063 109.61%);
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .card-subscription {
    padding: 32px;
    max-width: 570px;
    flex-direction: row;
    justify-content: space-between;
    margin: 0;
    border-radius: 8px;
  }
}

.card-subscription__button-pay {
  width: auto;
}

.card-subscription__available-title {
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 8px;
}

.card-subscription__available-date {
  font-size: 24px;
  line-height: 1.5;
  margin-bottom: 12px;
}

@media (min-width: 768px) {
  .card-subscription__available-date {
    margin-bottom: 24px;
  }
}

.card-subscription__vacancy-counter {
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  color: #AEBED6;
  margin-bottom: 16px;
}

@media (min-width: 768px) {
  .card-subscription__vacancy-counter {
    margin-bottom: 0;
  }
}
</style>
