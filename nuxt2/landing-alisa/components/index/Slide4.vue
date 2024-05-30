<template>
  <section class="slide-experience slide">
    <div class="container">
      <h2 class="slide-experience__title slide__title">
        Опыт
        <span class="slide__title--gold">Работы</span>
      </h2>
      <div class="slide-experience__wrapper">
        <div class="slide-experience__wrapper--left">
          <p class="slide-experience__description">
            Более
            <span class="slide-experience__description--gold">10 лет</span>
            работы в коммерции и финансах
          </p>
          <ul class="slide-experience-list">
            <li
              class="slide-experience-list__item"
              v-for="(listItem, index) in list"
              :key="index"
            >
              {{ listItem }}
            </li>
          </ul>
        </div>
        <div class="slide-experience-card">
          <h3 class="slide-experience-card__title">
            <span class="slide-experience-card__title--gold">Pharma.Global.</span>
            ФармЗнание, ФармМаркет
            <span class="slide-experience-card__title--lower">Должность “Коммерческий директор”</span>
          </h3>
          <p class="slide-experience-card__description">
            Стартап, добившийся лидерства в России
            (IT компания в отрасли фарма) вышедший на международный рынок, “Pharma.Global”
          </p>
          <h4 class="slide-experience-card__subtitle">Достижения моей команды:</h4>
          <ul class="slide-experience-card__list">
            <li
              class="slide-experience-card__list-item"
              v-for="(cardListItem, index) in cardList"
              :key="index"
            >
              {{ cardListItem }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Slide4",
  data() {
    return {
      list: [
        "Авиационный завод “Авиаагрегат” г. Самара",
        "“Актив Капитал Банк”",
        "“Росэл”",
        "“УралСибГидрострой”",
        "И многие другие компании",
      ],
      cardList: [
        "Фактический рост V выручки за 2020 год в 3 раза по сравнению с планом на 2020 г.",
        "Абсолютное лидерство компании на рынке  (более 30% от общего V клиентов)",
        "Личное участие в старте работы компании в регионе MENA с 2019 года.",
      ],
    }
  },
}
</script>

<style scoped>
.slide-experience__title {
  margin-bottom: 15px;
}

@media (min-width: 768px) {
  .slide-experience__title {
    margin-bottom: 23px;
  }
}

@media (min-width: 1280px) {
  .slide-experience__title {
    margin-bottom: 30px;
  }
}

@media (min-width: 768px) {
  .slide-experience__wrapper {
    display: flex;
    align-items: flex-start;
  }
}

@media (min-width: 768px) {
  .slide-experience__wrapper--left {
    padding-top: 23px;
  }
}

@media (min-width: 1280px) {
  .slide-experience__wrapper--left {
    padding-top: 29px;
  }
}

@media (min-width: 1920px) {
  .slide-experience__wrapper--left {
    padding-top: 45px;
  }
}

.slide-experience__description {
  margin: 0 0 15px;
  font-weight: 300;
  font-size: 20px;
  letter-spacing: 0.04em;
}

@media (min-width: 768px) {
  .slide-experience__description {
    margin-bottom: 19px;
  }
}

@media (min-width: 1280px) {
  .slide-experience__description {
    margin-bottom: 30px;
    font-size: 22px;
  }
}

@media (min-width: 1920px) {
  .slide-experience__description {
    margin-bottom: 38px;
    font-size: 32px;
  }
}

.slide-experience__description--gold {
  color: var(--text-color-secondary);
}

.slide-experience-list {
  margin: 0 0 34px;
  padding-left: 0;
}

@media (min-width: 768px) {
  .slide-experience-list {
    margin-bottom: 0;
  }
}

.slide-experience-list__item {
  display: flex;
  align-items: center;
  font-weight: 300;
  letter-spacing: 0.04em;
}

@media (min-width: 1920px) {
  .slide-experience-list__item {
    font-size: 20px;
  }
}

.slide-experience-list__item:not(:last-child) {
  margin-bottom: 20px;
}

