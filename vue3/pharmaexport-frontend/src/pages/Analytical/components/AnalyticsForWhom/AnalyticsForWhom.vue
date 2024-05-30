<template>
  <section
    id="for-whom"
    class="analytics__section container--wide for-whom"
  >
    <div class="for-whom__wrapper">
      <div>
        <AnalyticsTitle class="for-whom__title">
          Who is our Product Suitable for?
        </AnalyticsTitle>

        <p class="for-whom__description">
          Find out about new products which may fit your portfolio and which items of your existing product line can be
          valuable for pharma export to specific countries in the MENA region.
        </p>
      </div>

      <iframe
        ref="iframe"
        allow="autoplay; picture-in-picture;"
        allowfullscreen
        class="for-whom__iframe"
        height="200"
        loading="lazy"
        :src="videoSrc"
        title="Analytical reports on the pharmaceutical market"
        width="320"
      />
    </div>

    <ul class="for-whom__cards">
      <li
        v-for="(card, cardIndex) in cards"
        :key="cardIndex"
        class="for-whom__card"
      >
        <img
          alt=""
          class="for-whom__card-icon"
          :src="getIcon(card.icon)"
        />

        <span class="for-whom__card-title">
          {{ card.title }}
        </span>

        <p class="for-whom__card-description">
          {{ card.description }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { useElementVisibility, useTimeoutFn } from "@vueuse/core";
import { watch, ref } from "vue";

import AnalyticsTitle from "../AnalyticsTitle.vue";

const iframe = ref(null);
const isIframeVisible = useElementVisibility(iframe);
const isVideoPlayed = ref(false);
const videoSrc = ref("https://youtube.com/embed/RfXtxczU4mo");

const cards = [
  {
    description: "to launch or expand their business at the MENA market",
    icon: "manufacturers",
    title: "Pharma Manufacturers",
  },
  {
    description: "to expand their portfolio with the valid positions",
    icon: "distributors",
    title: "Distributors",
  },
  {
    description: "to find new products to purchase",
    icon: "hospitals",
    title: "Clinics and Public Hospitals",
  },
];

const getIcon = (name) => {
  const path = `./assets/icons/${name}.svg`;
  const modules = import.meta.globEager("./assets/icons/*");

  return modules[path].default;
};

const { start: videoStart } = useTimeoutFn(
  () => {
    videoSrc.value += "?autoplay=1";
    isVideoPlayed.value = true;
  },
  200,
  {
    immediate: false,
  },
);

watch(
  () => isIframeVisible.value,
  (isVisible) => {
    if (isVisible && !isVideoPlayed.value) {
      videoStart();
    }
  },
);
</script>

<style scoped>
.for-whom {
  margin-bottom: 32px;
  padding-top: 40px;
  padding-bottom: 32px;
  background-color: #fbfbfe;
}

@media (min-width: 768px) {
  .for-whom {
    margin-bottom: 60px;
    padding-top: 60px;
    padding-bottom: 60px;
  }
}

@media (min-width: 1170px) {
  .for-whom {
    padding-top: 0;
    padding-bottom: 0;
    background-color: transparent;
    background-image: linear-gradient(#fbfbfe, #fbfbfe);
    background-position: center top;
    background-size: 100% 450px;
    background-repeat: no-repeat;
  }
}

@media (min-width: 1170px) {
  .for-whom__wrapper {
    display: grid;
    grid-template-columns: 1fr 720px;
    grid-column-gap: 80px;
  }
}

@media (min-width: 1450px) {
  .for-whom__wrapper {
    grid-template-columns: 490px 720px;
  }
}

@media (min-width: 1170px) {
  .for-whom__title {
    margin-top: 80px;
  }
}

.for-whom__description {
  margin-bottom: 20px;
  font-size: 16px;
}

@media (min-width: 768px) {
  .for-whom__description {
    margin-bottom: 32px;
  }
}

.for-whom__iframe {
  width: calc(100% + 32px);
  height: 200px;
  margin: 0 -16px 20px;
  border: none;
}

@media (min-width: 450px) {
  .for-whom__iframe {
    width: 100%;
    height: 440px;
    margin: 0 0 20px;
  }
}

@media (min-width: 768px) {
  .for-whom__iframe {
    margin-bottom: 0;
  }
}

@media (min-width: 1170px) {
  .for-whom__iframe {
    height: 450px;
    margin-right: -154px;
  }
}

.for-whom__cards {
  display: grid;
  grid-row-gap: 12px;
  margin: 0;
  padding-left: 0;
}

@media (min-width: 768px) {
  .for-whom__cards {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    margin-top: -24px;
  }
}

@media (min-width: 1170px) {
  .for-whom__cards {
    grid-template-columns: repeat(3, 300px);
    grid-column-gap: 32px;
    margin-top: -58px;
  }
}

.for-whom__card {
  z-index: 1;
  min-height: 236px;
  padding: 32px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 50px rgb(0 89 193 / 0.1);
}

.for-whom__card-icon {
  display: block;
  width: 68px;
  margin-bottom: 12px;
}

.for-whom__card-title {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
}
</style>
