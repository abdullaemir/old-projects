<template>
  <BaseSlider
    :active-index="activeIndex"
    class="payments__slider"
    :slides-data="payments"
    :space-between="12"
  >
    <template #wrapper-start>
      <div class="create payments__item">
        <RouterLink
          class="payments__link"
          :to="{ name: 'cabinetMyPaymentMethodCreate' }"
        >
          <img
            alt=""
            aria-hidden="true"
            height="20"
            loading="lazy"
            src="/src/assets/icons/plus.svg"
            width="20"
          />
          Add
        </RouterLink>
      </div>
    </template>

    <template #base-slide="{ slotProps }">
      <div
        v-if="useCheckIsAdminAccess(slotProps.slide.available)"
        class="payments__item"
        :class="[{ active: slotProps.isActive }]"
      >
        <RouterLink
          :id="slotProps.slide.id"
          class="payments__link"
          :to="{ name: 'cabinetMyPaymentMethod', params: { id: slotProps.slide.id } }"
        >
          <span class="payments__number">
            {{ serializePaymentNumber(slotProps.slide.wallet) }}
          </span>
          <span class="payments__type">
            {{ slotProps.slide.payment_method === "card" ? "Card" : "Crypto wallet" }}
          </span>
        </RouterLink>
      </div>
    </template>
  </BaseSlider>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";

import { useCheckIsAdminAccess } from "~/assets/scripts/functions/useCheckAccess.js";
import BaseSlider from "~/components/base/BaseSlider.vue";

const props = defineProps({
  currentPayment: {
    default() {
      return {};
    },
    required: false,
    type: Object,
  },
  payments: {
    default() {
      return {};
    },
    required: false,
    type: Array,
  },
});

const activeIndex = ref(0);

const setActiveIndex = (activePaymentId) => {
  if (activePaymentId && props.payments) {
    const paymentIndex = props.payments.findIndex((payments) => String(payments.id) === String(activePaymentId));

    if (paymentIndex > -1) {
      activeIndex.value = paymentIndex;
    }
  }
};

onMounted(() => setActiveIndex(props.currentPayment?.id));

watch(
  () => props.currentPayment?.id,
  (paymentId) => setActiveIndex(paymentId),
);

const serializePaymentNumber = (number) => {
  if (number.length >= 8) {
    return `${number.substring(0, 4)} ******** ${number.substring(number.length - 4, number.length)}`;
  }

  return number;
};
</script>

<style scoped>
.payments__slider {
  margin: 0 -16px 20px;
  padding: 0 16px 20px;
}

@media (min-width: 768px) {
  .payments__slider {
    margin: 0 0 20px;
    padding: 0 0 20px;
  }
}

:deep(.swiper-slide) {
  width: auto;
}

:deep(.swiper-scrollbar-drag) {
  height: 8px;
  background-color: #647c9f;
}

@media (any-pointer: fine) {
  :deep(.swiper-scrollbar-drag:hover) {
    background-color: #2b4c6a;
  }
}

.payments__slider :deep(.swiper-scrollbar) {
  bottom: 0;
  left: 16px;
  display: flex;
  align-items: center;
  width: calc(100% - 32px);
  height: 20px;
  background-color: transparent;
  cursor: pointer;
}

@media (min-width: 768px) {
  .payments__slider :deep(.swiper-scrollbar) {
    left: 0;
    width: 100%;
  }
}

.payments__item {
  position: relative;
  width: 170px;
  height: 75px;
  padding: 16px;
  border: 2px solid var(--border-color-primary);
  border-radius: 8px;
  font-size: 12px;
  color: var(--text-color-five);
  scroll-snap-align: center;
}

.payments__item.active {
  border: 2px solid var(--pink);
}

.payments__item.create {
  display: flex;
  justify-content: center;
  background-color: #f6f7fb;
}

.payments__link {
  font-size: 14px;
}

.payments__item.create .payments__link {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 10px;
  align-items: center;
}

.payments__link::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.payments__number {
  font-weight: 600;
}

.payments__item.active .payments__number {
  color: #2b4c6a;
}

.payments__type {
  display: block;
  font-size: 12px;
}
</style>
