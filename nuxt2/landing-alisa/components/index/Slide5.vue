<template>
  <div class="slide-cases slide">
    <div class="container">
      <div class="slide-cases__wrapper">
        <h2 class="slide-cases__title slide__title">
          Успешные
          <span class="slide__title--gold">Кейсы</span>
        </h2>
        <div>
          <h3 class="slide-cases__subtitle">{{ slides[activeSlide].title }}</h3>
          <p class="slide-cases__description">{{ slides[activeSlide].description }}</p>
        </div>
      </div>
      <swiper
        class="slide-cases-slider swiper"
        :options="sliderOptions"
        @slideChange="changeSlide"
        ref="swiper"
      >
        <swiper-slide
          class="slide-cases-slider__item"
          v-for="(slide, index) in slides"
          :key="index"
        >
          <ul class="slide-cases-slider__tabs">
            <li
              :class="['slide-cases-slider__tabs-item', { 'active': slideTab.isActive }]"
              v-for="(slideTab, index) in slide.tabs"
              :key="index"
              @click="switchTab(slide, slideTab)"
            >
              <img
                class="slide-cases-slider__icon"
                :src="require(`~/assets/icons/${slideTab.icon}--gold.svg`)"
                alt=""
                v-if="slideTab.icon"
              >
              {{ slideTab.name }}
            </li>
          </ul>
          <div class="slide-cases-slider__wrapper">
            <ul
              :class="['slide-cases-slider__list', { 'active': slideTab.isActive }]"
              v-for="(slideTab, index) in slide.tabs"
              :key="index"
            >
              <li
                class="slide-cases-slider__list-item"
                v-for="(slideTabListItem, index) in slideTab.list"
                :key="index"
              >
                {{ slideTabListItem }}
              </li>
            </ul>
          </div>
        </swiper-slide>
        <button
          class="slide-cases-slider__button-previous"
          type="button"
          slot="button-prev"
        ></button>
        <div
          class="slide-cases-slider__pagination"
          slot="pagination"
        ></div>
        <div
          class="slide-cases-slider__button-next-wrapper"
          slot="button-next"
        >
          <button
            class="slide-cases-slider__button-next"
            type="button"
          ></button>
          <h4 class="slide-cases-slider__title desktop">Ваш бизнес будет прибыльным</h4>
          <BaseButton
            class="slide-cases-slider__button desktop"
            @click="$emit('openModal')"
          >
            Записаться на консультацию
          </BaseButton>
        </div>
      </swiper>
      <h4 class="slide-cases-slider__title mobile">Ваш бизнес будет прибыльным</h4>
      <BaseButton
        class="slide-cases-slider__button mobile"
        @click="$emit('openModal')"
      >
        Записаться на консультацию
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

import BaseButton from "~/components/base/BaseButton.vue";

export default {
  name: "Slide5",
  components: {
    BaseButton,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      slides: [
        {
          title: "“СИБ СВАИ”, г.Новосибирск",
          description: "Малый бизнес, собственное производство и продажи. Отрасль “Строительство”. Численность компании до 100 человек.",
          tabs: [
            {
              isActive: true,
              name: "Задачи клиента",
              icon: "bookmark",
              list: [
                "Настроить автоматизированную систему управленческого учета с нуля, инструмент для выстраивания УУ - гугл документы.",
                "Наладить процесс производственного учета в компании (работа в программе Мой склад).",
                "Оптимизировать систему мотивации Отдела продаж, автоматизировать расчет KPI, надбавок, наладить прямую зависимость работы от объема выручки. Задачи выполнены в полном объеме за 1,5 месяца.",
              ],
            },
            {
              isActive: false,
              name: "План работ на квартал",
              icon: "cup",
              list: [
                "Сборка, а затем анализ показателей финансовой отчетности собственникам компании",
                "Составлен чек-лист прибыли компании, выданы четкие инструменты повышения прибыль,",
                "Выданы рекомендации по оптимизации затрат на основании проведенного анализа",
              ],
            },
          ],
        },
        {
          title: "“Пластик Проф” г. Владивосток",
          description: "Собственное производство и продажи. Численность компании ДО 50 человек. Первоначальные задачи от собственника компании: провести аудит действующей системы управленческого учета в программе 1С: Управление малым предприятием",
          tabs: [
            {
              name: "Выполненные задачи",
              isActive: true,
              icon: "bookmark",
              list: [
                "Выданы рекомендации по выявленным узким местам",
                "Оптимизирован управленческий учет, а также учет операций (отдел закупок, отдел продаж)",
                "Сформирована реальная управленческая отчетность компании (Cash-Flow, P&L, управленческий Баланс за период)",
                "Выданы рекомендации по дальнейшему ведению учета в компании.",
              ],
            },
            {
              isActive: false,
              name: "",
              list: [
                "Скорректирована система расчета себестоимости (переменных затрат) для определения рентабельности бизнеса.",
                "Проведена полная инвентаризация имущества компании (склад, офис), составлен вступительный управленческий баланс",
                "Проведен анализ ключевых показателей показателей по методам вертикального, горизонтального, факторного анализов.",
              ],
            },
          ],
        },
      ],
      activeSlide: 0,
      sliderOptions: {
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 1000,
        pagination: {
          el: ".slide-cases-slider__pagination",
          type: "fraction",
        },
        navigation: {
          prevEl: ".slide-cases-slider__button-previous",
          nextEl: ".slide-cases-slider__button-next",
        },
      },
    }
  },
  methods: {
    switchTab(slide, slideActiveTab) {
      slide.tabs.forEach(slideTab => slideTab.isActive = false);
      slideActiveTab.isActive = true;
    },
    changeSlide() {
      this.activeSlide = this.$refs.swiper.$swiper.activeIndex;
    },
  },
}
</script>

