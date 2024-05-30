<template>
  <section class="slide slide-education">
    <div class="container">
      <h2 class="slide-education__title slide__title">
        <span class="slide__title--gold">Образование</span>
      </h2>
      <swiper
        class="slide-education-slider swiper"
        :options="sliderOptions"
      >
        <swiper-slide
          class="slide-education-slider__item"
          v-for="(slide, index) in slides"
          :key="index"
        >
          <img
            class="slide-education-slider__image"
            :src="require(`~/assets/images/Slide3/certificate${index + 1}.jpg`)"
            alt=""
          >
          <div class="slide-education-slider__wrapper">
            <h3 class="slide-education-slider__title">{{ slide.title }}</h3>
            <p class="slide-education-slider__description">{{ slide.description }}</p>
            <span class="slide-education-slider__caption">{{ slide.caption }}</span>
          </div>
        </swiper-slide>
        <swiper-slide v-if="$mq !== 'mobile'" />
        <button
          class="slide-education-slider__button-previous"
          type="button"
          slot="button-prev"
        ></button>
        <div
          class="slide-education-slider__pagination"
          slot="pagination"
        ></div>
        <button
          class="slide-education-slider__button-next"
          type="button"
          slot="button-next"
        ></button>
      </swiper>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper"

export default {
  name: "Slide3",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      slides: [
        {
          title: "Финансовый менеджер",
          description: "Международный Университет в Москве",
          caption: "2006 - 2011 гг.",
        },
        {
          title: "Управление организацией и персоналом",
          description: "Международный институт менеджмента “Линк”",
          caption: "2020",
        },
        {
          title: "Управление маркетингом и финансами",
          description: "Международный институт менеджмента “Линк”",
          caption: "2020",
        },
        {
          title: "Эффективный менеджер",
          description: "Международный институт менеджмента “Линк”",
          caption: "2020",
        },
        {
          title: "Системное управление организацией",
          description: "Международный институт менеджмента “Линк”",
          caption: "2020",
        },
        {
          title: "Стратегия",
          description: "Международный институт менеджмента “Линк”",
          caption: "2020",
        },
        {
          title: "Стратегии маркетинга в сложном окружении",
          description: "Международный институт менеджмента “Линк”",
          caption: "2020",
        },
        {
          title: "MBA",
          description: "Международный институт менеджмента “Линк”",
          caption: "2020",
        },
      ],
      sliderOptions: {
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 1000,
        pagination: {
          el: ".slide-education-slider__pagination",
          type: "fraction",
        },
        navigation: {
          prevEl: ".slide-education-slider__button-previous",
          nextEl: ".slide-education-slider__button-next",
        },
        breakpoints: {
          768: {
            autoHeight: false,
            slidesPerView: 2,
            spaceBetween: 0,
          },
        },
      },
    }
  },
}
</script>

<style scoped>
.slide-education__title {
  margin-bottom: 43px;
}

@media (min-width: 768px) {
  .slide-education__title {
    margin-bottom: 30px;
  }
}

@media (min-width: 1024px) {
  .slide-education__title {
    margin-bottom: 56px;
  }
}

@media (min-width: 1280px) {
  .slide-education__title {
    margin-bottom: 30px;
  }
}

@media (min-width: 1920px) {
  .slide-education__title {
    margin-bottom: 74px;
  }
}

.slide-education-slider {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-top: 13px;
}

@media (min-width: 768px) {
  .slide-education-slider {
    justify-content: flex-start;
  }
}

@media (min-width: 1280px) {
  .slide-education-slider {
    padding-top: 10px;
  }
}

@media (min-width: 1920px) {
  .slide-education-slider {
    padding-top: 16px;
  }
}

.slide-education-slider__item {
  padding: 0 20px 24px;
  border-radius: 3px;
  background-color: var(--black-lighter);
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.35);
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .slide-education-slider__item {
    display: flex;
    padding: 7px 17px;
    background-color: var(--background-color-quaternary);
    box-shadow: 0 5px 45px rgba(0, 0, 0, 0.35);
  }
}

@media (min-width: 1280px) {
  .slide-education-slider__item {
    padding: 10px 25px;
    border-radius: 5px;
  }
}

@media (min-width: 1920px) {
  .slide-education-slider__item {
    padding: 15px 39px;
    border-radius: 8px;
  }
}

@media (min-width: 768px) {
  .slide-education-slider__item.swiper-slide-active {
    width: 60% !important;
    padding: 0 20px;
    background-color: var(--black-lighter);
    box-shadow: 0 6px 53px rgba(0, 0, 0, 0.35);
    z-index: 1;
  }
}

@media (min-width: 1024px) {
  .slide-education-slider__item.swiper-slide-active {
    width: 65% !important;
  }
}

@media (min-width: 1280px) {
  .slide-education-slider__item.swiper-slide-active {
    width: 50% !important;
    padding: 0 30px 30px;
  }
}

@media (min-width: 1920px) {
  .slide-education-slider__item.swiper-slide-active {
    padding: 0 47px 49px;
  }
}

@media (min-width: 768px) {
  .slide-education-slider__item.swiper-slide-next {
    width: 40% !important;
    transform: translateX(-39px);
  }
}

@media (min-width: 1024px) {
  .slide-education-slider__item.swiper-slide-next {
    width: calc(35% + 39px) !important;
  }
}

@media (min-width: 1280px) {
  .slide-education-slider__item.swiper-slide-next {
    width: calc(50% - 20px) !important;
    margin-left: 20px;
    transform: translateX(0);
  }
}

@media (min-width: 1920px) {
  .slide-education-slider__item.swiper-slide-next {
    width: 40% !important;
    margin-left: 10%;
    transform: translateX(calc(-25% + 20px));
  }
}

