<template>
  <section class="container--wide analytics__section offer">
    <h2 class="offer__title">
      We not only conduct pharmaceutical market research and carry on pharmaceutical industry analysis, but also help in
      launching your business at new markets
    </h2>

    <p class="offer__description">
      We offer customized solutions for your business development tasks. Please, feel free to contact us if you need any
      further information.
    </p>

    <BaseButton
      class="offer__button"
      :modifiers="['round', 'purple']"
      @click="useModal.openModal('analytics-request')"
    >
      Yalla!
    </BaseButton>
  </section>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";
import { useModal } from "~/components/base/BaseModal.vue";
</script>

<style scoped>
.offer {
  padding-top: 40px;
  padding-bottom: 32px;
  color: var(--white);
  background-image: linear-gradient(256.39deg, #0066ff -24.15%, #152785 91.97%);
  background-position: center;
  background-repeat: no-repeat;
}

@media (min-width: 768px) {
  .offer {
    padding-top: 60px;
    padding-bottom: 40px;
    background-image: url("../assets/images/bg-offer-tablet.svg"),
      linear-gradient(256.39deg, #0066ff -24.15%, #152785 91.97%);
    background-position: right top, center;
    background-repeat: no-repeat;
  }
}

@media (min-width: 1170px) {
  .offer {
    padding-top: 60px;
    padding-bottom: 60px;
  }
}

.offer__title {
  position: relative;
  max-width: 700px;
  margin-bottom: 20px;
  padding-left: 60px;
  font-weight: 800;
  font-size: 20px;
}

@media (min-width: 768px) {
  .offer__title {
    font-size: 28px;
    line-height: 1.42;
  }
}

.offer__title::before {
  content: "";
  position: absolute;
  top: 14px;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: var(--white);
}

@media (min-width: 768px) {
  .offer__title::before {
    top: 22px;
  }
}

.offer__description {
  margin-bottom: 32px;
  font-weight: 600;
  font-size: 16px;
}

@media (min-width: 768px) {
  .offer__description {
    max-width: 700px;
    margin-bottom: 40px;
    padding-left: 60px;
  }
}

@media (min-width: 450px) {
  .offer__button {
    width: auto;
  }
}

@media (min-width: 768px) {
  .offer__button {
    margin-left: 60px;
  }
}
</style>