<style scoped>
@media (min-width: 768px) {
  .slide-cases {
    padding-top: 60px;
  }
}

@media (min-width: 1024px) {
  .slide-cases {
    padding-top: 0;
  }
}

@media (min-width: 768px) {
  .slide-cases__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;
  }
}

@media (min-width: 1920px) {
  .slide-cases__wrapper {
    margin-bottom: 31px;
  }
}

.slide-cases__title {
  margin: 0 0 30px;
}

@media (min-width: 768px) {
  .slide-cases__title {
    margin-bottom: 0;
    padding-top: 0;
  }
}

.slide-cases__subtitle {
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 300;
  color: var(--text-color-secondary);
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .slide-cases__subtitle {
    margin-bottom: 7px;
    text-align: right;
  }
}

@media (min-width: 1920px) {
  .slide-cases__subtitle {
    font-size: 30px;
  }
}

.slide-cases__description {
  margin: 0 0 16px;
  font-weight: 300;
  letter-spacing: 0.04em;
}

@media (min-width: 768px) {
  .slide-cases__description {
    width: 100%;
    max-width: 459px;
    margin-bottom: 0;
    text-align: right;
  }
}

@media (min-width: 1024px) {
  .slide-cases__description {
    max-width: 440px;
  }
}

@media (min-width: 1280px) {
  .slide-cases__description {
    max-width: 578px;
  }
}

@media (min-width: 1920px) {
  .slide-cases__description {
    max-width: 980px;
    font-size: 18px;
  }
}

.slide-cases-slider {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

@media (min-width: 768px) {
  .slide-cases-slider {
    justify-content: flex-start;
    margin-bottom: 0;
  }
}

.slide-cases-slider__item {
  padding: 20px 37px 27px;
  border-radius: 5px;
  background-color: var(--background-color-primary);
  box-shadow: 0 4px 34px rgba(0, 0, 0, 0.35);
}

@media (min-width: 768px) {
  .slide-cases-slider__item {
    padding: 20px 44px;
  }
}

@media (min-width: 1280px) {
  .slide-cases-slider__item {
    padding: 20px 37px 25px 64px;
  }
}

@media (min-width: 1920px) {
  .slide-cases-slider__item {
    padding: 43px 94px 50px;
  }
}

.slide-cases-slider__tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 28px;
  padding-left: 0;
}

@media (min-width: 768px) {
  .slide-cases-slider__tabs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 70px;
    margin-bottom: 8px;
  }
}

@media (min-width: 1024px) {
  .slide-cases-slider__tabs {
    grid-column-gap: 53px;
  }
}

@media (min-width: 1280px) {
  .slide-cases-slider__tabs {
    grid-column-gap: 62px;
  }
}

@media (min-width: 1920px) {
  .slide-cases-slider__tabs {
    grid-column-gap: 93px;
    margin-bottom: 27px;
  }
}

.slide-cases-slider__tabs-item {
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  color: var(--text-color-secondary);
  cursor: pointer;
  transition-property: font-size, color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .slide-cases-slider__tabs-item {
    position: relative;
    text-align: left;
    pointer-events: none;
  }
}

@media (min-width: 1920px) {
  .slide-cases-slider__tabs-item {
    font-size: 28px;
  }
}

@media (max-width: 767px) {
  .slide-cases-slider__tabs-item:not(:first-child) {
    margin-left: 20px;
  }
}