.slide-education-slider__image {
  width: 176px;
  height: 251px;
  margin: -20px 0 15px;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .slide-education-slider__image {
    width: 114px;
    height: 163px;
    margin: 0;
    filter: grayscale(100%);
  }
}

@media (min-width: 1280px) {
  .slide-education-slider__image {
    width: 168px;
    height: 240px;
  }
}

@media (min-width: 1920px) {
  .slide-education-slider__image {
    width: 263px;
    height: 375px;
  }
}

@media (min-width: 768px) {
  .slide-education-slider__item.swiper-slide-active .slide-education-slider__image {
    width: 176px;
    height: 251px;
    margin: -13px 0 -10px;
    filter: grayscale(0);
  }
}

@media (min-width: 1280px) {
  .slide-education-slider__item.swiper-slide-active .slide-education-slider__image {
    width: 200px;
    height: 285px;
    margin: -10px 0 0;
  }
}

@media (min-width: 1920px) {
  .slide-education-slider__item.swiper-slide-active .slide-education-slider__image {
    width: 315px;
    height: 447px;
    margin-top: -16px;
  }
}

.slide-education-slider__wrapper {
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .slide-education-slider__wrapper {
    margin-left: 15px;
    padding: 10px 0;
  }

  .slide-education-slider__item.swiper-slide-active .slide-education-slider__wrapper {
    margin-left: 16px;
    padding: 26px 0;
  }
}

@media (min-width: 1280px) {
  .slide-education-slider__wrapper {
    padding: 19px 0;
  }

  .slide-education-slider__item.swiper-slide-active .slide-education-slider__wrapper {
    margin-left: 20px;
    padding: 35px 0 5px;
  }
}

@media (min-width: 1920px) {
  .slide-education-slider__wrapper {
    margin-left: 24px;
    padding: 30px 0;
  }

  .slide-education-slider__item.swiper-slide-active .slide-education-slider__wrapper {
    margin-left: 30px;
    padding: 54px 0 5px;
  }
}

.slide-education-slider__title {
  margin: 0 0 6px;
  font-weight: 300;
  font-size: 20px;
  line-height: 1.2;
  text-transform: uppercase;
  color: var(--text-color-secondary);
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .slide-education-slider__title {
    margin-bottom: 5px;
    font-size: 12px;
  }

  .slide-education-slider__item.swiper-slide-active .slide-education-slider__title {
    margin-bottom: 10px;
    font-size: 20px;
  }
}

@media (min-width: 1280px) {
  .slide-education-slider__title {
    margin-bottom: 10px;
    font-size: 16px;
  }
}

@media (min-width: 1920px) {
  .slide-education-slider__title {
    margin-bottom: 16px;
    font-size: 25px;
  }

  .slide-education-slider__item.swiper-slide-active .slide-education-slider__title {
    margin-bottom: 16px;
    font-size: 30px;
  }
}

@media (min-width: 768px) {
  .slide-education-slider__title::before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    margin-bottom: 9px;
    background-image: url("~/assets/icons/point--gold.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
  }

  .slide-education-slider__title.swiper-slide-active .slide-education__title::before {
    width: 20px;
    height: 20px;
    margin-bottom: 10px;
  }
}

@media (min-width: 1920px) {
  .slide-education-slider__title::before {
    width: 25px;
    height: 25px;
    margin-bottom: 14px;
  }

  .slide-education-slider__title.swiper-slide-active .slide-education__title::before {
    width: 31px;
    height: 31px;
    margin-bottom: 17px;
  }
}

.slide-education-slider__description {
  margin: 0 0 12px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.35;
  letter-spacing: 0.04em;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .slide-education-slider__description {
    margin-bottom: 5px;
    font-size: 10px;
  }

  .slide-education-slider__item.swiper-slide-active .slide-education-slider__description {
    font-size: 14px;
  }
}

@media (min-width: 1280px) {
  .slide-education-slider__description {
    margin-bottom: 10px;
    font-size: 12px;
  }
}

.slide-education-slider__caption {
  font-weight: 300;
  font-size: 12px;
  letter-spacing: 0.04em;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .slide-education-slider__caption {
    font-size: 8px;
  }

  .slide-education-slider__item.swiper-slide-active .slide-education-slider__caption {
    font-size: 12px;
  }
}

@media (min-width: 1280px) {
  .slide-education-slider__caption {
    font-size: 10px;
  }
}

@media (min-width: 1920px) {
  .slide-education-slider__caption {
    font-size: 15px;
  }

  .slide-education-slider__item.swiper-slide-active .slide-education-slider__caption {
    font-size: 18px;
  }
}

.slide-education-slider__pagination {
  position: static;
  order: 3;
  width: auto;
  margin: 0 14px;
  font-weight: 300;
  font-size: 12px;
}

@media (min-width: 1920px) {
  .slide-education-slider__pagination {
    font-size: 20px;
  }
}

.slide-education-slider__button-previous,
.slide-education-slider__button-next {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition-property: background-image;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.slide-education-slider__button-previous {
  order: 2;
  background-image: url("~/assets/icons/slider/arrow-previous--white.svg");
}

@media (any-pointer: fine) {
  .slide-education-slider__button-previous:hover,
  .slide-education-slider__button-previous:active {
    background-image: url("~/assets/icons/slider/arrow-previous--gold.svg");
  }
}

.slide-education-slider__button-next {
  order: 4;
  background-image: url("~/assets/icons/slider/arrow-next--white.svg");
}

@media (any-pointer: fine) {
  .slide-education-slider__button-next:hover,
  .slide-education-slider__button-next:active {
    background-image: url("~/assets/icons/slider/arrow-next--gold.svg");
  }
}
</style>
