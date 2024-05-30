<template>
  <section class="container--wide stories">
    <BaseSlider
      :centered-slides="false"
      class="stories__slider"
      :loop="isDesktop && stories.length > 6"
      navigation
      :slides-data="stories"
      :space-between="8"
    >
      <template #base-slide="{ slotProps }">
        <div
          class="stories__item"
          @click="changePopupVisibility(true, slotProps.slide.order)"
        >
          <span class="stories__title">
            {{ slotProps.slide.title }}
          </span>
          <img
            alt=""
            class="stories__image"
            :src="slotProps.slide.image"
          />
        </div>
      </template>
    </BaseSlider>

    <div
      class="stories__overlay"
      :class="[{ visible: isPopupVisible }]"
    >
      <BaseSlider
        :active-index="activeIndex"
        class="stories-popup"
        :slides-data="stories"
        :slides-per-view="1"
        :speed="0"
      >
        <template #container-start>
          <BaseButton
            class="stories-popup__button"
            @click="changePopupVisibility(false)"
          />
        </template>

        <template #base-slide="{ slotProps }">
          <img
            alt=""
            class="stories-popup__image"
            :src="slotProps.slide.image"
          />
        </template>
      </BaseSlider>
    </div>
  </section>
</template>

<script setup>
import { useBreakpoints } from "@vueuse/core";
import { useContext } from "vite-ssr";
import { ref } from "vue";

import BaseButton from "~/components/base/BaseButton.vue";
import BaseSlider from "~/components/base/BaseSlider.vue";

const { isClient } = useContext();
const breakpoints = useBreakpoints({
  desktop: 1170,
});

const activeIndex = ref(0);
const isPopupVisible = ref(false);

let isDesktop = ref(true);

if (isClient) {
  isDesktop = breakpoints.greater("desktop");
}

const stories = [
  {
    image: "http://www.evolo.us/wp-content/uploads/2019/04/0516-0.jpg",
    order: 1,
    title: "Free Webinars under CPD Accreditation in October",
  },
  {
    image: "https://cdn.wallpapersafari.com/44/75/g93D1d.jpg",
    order: 2,
    title: "Survey for Healthcare Professionals",
  },
  {
    image: "https://blmparis.files.wordpress.com/2014/07/night.jpg",
    order: 3,
    title: "Special Giveaway for the World Ph",
  },
  {
    image: "http://www.evolo.us/wp-content/uploads/2019/04/0516-0.jpg",
    order: 4,
    title: "How do pharmacists communicate with patients?",
  },
  {
    image: "https://cdn.wallpapersafari.com/44/75/g93D1d.jpg",
    order: 5,
    title: "Free Webinars under CPD Accreditation in October",
  },
  {
    image: "https://blmparis.files.wordpress.com/2014/07/night.jpg",
    order: 6,
    title: "Survey for Healthcare Professionals",
  },
  {
    image: "http://www.evolo.us/wp-content/uploads/2019/04/0516-0.jpg",
    order: 7,
    title: "Special Giveaway for the World Ph",
  },
  {
    image: "https://cdn.wallpapersafari.com/44/75/g93D1d.jpg",
    order: 8,
    title: "How do pharmacists communicate with patients?",
  },
];

const changePopupVisibility = (isVisible, order = 1) => {
  const { documentElement } = document;

  activeIndex.value = order - 1;
  isPopupVisible.value = isVisible;

  documentElement.style.cssText = `
    position: ${isVisible ? "fixed" : "static"};
    top: -${window.scrollY}px;
    right: 0;
    left: 0;
    margin-right: ${isVisible ? window.innerWidth - documentElement.clientWidth : 0}px;
    overflow-y: ${isVisible ? "hidden" : "visible"};
  `;
};
</script>

<style scoped>
.stories {
  margin: 0 -16px 24px;
  padding: 30px 0;
  background-color: #f8f9fa;
}

@media (min-width: 768px) {
  .stories {
    margin: 0 -32px 20px;
    padding: 30px 0;
  }
}

@media (min-width: 1170px) {
  .stories {
    margin: 0 0 30px;
    padding: 30px 16px;
  }
}

:deep(.stories__slider.swiper-container) {
  padding: 0 16px;
}

@media (min-width: 768px) {
  :deep(.stories__slider.swiper-container) {
    padding: 0 32px;
  }
}

@media (min-width: 1170px) {
  :deep(.stories__slider.swiper-container) {
    padding: 0;
  }

  :deep(.stories__slider.swiper-container::after) {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 254px;
    height: 100%;
    background-color: #f8f9fa;
  }
}

.stories__slider :deep(.swiper-button-prev),
.stories__slider :deep(.swiper-button-next) {
  display: none;
}

@media (min-width: 1170px) {
  .stories__slider :deep(.swiper-button-next) {
    right: 0;
    display: block;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #ffffff;
    background-image: url("~/assets/icons/caret--black.svg");
    background-position: left calc(50% + 2px) center;
    background-size: 10px 18px;
    background-repeat: no-repeat;
    box-shadow: 0 1px 3px rgb(145 163 192 / 0.3);
  }

  .stories__slider :deep(.swiper-button-disabled) {
    display: none;
  }

  .stories__slider :deep(.swiper-button-next::after) {
    content: none;
  }
}

.stories__slider :deep(.swiper-slide) {
  width: 135px;
}

.stories__item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 180px;
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
}

.stories__title {
  z-index: 1;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
}

.stories__image {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stories__overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-modal);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #04202f;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  pointer-events: none;
}

@media (min-width: 1170px) {
  .stories__overlay {
    padding: 40px;
    background-color: rgb(4 32 47 / 0.4);
  }
}

.stories__overlay.visible {
  opacity: 1;
  pointer-events: all;
}

.stories-popup {
  position: relative;
  flex-grow: 1;
  max-width: 320px;
  width: 100%;
}

@media (min-width: 768px) {
  .stories-popup {
    max-width: 540px;
  }
}

@media (min-width: 1170px) {
  .stories-popup {
    max-width: 370px;
  }
}

.stories-popup__button {
  position: absolute;
  top: 26px;
  right: 16px;
  z-index: var(--z-index-modal);
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 50%;
  background-color: rgb(3 16 23 / 0.2);
  background-image: url("~/assets/icons/cross.svg");
  background-position: center;
  background-repeat: no-repeat;
}

.stories-popup__image {
  width: 100%;
}
</style>
