<template>
  <BaseModal
    id="analytics-success"
    class="analytics-success"
  >
    <img
      class="analytics-success__image"
      width="320"
      height="171"
      src="../assets/images/success.svg"
      alt=""
    />

    <span class="analytics-success__title">
      Thanks for your request!
    </span>
    <p class="analytics-success__description">
      Our manager will reach out to you very soon
    </p>
  </BaseModal>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";
import BaseModal, { useModal } from "~/components/base/BaseModal.vue";
</script>

<style scoped>
:global(.analytics-success.modal) {
  text-align: center;
}

@media (min-width: 768px) {
  :global(.analytics-success.modal) {
    padding: 20px 40px 40px;
  }
}

.analytics-success__image {
  display: block;
  margin: 125px auto 0;
}

@media (min-width: 768px) {
  .analytics-success__image {
    width: 100%;
    margin: 0;
  }
}

.analytics-success__title {
  display: block;
  margin-bottom: 16px;
  font-weight: 600;
}
</style>
