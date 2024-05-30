<template>
  <section
    id="our-partners"
    class="partners analytics__section"
  >
    <AnalyticsBaseTitle> Our Partners </AnalyticsBaseTitle>

    <ul class="partners__list">
      <li
        v-for="(partner, procedureIndex) in partners"
        :key="procedureIndex"
        class="partners__item"
      >
        <img
          alt=""
          aria-hidden="true"
          class="partners__logo"
          height="92"
          loading="lazy"
          :src="getImg(partner)"
          width="160"
        />
      </li>
    </ul>
  </section>
</template>

<script setup>
import AnalyticsBaseTitle from "./AnalyticsTitle.vue";

const partners = [
  "abbot",
  "servier",
  "acino",
  "omron",
  "spimaco",
  "thea",
  "bioderma",
  "bayer",
  "globe",
  "astrazeneca",
];

// TODO: Удалить getImg
const getImg = (name) => {
  const path = `../assets/icons/${name}.png`;
  const modules = import.meta.globEager("../assets/icons/*");

  return modules[path].default;
};
</script>

<style scoped>
.partners {
  margin-bottom: 32px;
  padding: 0;
}

@media (min-width: 768px) {
  .partners {
    margin-bottom: 60px;
    padding: 0;
  }
}

@media (min-width: 1170px) {
  .partners {
    margin-bottom: 80px;
    padding: 0;
  }
}

.partners__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 -16px;
  padding: 0;
}

.partners__item,
.partners__logo {
  margin: 0;
  padding: 0;
}

@media (min-width: 768px) {
  .partners__item,
  .partners__logo {
    width: 228px;
    height: 130px;
  }
}
</style>
