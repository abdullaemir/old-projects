<template>
  <section class="promo__container">
    <CabinetTitle class="promo__title">
      FirstData
    </CabinetTitle>

    <p class="promo__description">
      Personalized solutions for analytic and brand promotion of final behavior and healthcare status of consumers
    </p>

    <div class="promo__banner">
      <div class="promo__wrapper">
        <h2 class="promo__subtitle">
          Become a partner and get personal benefits
        </h2>
        <p class="promo__text">
          We invite pharmacies and hospitals to become our partners for integration and development of one of the
          largest Big Data in the healthcare industry.
        </p>
        <!-- TODO: Убрать кнопку -->
        <BaseButton
          class="promo__button promo__link"
          :disabled="isLoading"
          :modifiers="['round', 'purple']"
          @click.prevent="$emit('sendMail')"
        >
          Yalla!
        </BaseButton>
      </div>

      <picture>
        <source
          srcset="../assets/images/promo-person.avif"
          type="image/avif"
        />
        <source
          srcset="../assets/images/promo-person.webp"
          type="image/webp"
        />
        <img
          alt=""
          aria-hidden="true"
          class="promo-banner__person"
          height="339"
          loading="lazy"
          src="../assets/images/promo-person.png"
          width="288"
        />
      </picture>
    </div>
  </section>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";

import CabinetTitle from "../../components/CabinetTitle.vue";

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
.promo__container {
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .promo__container {
    margin: 0 -32px 60px;
    padding: 0 32px;
    overflow: hidden;
  }
}

@media (min-width: 1170px) {
  .promo__container {
    margin-bottom: 80px;
  }
}

.promo__title {
  color: var(--pink);
}

.promo__description {
  margin-bottom: 65px;
}

@media (min-width: 768px) {
  .promo__description {
    max-width: 404px;
    margin-bottom: 36px;
  }
}

@media (min-width: 1300px) {
  .promo__description {
    max-width: 602px;
  }
}

.promo__banner {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  margin: 0 -16px;
  padding-top: 299px;
  background-image: linear-gradient(14.09deg, #001861 8.25%, rgb(185 20 132 / 0) 81.94%, rgb(255 0 99 / 0) 119.94%),
    linear-gradient(14.09deg, #001861 8.25%, rgb(185 20 132 / 0) 81.94%, rgb(255 0 99 / 0) 119.94%),
    url("../assets/images/promo-background-mobile.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

@media (min-width: 768px) {
  .promo__banner {
    flex-direction: row;
    margin: 0 -32px;
    padding: 32px;
    background-image: url("../assets/images/promo-background-tablet.jpg");
  }
}

@media (min-width: 1170px) {
  .promo__banner {
    margin: 0;
    border-radius: 8px;
  }
}

@media (min-width: 1300px) {
  .promo__banner {
    background-size: 102% 100%;
  }
}

.promo-banner__person {
  position: absolute;
  top: -40px;
  left: 50%;
  width: 288px;
  height: 339px;
  transform: translateX(-50%);
}

@media (min-width: 768px) {
  .promo-banner__person {
    bottom: 0;
    top: auto;
    right: -30px;
    left: auto;
    width: auto;
    height: 433px;
    transform: none;
  }
}

@media (min-width: 1300px) {
  .promo-banner__person {
    right: 10px;
    height: 462px;
  }
}

.promo__wrapper {
  padding: 20px 16px 32px;
  color: var(--white);
  background-image: linear-gradient(26.44deg, #001861 31.51%, #b91484 122.11%, #ff0063 122.35%);
}

@media (min-width: 768px) {
  .promo__wrapper {
    max-width: 390px;
    padding: 0;
    background-image: none;
  }
}

.promo__subtitle {
  margin-bottom: 8px;
  font-weight: 300;
  font-size: 24px;
  line-height: 1.88;
}

@media (min-width: 768px) {
  .promo__subtitle {
    margin-bottom: 20px;
    font-size: 32px;
    line-height: 1.4;
  }
}

.promo__text {
  margin-bottom: 32px;
}

@media (min-width: 450px) {
  .promo__button {
    width: auto;
  }
}
</style>
