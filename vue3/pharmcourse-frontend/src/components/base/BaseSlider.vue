<!--
TODO:
- унифицировать классы
- установить базовые стили из свайпера (убрать инициализацию стилей свайпера)
-->

<template>
  <swiper
    :autoplay="autoplay"
    :breakpoints="breakpoints"
    :modules="[Virtual]"
    :navigation="navigation"
    :centered-slides="centeredSlides"
    :centered-slides-bounds="centeredSlidesBounds"
    :free-mode="freeMode"
    :loop="loop"
    :pagination="pagination"
    :scrollbar="props.scrollbar"
    :slides-per-view="slidesPerView"
    :space-between="spaceBetween"
    @swiper="onSwiper"
    v-bind="$attrs"
  >
    <template #container-start>
      <div>
        <slot name="container-start"></slot>
      </div>
    </template>

    <template #wrapper-start>
      <div :class="{ 'swiper-slide swiper-slide--custom-start': isFirstSlideCustom }">
        <slot name="wrapper-start"></slot>
      </div>
    </template>

    <swiper-slide
      v-for="(slide,index) in slidesData"
      :key="slide.id"
      :virtualIndex="index"
    >
      <slot
        name="base-slide"
        :slotProps="{ slide, isActive: index === activeIndex }"
      />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { computed, watch } from "vue";

import { Swiper, SwiperSlide } from "swiper/vue";

import SwiperCore, { Autoplay, Navigation, Pagination, Scrollbar, Virtual } from "swiper";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar]);

const props = defineProps({
  activeIndex: {
    default: null,
    required: false,
    type: [String, Number],
  },
  autoplay: {
    default: false,
    type: [Boolean, Object],
  },
  breakpoints: {
    default: null,
    type: Object,
  },
  centeredSlides: {
    default: true,
    type: Boolean,
  },
  centeredSlidesBounds: {
    default: true,
    type: Boolean,
  },
  dragSize: {
    default: 150,
    type: [Number, String]
  },
  freeMode: {
    default: false,
    type: Boolean,
  },
  isFirstSlideCustom: {
    type: Boolean,
    default: false,
  },
  loop: {
    default: false,
    type: Boolean,
  },
  navigation: {
    default: false,
    type: [Object, Boolean],
  },
  pagination: {
    default: false,
    type: [Object, Boolean],
  },
  scrollbar: {
    default: false,
    type: [Object, Boolean],
  },
  slidesData: {
    required: true,
    type: [Array],
  },
  slidesPerView: {
    default: "auto",
    type: [String, Number],
  },
  spaceBetween: {
    default: 0,
    type: [String, Number],
  },
  speed: {
    default: 300,
    type: Number,
  },
});

let slider = null;

const onSwiper = swiper => slider = swiper;

const scrollbar = computed(() => {
  return {
    hide: false,
    draggable: true,
    dragSize: props.dragSize,
  }
})

watch(() => props.activeIndex, index => slider.slideToLoop(Number(index+1), props.speed));
</script>
