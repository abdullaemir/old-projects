<template>
  <BaseModal
    id="analytics-confirm"
    class="analytics-confirm"
  >
    <img
      class="analytics-confirm__image"
      width="320"
      height="171"
      src="../assets/images/email.svg"
      alt=""
    />

    <p class="analytics-confirm__description">To complete the registration, please confirm your email</p>

    <BaseButton
      :modifiers="['large', 'round', 'purple']"
      @click="useModal.closeModal()"
    >
      Yalla
    </BaseButton>
  </BaseModal>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";
import BaseModal, { useModal } from "~/components/base/BaseModal.vue";
</script>

<style scoped>
@media (min-width: 768px) {
  :global(.analytics-confirm.modal) {
    padding: 40px 84px;
  }
}

.analytics-confirm__image {
  display: block;
  margin: 142px auto 0;
}

@media (min-width: 768px) {
  .analytics-confirm__image {
    width: 100%;
    margin: 0;
  }
}

.analytics-confirm__description {
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
}
</style>
