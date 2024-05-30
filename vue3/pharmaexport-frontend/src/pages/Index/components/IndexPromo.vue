<template>
  <section class="container--wide promo">
    <div class="promo__container">
      <span class="promo__decoration" />
      <h1 class="promo__title">
        We connect <br />
        Buyers & Sellers
      </h1>

      <p class="promo__description">
        YallaRx is an international B2B platform, connecting Buyers and Suppliers in healthcare
      </p>

      <BaseButton
        class="promo__button"
        :modifiers="['large', 'round', 'purple']"
        @click="useModal.openModal('enquiry', $event)"
      >
        Submit trade enquiry
      </BaseButton>
    </div>

    <div class="promo__image" />
  </section>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";
import { useModal } from "~/components/base/BaseModal.vue";
</script>

<style scoped>
.promo {
  padding-top: 32px;
  padding-bottom: 68px;
}

@media (min-width: 768px) {
  .promo {
    padding-top: 40px;
    padding-bottom: 40px;
  }
}

@media (min-width: 1170px) {
  .promo {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 520px;
    margin-bottom: 100px;
    padding-top: 0;
    padding-bottom: 0;
  }
}

.promo__container {
  max-width: 375px;
  width: 100%;
}

.promo__decoration {
  display: grid;
  grid-template-rows: 4px;
  grid-template-columns: 20px 48px;
  margin-bottom: 28px;
  grid-column-gap: 8px;
}

.promo__decoration::before,
.promo__decoration::after {
  content: "";
  border-radius: 4px;
  background-color: #e80061;
}

.promo__title {
  margin-bottom: 16px;
  font-weight: 800;
  font-size: 24px;
}

@media (min-width: 768px) {
  .promo__title {
    font-size: 36px;
  }
}

@media (min-width: 1170px) {
  .promo__title {
    margin-bottom: 24px;
    font-size: 42px;
  }
}

.promo__description {
  margin-bottom: 28px;
}

@media (min-width: 768px) {
  .promo__description {
    max-width: 462px;
    width: 100%;
    margin-bottom: 83px;
  }
}

@media (min-width: 1170px) {
  .promo__description {
    max-width: 375px;
    margin-bottom: 0;
  }
}

.promo__button {
  max-width: 288px;
  width: 100%;
}

@media (min-width: 768px) {
  .promo__button {
    display: none;
  }
}

.promo__image {
  display: none;
}

@media (min-width: 768px) {
  .promo__image {
    display: block;
    height: 498px;
    margin: 0 -32px;
    background-color: #152785;
    background-image: url("../assets/images/promo-background-image.png");
    background-position: right -150px top;
    background-size: auto 100%;
    background-repeat: no-repeat;
  }
}

@media (min-width: 1170px) {
  .promo__image {
    position: absolute;
    top: 0;
    left: 44%;
    width: 56%;
    height: 100%;
    margin: 0;
    border-bottom-left-radius: 8px;
    background-position: left 200px top;
  }
}
</style>
