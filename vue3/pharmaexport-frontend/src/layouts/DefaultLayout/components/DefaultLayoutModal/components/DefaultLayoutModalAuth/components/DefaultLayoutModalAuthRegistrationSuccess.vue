<template>
  <BaseModal
    id="registration-success"
    @close-modal="goToCabinet"
  >
    <div class="registration__wrapper">
      <img
        alt="Success Icon"
        aria-hidden="true"
        class="registration__icon"
        height="162"
        src="/src/assets/icons/confirm-email.svg"
        width="202"
      />

      <p class="registration__text">
        To complete the registration, please confirm your email
      </p>

      <BaseButton
        :modifiers="['large', 'round', 'purple']"
        @click="goToCabinet"
      >
        To cabinet
      </BaseButton>
    </div>
  </BaseModal>
</template>

<script setup>
import { useRouter } from "vue-router";

import BaseButton from "~/components/base/BaseButton.vue";
import BaseModal, { useModal } from "~/components/base/BaseModal.vue";

const router = useRouter();

const goToCabinet = () => {
  useModal.closeModal();

  router.push({
    name: "cabinetProfile",
  });
};
</script>

<style scoped>
.registration__wrapper {
  max-width: 368px;
  margin: 0 auto;
}

.registration__icon {
  display: block;
  margin: 0 auto 16px;
}

.registration__text {
  margin-bottom: 32px;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
}
</style>
