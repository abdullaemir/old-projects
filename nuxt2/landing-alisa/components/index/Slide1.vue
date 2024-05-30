<template>
  <section class="slide-promo slide">
    <div class="container">
      <h1 class="slide-promo__title">
        Персональный
        <span class="slide-promo__title--gold">ТОП-менеджер</span>
      </h1>
      <p class="slide-promo__description">
        Успешно внедряю теории международного менеджмента в практику реальных российских компаний
      </p>
      <BaseButton
        class="slide-promo__button"
        @click="$emit('openModal')"
      >
        Записаться на консультацию
      </BaseButton>
    </div>
  </section>
</template>

<script>
import BaseButton from "~/components/base/BaseButton.vue";

export default {
  name: "Slide1",
  components: {
    BaseButton,
  },
};
</script>

<style scoped>
.slide-promo {
  padding: 356px 0 19px;
  background-image:
    linear-gradient(175deg, rgb(25 24 24 / 0) 40%, rgb(26 23 23 / 0.7) 60%),
    url("~/assets/images/Slide1/background--tablet.jpg");
  background-size: cover;
  background-position:
    center,
    right -30px top;
  background-repeat: no-repeat;
}

@media (min-width: 575px) {
  .slide-promo {
    background-size: calc(100% + 30px) auto;
  }
}

@media (min-width: 768px) {
  .slide-promo {
    padding: 167px 0 178px;
    background-image: url("~/assets/images/Slide1/background--tablet.jpg");
    background-size: cover;
    background-position: right top;
  }
}

@media (min-width: 1024px) {
  .slide-promo {
    padding: 0;
    background-image: url("~assets/images/Slide1/background--desktop.jpg");
  }
}

.slide-promo__title {
  margin: 0 0 22px;
  font-size: 25px;
  font-weight: 500;
  line-height: 1;
}

@media (min-width: 768px) {
  .slide-promo__title {
    width: 100%;
    max-width: 440px;
    font-size: 30px;
  }
}

@media (min-width: 1280px) {
  .slide-promo__title {
    max-width: none;
  }
}

@media (min-width: 1920px) {
  .slide-promo__title {
    margin-bottom: 33px;
    font-size: 50px;
  }
}

.slide-promo__title--gold {
  display: block;
  margin-top: 8px;
  font-size: 40px;
  font-weight: 600;
  color: var(--text-color-secondary);
}

@media (min-width: 768px) {
  .slide-promo__title--gold {
    font-size: 70px;
    font-weight: 500;
    line-height: 0.85;
  }
}

@media (min-width: 1920px) {
  .slide-promo__title--gold {
    font-size: 115px;
    line-height: 1;
  }
}

.slide-promo__description {
  margin: 0 0 31px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.07em;
}

@media (min-width: 768px) {
  .slide-promo__description {
    width: 100%;
    max-width: 325px;
    margin-bottom: 32px;
    font-size: 20px;
  }
}

@media (min-width: 1920px) {
  .slide-promo__description {
    max-width: 727px;
    margin-bottom: 50px;
    font-size: 35px;
  }
}

@media (min-width: 768px) {
  .slide-promo__button {
    max-width: 276px;
  }
}

@media (min-width: 1920px) {
  .slide-promo__button {
    max-width: 450px;
  }
}
</style>
