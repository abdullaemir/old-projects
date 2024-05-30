<template>
  <section
    v-if="currentPayment"
    class="payment"
  >
    <ul class="payment__list">
      <CabinetMyPaymentsMethodsItem
        class="payment__item"
        :description="currentPayment.payment_method === 'crypto_wallet' ? 'Crypto wallet' : 'Crypto'"
        title="Type"
      />
      <CabinetMyPaymentsMethodsItem
        class="payment-item--long-name payment__item"
        :description="currentPayment.wallet"
        title="Number"
      />
      <CabinetMyPaymentsMethodsItem
        class="payment-item--long payment__item"
        :description="
          currentPayment.available === 'administrator'
            ? 'Only Administrator of Account'
            : 'Any user with permission to My payment methods block'
        "
        title="Who can see my type of payments"
      />
    </ul>

    <RouterLink :to="{ name: 'cabinetMyPaymentMethodEdit', params: { id: currentPayment.id } }">
      <!-- TODO: Убрать кнопку -->
      <BaseButton
        class="payment__button"
        :modifiers="['round', 'blue']"
      >
        Edit
      </BaseButton>
    </RouterLink>
  </section>

  <p v-else>
    Payment methods is not found, create NEW!
  </p>
</template>

<script setup>
import { RouterLink } from "vue-router";

import BaseButton from "~/components/base/BaseButton.vue";

import CabinetMyPaymentsMethodsItem from "./CabinetMyPaymentMethodsItem.vue";

defineProps({
  currentPayment: {
    default() {
      return {};
    },
    required: false,
    type: Object,
  },
});
</script>

<style scoped>
@media (min-width: 768px) {
  .payment {
    padding: 32px;
    border: 1px solid var(--border-color-primary);
    border-radius: 8px;
  }
}

.payment__list {
  display: flex;
  flex-direction: column;
  margin: 0 0 32px;
  padding-left: 0;
}

@media (min-width: 550px) {
  .payment__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-row-gap: 20px;
  }
}

@media (max-width: 549px) {
  .payment__item:not(:last-child) {
    margin-bottom: 20px;
  }
}

@media (min-width: 768px) {
  .payment-item--long {
    grid-column: 1 / -1;
  }
}

.payment-item--long-name {
  word-wrap: break-word;
}

.payment__button {
  width: auto;
}
</style>
