<template>
  <BaseModal
    id="request-send-success"
    class="success"
  >
    <img
      alt=""
      class="success__icon"
      height="157"
      src="/src/assets/icons/success.svg"
      width="185"
    />

    <p class="success__title">
      Thanks for your request!
    </p>

    <p>Our manager will reach out to you very soon</p>
  </BaseModal>
</template>

<script setup>
import BaseModal from "~/components/base/BaseModal.vue";
</script>

<style scoped>
:global(.success.modal) {
  text-align: center;
}

.success__icon {
  margin-bottom: 20px;
}

.success__title {
  margin-bottom: 16px;
  font-weight: 600;
}
</style>