.slide-experience-list__item::before {
  content: "";
  width: 24px;
  height: 24px;
  margin-right: 10px;
  background-image: url("~/assets/icons/flag--white.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media (min-width: 1920px) {
  .slide-experience-list__item::before {
    margin-right: 20px;
  }
}

.slide-experience-card {
  padding: 35px 15px 20px;
  border-radius: 5px;
  background-color: var(--background-color-secondary);
}

@media (min-width: 768px) {
  .slide-experience-card {
    width: 100%;
    max-width: 459px;
    margin-left: 28px;
    padding: 27px 30px 20px;
  }
}

@media (min-width: 1024px) {
  .slide-experience-card {
    max-width: 440px;
    margin-left: 18px;
  }
}

@media (min-width: 1280px) {
  .slide-experience-card {
    max-width: 580px;
    margin-left: 25px;
    padding: 57px 30px 47px;
  }
}

@media (min-width: 1920px) {
  .slide-experience-card {
    max-width: 980px;
    margin-left: 130px;
    padding: 65px 45px 49px;
  }
}

.slide-experience-card__title {
  display: flex;
  flex-direction: column;
  margin: 0 0 19px;
  font-size: 20px;
  font-weight: 300;
  line-height: 1;
  letter-spacing: 0.04em;
}

@media (min-width: 768px) {
  .slide-experience-card__title {
    margin-bottom: 28px;
  }
}

@media (min-width: 1280px) {
  .slide-experience-card__title {
    margin-bottom: 21px;
  }
}

@media (min-width: 1920px) {
  .slide-experience-card__title {
    margin-bottom: 49px;
    font-size: 30px;
  }
}

.slide-experience-card__title--gold {
  margin-bottom: 17px;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  color: var(--text-color-secondary);
}

@media (min-width: 768px) {
  .slide-experience-card__title--gold {
    margin-bottom: 12px;
    text-align: left;
  }
}

@media (min-width: 1920px) {
  .slide-experience-card__title--gold {
    font-size: 32px;
  }
}

.slide-experience-card__title--lower {
  margin-top: 8px;
  font-weight: 400;
}

@media (min-width: 1920px) {
  .slide-experience-card__title--lower {
    font-size: 20px;
  }
}

.slide-experience-card__description {
  margin: 0 0 16px;
  font-weight: 300;
  letter-spacing: 0.04em;
}

@media (min-width: 768px) {
  .slide-experience-card__description {
    margin-bottom: 10px;
  }
}

@media (min-width: 1024px) {
  .slide-experience-card__description {
    margin-bottom: 12px;
  }
}

@media (min-width: 1920px) {
  .slide-experience-card__description {
    margin-bottom: 41px;
    font-size: 24px;
  }
}

.slide-experience-card__subtitle {
  margin: 0 0 8px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

@media (min-width: 768px) {
  .slide-experience-card__subtitle {
    margin-bottom: 10px;
  }
}

@media (min-width: 1280px) {
  .slide-experience-card__subtitle {
    margin-bottom: 6px;
  }
}

@media (min-width: 1920px) {
  .slide-experience-card__subtitle {
    margin-bottom: 17px;
    font-size: 24px;
  }
}

.slide-experience-card__list {
  margin: 0;
  padding-left: 15px;
  list-style-type: disc;
}

@media (min-width: 768px) {
  .slide-experience-card__list {
    padding-left: 20px;
  }
}

@media (min-width: 1280px) {
  .slide-experience-card__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 38px;
  }
}

@media (min-width: 1920px) {
  .slide-experience-card__list {
    grid-column-gap: 53px;
  }
}

.slide-experience-card__list-item {
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.04em;
}

@media (min-width: 1920px) {
  .slide-experience-card__list-item {
    font-size: 18px;
  }
}

.slide-experience-card__list-item:not(:last-child) {
  margin-bottom: 15px;
}

@media (min-width: 1280px) {
  .slide-experience-card__list-item:not(:last-child) {
    margin-bottom: 0;
  }
}

.slide-experience-card__list-item::marker {
  font-size: 60%;
}
</style>
