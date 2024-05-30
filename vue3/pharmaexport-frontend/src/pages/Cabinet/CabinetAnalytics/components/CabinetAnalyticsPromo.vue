<template>
  <section class="promo__container">
    <div class="promo__banner">
      <div class="promo__wrapper">
        <h2 class="promo__subtitle">
          Analytical reports on the pharmaceutical market
        </h2>
        <p class="promo__text">
          Our team will prepare for you individual analytics depending on your needs. Order a free trial report and get
          a presentation with cases!
        </p>
        <BaseButton
          class="promo__button promo__link"
          :disabled="isLoading"
          :modifiers="['round', 'purple']"
          @click.prevent="$emit('sendMail')"
        >
          Yalla!
        </BaseButton>
      </div>

      <img
        alt="Diagram"
        aria-hidden="true"
        class="promo-banner__diagram"
        height="306"
        loading="lazy"
        src="../assets/images/diagram.svg"
        width="312"
      />
    </div>
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
.promo__container {
  margin: 0 -16px 32px;
  padding: 20px 16px 0;
  overflow: hidden;
}

@media (min-width: 768px) {
  .promo__container {
    margin: 0 -32px 60px;
    padding: 36px 32px 0;
  }
}

@media (min-width: 1170px) {
  .promo__container {
    margin: 0 -52px 60px;
    padding: 36px 52px 0;
  }
}

@media (min-width: 1300px) {
  .promo__container {
    margin-bottom: 146px;
    padding: 40px 32px 0;
  }
}

.promo__banner {
  position: relative;
  margin: 0 -16px;
  padding-top: 278px;
  background-image: linear-gradient(218.9deg, #0066ff -17.5%, #142269 74.8%);
}

@media (min-width: 768px) {
  .promo__banner {
    margin: 0 -32px;
    padding: 32px;
    background-image: url("../assets/images/promo-background-tablet.svg"),
      linear-gradient(218.9deg, #0066ff -17.5%, #142269 74.8%);
    background-position: right, center;
    background-repeat: no-repeat;
  }
}

@media (min-width: 1170px) {
  .promo__banner {
    margin: 0 -52px;
    padding: 52px;
  }
}

@media (min-width: 1300px) {
  .promo__banner {
    margin: 0;
    border-radius: 8px;
  }
}

.promo-banner__diagram {
  position: absolute;
  top: -20px;
  right: 50%;
  transform: translateX(50%);
}

@media (min-width: 768px) {
  .promo-banner__diagram {
    top: -29px;
    right: -27px;
    left: auto;
    width: auto;
    height: 370px;
    transform: none;
  }
}

@media (min-width: 1300px) {
  .promo-banner__diagram {
    top: -40px;
    right: 0;
    height: 380px;
  }
}

.promo__wrapper {
  padding: 20px 16px 32px;
  color: #ffffff;
}

@media (min-width: 768px) {
  .promo__wrapper {
    max-width: 390px;
    padding: 0;
  }
}

.promo__subtitle {
  margin-bottom: 8px;
  font-weight: 300;
  font-size: 24px;
  line-height: 1.88;
}

@media (min-width: 1300px) {
  .promo__subtitle {
    margin-bottom: 20px;
    font-size: 32px;
    line-height: 1.4;
  }
}

.promo__text {
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .promo__text {
    margin-bottom: 40px;
  }
}

@media (min-width: 450px) {
  .promo__button {
    width: auto;
  }
}
</style>