@media (max-width: 767px) {
  .slide-cases-slider__tabs-item:not(.active) {
    font-size: 14px;
    color: var(--text-color-primary);
  }
}

.slide-cases-slider__icon {
  display: none;
}

@media (min-width: 768px) {
  .slide-cases-slider__icon {
    position: absolute;
    top: 50%;
    right: calc(100% + 10px);
    transform: translateY(-50%);
    display: block;
    width: 24px;
    height: 24px;
  }
}

@media (min-width: 1920px) {
  .slide-cases-slider__icon {
    top: 0;
    transform: translateY(0);
  }
}

@media (min-width: 768px) {
  .slide-cases-slider__wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 70px;
    justify-content: space-between;
  }
}

@media (min-width: 1024px) {
  .slide-cases-slider__wrapper {
    grid-column-gap: 53px;
  }
}

@media (min-width: 1280px) {
  .slide-cases-slider__wrapper {
    grid-column-gap: 62px;
  }
}

@media (min-width: 1920px) {
  .slide-cases-slider__wrapper {
    grid-column-gap: 93px;
    margin-bottom: 27px;
  }
}

.slide-cases-slider__list {
  margin: 0;
  padding-left: 15px;
  list-style-type: disc;
}

@media (min-width: 1920px) {
  .slide-cases-slider__list {
    padding-left: 30px;
  }
}

@media (max-width: 767px) {
  .slide-cases-slider__list:not(.active) {
    display: none;
  }
}

.slide-cases-slider__list-item {
  font-weight: 300;
  letter-spacing: 0.04em;
}

@media (min-width: 1920px) {
  .slide-cases-slider__list-item {
    font-size: 24px;
  }
}

.slide-cases-slider__list-item:not(:last-child) {
  margin-bottom: 15px;
}

@media (min-width: 768px) {
  .slide-cases-slider__list-item:not(:last-child) {
    margin-bottom: 10px;
  }
}

@media (min-width: 1920px) {
  .slide-cases-slider__list-item:not(:last-child) {
    margin-bottom: 12px;
  }
}

.slide-cases-slider__list-item::marker {
  font-size: 60%;
}

.slide-cases-slider__pagination {
  position: static;
  order: 3;
  width: auto;
  margin: 0 14px;
  font-size: 12px;
  font-weight: 300;
}

@media (min-width: 1920px) {
  .slide-cases-slider__pagination {
    font-size: 20px;
  }
}

.slide-cases-slider__button-next-wrapper {
  order: 4;
  height: 24px;
}

@media (min-width: 768px) {
  .slide-cases-slider__button-next-wrapper {
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: auto;
  }
}

.slide-cases-slider__button-previous,
.slide-cases-slider__button-next {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition-property: background-image;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.slide-cases-slider__button-previous {
  order: 2;
  background-image: url("~/assets/icons/slider/arrow-previous--white.svg");
}

@media (any-pointer: fine) {
  .slide-cases-slider__button-previous:hover,
  .slide-cases-slider__button-previous:active {
    background-image: url("~/assets/icons/slider/arrow-previous--gold.svg");
  }
}

.slide-cases-slider__button-next {
  background-image: url("~/assets/icons/slider/arrow-next--white.svg");
}

@media (any-pointer: fine) {
  .slide-cases-slider__button-next:hover,
  .slide-cases-slider__button-next:active {
    background-image: url("~/assets/icons/slider/arrow-next--gold.svg");
  }
}

.slide-cases-slider__title {
  margin: 0 0 30px;
  text-align: center;
  letter-spacing: 0.04em;
}

@media (min-width: 768px) {
  .slide-cases-slider__title {
    margin: 0 20px 0 auto;
  }
}

@media (min-width: 1920px) {
  .slide-cases-slider__title {
    margin-right: 38px;
    font-size: 20px;
  }
}

@media (max-width: 767px) {
  .slide-cases-slider__title:not(.mobile) {
    display: none;
  }
}

@media (min-width: 768px) {
  .slide-cases-slider__title:not(.desktop) {
    display: none;
  }
}

@media (min-width: 768px) {
  .slide-cases-slider__button {
    max-width: 209px;
  }
}

@media (min-width: 1280px) {
  .slide-cases-slider__button {
    max-width: 276px;
  }
}

@media (min-width: 1920px) {
  .slide-cases-slider__button {
    max-width: 450px;
  }
}

@media (max-width: 767px) {
  .slide-cases-slider__button:not(.mobile) {
    display: none;
  }
}

@media (min-width: 768px) {
  .slide-cases-slider__button:not(.desktop) {
    display: none;
  }
}
</style>
