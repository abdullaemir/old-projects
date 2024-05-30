<template>
  <section class="promo analytics__section container--wide">
    <h1 class="promo__title">Analytical Pharmaceutical Market Reports</h1>

    <ul class="promo__list">
      <li class="promo__item">Personalized solutions with a unique 360&nbsp;&deg; approach.</li>
      <li class="promo__item">Customized research to expand pharma business and find export opportunities.</li>
    </ul>

    <div class="promo__wrapper">
      <span class="promo__note">Submit a request, and get a report sample</span>

      <BaseButton
        class="promo__button"
        :modifiers="['medium', 'round', 'purple']"
        @click="useModal.openModal('analytics-request')"
      >
        Yalla
      </BaseButton>
    </div>
  </section>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";
import { useModal } from "~/components/base/BaseModal.vue";
</script>

<style scoped>
.promo {
  margin-bottom: 32px;
  padding-top: 96px;
  padding-bottom: 32px;
  background-image: linear-gradient(211deg, #0066ff -13%, #152785 73%);
  color: #ffffff;
}

@media (min-width: 768px) {
  .promo {
    margin-bottom: 60px;
    padding-top: 112px;
    padding-bottom: 40px;
  }
}

@media (min-width: 1170px) {
  .promo {
    margin-bottom: 80px;
    padding-top: 178px;
    padding-bottom: 80px;
    background-image:
      url("../assets/images/promo-background.png"),
      url("../assets/images/diagram.svg"),
      linear-gradient(211deg, #0066ff -13%, #152785 73%);
    background-size:
      520px auto,
      575px auto,
      cover;
    background-position:
      left calc(50vw + 390px) top -90px,
      left 50vw top 140px,
      center;
    background-repeat: no-repeat;
  }
}

.promo__title {
  display: flex;
  width: 100%;
  max-width: 288px;
  margin-bottom: 20px;
  font-weight: 800;
  font-size: 24px;
}

@media (min-width: 768px) {
  .promo__title {
    max-width: 610px;
    margin-bottom: 32px;
    font-size: 42px;
  }
}

.promo__title::before {
  content: "";
  flex: none;
  width: 40px;
  height: 2px;
  background-color: #ffffff;
  margin: 20px 20px 0 0;
}

@media (min-width: 768px) {
  .promo__title::before {
    margin: 32px 40px 0 0;
  }
}

.promo__list {
  display: grid;
  grid-row-gap: 20px;
  margin: 0 0 32px;
  padding-left: 0;
}

@media (min-width: 768px) {
  .promo__list {
    max-width: 472px;
    margin-bottom: 40px;
  }
}

.promo__item {
  display: flex;
  align-items: flex-start;
  font-weight: 600;
  font-size: 16px;
}

.promo__item::before {
  content: "";
  flex: none;
  width: 7px;
  height: 7px;
  margin: 7px 19px 0 7px;
  border-radius: 50%;
  background-color: #ffffff;
}

@media (min-width: 450px) {
  .promo__wrapper {
    margin-left: 70px;
  }
}

.promo__note {
  display: block;
  margin-bottom: 20px;
  text-align: center;
}

@media (min-width: 450px) {
  .promo__note {
    margin-bottom: 28px;
    font-size: 16px;
    text-align: left;
  }
}

@media (min-width: 450px) {
  .promo__button {
    width: auto;
  }
}
</style>
