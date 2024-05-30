<!--
TODO:
- унифицировать классы
- установить базовые стили из свайпера (убрать инициализацию стилей свайпера)
-->

<template>
  <swiper
    :modules="[Virtual]"
    :centered-slides="centeredSlides"
    :centered-slides-bounds="centeredSlidesBounds"
    :free-mode="freeMode"
    :scrollbar="scrollbar"
    :slides-per-view="slidesPerView"
    :space-between="spaceBetween"
    @swiper="onSwiper"
    v-bind="$attrs"
  >
    <template #wrapper-start>
      <div class="swiper-slide swiper-slide--custom-start">
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

import SwiperCore, { Scrollbar, Virtual } from "swiper";

import "swiper/swiper.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

SwiperCore.use([Scrollbar]);

const props = defineProps({
  activeIndex: {
    default: null,
    required: false,
    type: [String, Number],
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

watch(() => props.activeIndex, index => slider.slideToLoop(Number(index+1), 300));
</script>
