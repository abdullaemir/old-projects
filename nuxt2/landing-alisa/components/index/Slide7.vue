<template>
  <div class="slide slide-consultation">
    <div class="container">
      <div class="slide-consultation__wrapper">
        <div>
          <h2 class="slide-consultation__title slide__title">
            Личная
            <span class="slide__title--gold">Консультация</span>
          </h2>
          <h3 class="slide-consultation__subtitle">
            Не знаете, какой формат Вам подойдет?
          </h3>
          <p class="slide-consultation__description">
            Можем провести личную консультацию (продолжительность до 90 минут),
            если Вы в Новосибирске или онлайн-встречу в Skype, Zoom.
          </p>
        </div>
        <ul class="slide-consultation__list">
          <li class="slide-consultation-card">
            <h4 class="slide-consultation-card__title">Стоимость очной консультации:</h4>
            <p class="slide-consultation-card__price">
              7 000
              <span class="slide-consultation-card__price--lower">руб.</span>
            </p>
          </li>
          <li class="slide-consultation-card">
            <h4 class="slide-consultation-card__title">Стоимость онлайн консультации:</h4>
            <p class="slide-consultation-card__price">
              5 000
              <span class="slide-consultation-card__price--lower">руб.</span>
            </p>
          </li>
        </ul>
      </div>
      <h4 class="slide-consultation__form-title">Остались вопросы?</h4>
      <p class="slide-consultation__form-description">Оставьте контакты и я свяжусь с Вами</p>
      <FormSend
        class="slide-consultation__form-send"
        buttonText="Свяжитесь со мной"
      />
      <TheFooter @openModal="$emit('openModal')" />
    </div>
  </div>
</template>

<script>
import TheFooter from "~/components/common/TheFooter/TheFooter.vue";

import FormSend from "~/components/FormSend.vue"

export default {
  name: "Slide7",
  components: {
    TheFooter,
    FormSend,
  },
}
</script>

<style scoped>
@media (min-width: 768px) {
  .slide-consultation {
    padding-top: 112px;
  }
}

@media (min-width: 1024px) {
  .slide-consultation {
    padding: 52px 0 30px;
  }
}

@media (min-width: 1280px) {
  .slide-consultation {
    padding-top: 0;
  }
}

@media (min-width: 1920px) {
  .slide-consultation {
    padding-bottom: 39px;
  }
}

.slide-consultation .container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.slide-consultation__wrapper {
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--border-color-primary);
}

@media (min-width: 768px) {
  .slide-consultation__wrapper {
    display: grid;
    grid-template-columns: 1fr 303px;
    grid-column-gap: 40px;
    padding-bottom: 25px;
  }
}

@media (min-width: 1024px) {
  .slide-consultation__wrapper {
    margin-top: auto;
  }
}

@media (min-width: 1280px) {
  .slide-consultation__wrapper {
    display: flex;
    align-items: flex-end;
    padding-bottom: 30px;
    grid-column-gap: 0;
  }
}

@media (min-width: 1920px) {
  .slide-consultation__wrapper {
    margin-bottom: 50px;
    padding-bottom: 66px;
  }
}

.slide-consultation__title {
  margin: 0 0 12px;
}

@media (min-width: 768px) {
  .slide-consultation__title {
    margin-top: -52px;
    padding-top: 0;
  }
}

@media (min-width: 1280px) {
  .slide-consultation__title {
    margin: 0 0 20px;
  }
}

@media (min-width: 1920px) {
  .slide-consultation__title {
    margin-bottom: 65px;
  }
}

.slide-consultation__subtitle {
  margin: 0 0 12px;
  font-weight: 300;
  font-size: 26px;
  letter-spacing: 0.04em;
}

@media (min-width: 1024px) {
  .slide-consultation__subtitle {
    margin-bottom: 12px;
  }
}

@media (min-width: 1280px) {
  .slide-consultation__subtitle {
    font-size: 30px;
  }
}

@media (min-width: 1920px) {
  .slide-consultation__subtitle {
    margin-bottom: 30px;
    font-size: 40px;
  }
}

.slide-consultation__description {
  margin: 0 0 17px;
  font-weight: 300;
  font-size: 18px;
  letter-spacing: 0.04em;
}

@media (min-width: 768px) {
  .slide-consultation__description {
    margin-bottom: 0;
  }
}

@media (min-width: 1920px) {
  .slide-consultation__description {
    font-size: 22px;
  }
}

.slide-consultation__list {
  margin: 0;
  padding-left: 0;
}

@media (min-width: 1280px) {
  .slide-consultation__list {
    display: grid;
    grid-template-columns: repeat(2, 210px);
    grid-column-gap: 10px;
    margin-left: 40px;
  }
}

@media (min-width: 1920px) {
  .slide-consultation__list {
    grid-template-columns: repeat(2, 355px);
    grid-column-gap: 20px;
  }
}

.slide-consultation-card {
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  background-color: var(--background-color-primary);
}

@media (min-width: 1280px) {
  .slide-consultation-card {
    padding: 30px 15px;
  }
}

@media (min-width: 1920px) {
  .slide-consultation-card {
    padding: 40px;
  }
}

.slide-consultation-card:not(:last-child) {
  margin-bottom: 13px;
}

@media (min-width: 1280px) {
  .slide-consultation-card:not(:last-child) {
    margin-bottom: 0;
  }
}

.slide-consultation-card__title {
  margin: 0 0 12px;
  font-weight: 300;
  font-size: 18px;
  text-align: center;
  letter-spacing: 0.04em;
}

@media (min-width: 1920px) {
  .slide-consultation-card__title {
    font-size: 28px;
  }
}

.slide-consultation-card__price {
  margin: 0;
  font-weight: 700;
  font-size: 30px;
  text-align: center;
  letter-spacing: 0.04em;
}

@media (min-width: 1920px) {
  .slide-consultation-card__price {
    font-size: 40px;
  }
}

.slide-consultation-card__price--lower {
  font-size: 18px;
  font-weight: 300;
}

@media (min-width: 1920px) {
  .slide-consultation-card__price--lower {
    font-size: 28px;
    font-weight: 300;
  }
}

.slide-consultation__form-title {
  margin: 0 0 15px;
  text-align: center;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .slide-consultation__form-title {
    text-align: left;
  }
}

@media (min-width: 1920px) {
  .slide-consultation__form-title {
    font-size: 24px;
  }
}

.slide-consultation__form-description {
  margin: 0 0 20px;
  text-align: center;
  letter-spacing: 0.04em;
}

@media (min-width: 768px) {
  .slide-consultation__form-description {
    text-align: left;
  }
}

@media (min-width: 1920px) {
  .slide-consultation__form-description {
    margin-bottom: 40px;
    font-size: 24px;
  }
}

.slide-consultation__form-send {
  display: grid;
  grid-row-gap: 10px;
  margin-bottom: 53px;
}

@media (min-width: 768px) {
  .slide-consultation__form-send {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 21px;
    margin-bottom: 108px;
  }
}

@media (min-width: 1024px) {
  .slide-consultation__form-send {
    grid-column-gap: 18px;
    margin-bottom: 0;
  }
}

@media (min-width: 1280px) {
  .slide-consultation__form-send {
    grid-column-gap: 24px;
  }
}

@media (min-width: 1920px) {
  .slide-consultation__form-send {
    grid-column-gap: 40px;
  }
}
</style>
