<template>
  <div class="request">
    <div class="request__block">
      <h2 class="request__block-title">
        Become a data partner
      </h2>

      <p>Get personal benefits from cooperating with us</p>
    </div>
    <BaseButton
      class="request__block-button"
      :disabled="isLoading"
      :modifiers="['round', 'blue']"
      @click.prevent="$emit('sendMail')"
    >
      Yalla!
    </BaseButton>
  </div>

  <TheModalRequestSendSuccess />
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";
import TheModalRequestSendSuccess from "~/components/common/TheModalRequestSendSuccess.vue";

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
.request {
  display: grid;
  grid-row-gap: 24px;
  margin: 0 -16px;
  padding: 32px 16px;
  border-top: 1px solid var(--border-color-primary);
  border-bottom: 1px solid var(--border-color-primary);
  background-color: #ffffff;
  box-shadow: 0 1px 16px rgb(0 42 81 / 0.06);
}

@media (min-width: 768px) {
  .request {
    display: flex;
    margin: 0;
    padding: 32px;
    border: 1px solid var(--border-color-primary);
    border-radius: 8px;
  }
}

.request__block-button {
  width: auto;
  margin-right: auto;
}

@media (min-width: 768px) {
  .request__block-button {
    margin-right: 0;
    margin-left: auto;
  }
}

.request__block-title {
  margin-bottom: 4px;
  font-weight: 300;
  font-size: 20px;
}

@media (min-width: 768px) {
  .request__block-title {
    font-size: 24px;
  }
}
</style>
