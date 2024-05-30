<template>
  <section class="order__container">
    <p class="order__text">
      Order a free trial analytical report and get a presentation with cases!
    </p>
    <BaseButton
      class="order__button promo__link"
      :disabled="isLoading"
      :modifiers="['round', 'purple']"
      @click.prevent="$emit('sendMail')"
    >
      Yalla!
    </BaseButton>
  </section>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";

defineProps({
  isLoading: {
    required: true,
    type: Boolean,
  },
});

defineEmits({
  sendMail: () => true,
});
</script>

<style scoped>
.order__container {
  margin: 0 -16px;
  padding: 32px 16px;
  background-image: url("../assets/images/order-background-left.png"),
    url("../assets/images/order-background-right.svg"), linear-gradient(203.83deg, #0066ff -16.46%, #142269 86.09%);
  background-position: left center, right top, center;
  background-repeat: no-repeat;
}

@media (min-width: 768px) {
  .order__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    border-radius: 8px;
    background-size: auto, 250px auto, auto;
  }
}

.order__text {
  margin-bottom: 32px;
  font-weight: 300;
  font-size: 24px;
  line-height: 1.87;
  color: var(--white);
}

@media (min-width: 768px) {
  .order__text {
    max-width: 508px;
    margin: 0;
  }
}

@media (min-width: 450px) {
  .order__button {
    width: auto;
  }
}
</style>
