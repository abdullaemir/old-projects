<template>
  <div class="companies">
    <div class="companies__container">
      <ul class="companies__list">
        <li
          v-for="(company, companyIndex) in companies"
          :key="companyIndex"
          class="schema__card"
          :class="`companies__item--${company}`"
        >
          <picture>
            <source
              :srcset="getImg(company, 'avif')"
              type="image/avif"
            />
            <source
              :srcset="getImg(company, 'webp')"
              type="image/webp"
            />
            <img
              alt=""
              aria-hidden="true"
              class="companies__logo"
              height="80"
              loading="lazy"
              :src="getImg(company, 'jpg')"
              width="138"
            />
          </picture>
        </li>
      </ul>
    </div>

    <div class="arrow__container">
      <CabinetFirstDataSchemaArrow class="arrow--left">
        Sales growth
      </CabinetFirstDataSchemaArrow>
      <CabinetFirstDataSchemaArrow
        class="arrow--right"
        reverse
      >
        Brief, money
      </CabinetFirstDataSchemaArrow>
    </div>
  </div>
</template>

<script setup>
import CabinetFirstDataSchemaArrow from "./CabinetFirstDataSchemaArrow.vue";

const companies = [
  "nestle",
  "abbott",
  "bayer",
  "philips",
  "johnson-johnson",
];

const getImg = (name, extension) => {
  const path = `../../../assets/logo/${name}.${extension}`;
  const modules = import.meta.globEager("../../../assets/logo/*");

  return modules[path].default;
};
</script>

<style scoped>
.companies {
  position: relative;
  padding-bottom: 140px;
}

.companies__container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 -16px;
  padding: 20px 16px;
  border: 1px dashed #e80061;
  border-image: url("../../../assets/icons/border-pink.svg") 30%/18px round;
  background-color: #f8eef6;
}

@media (min-width: 768px) {
  .companies__container {
    margin: 0;
    padding: 32px;
    border-radius: 8px;
  }
}

.companies__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 80px;
  grid-auto-flow: row dense;
  grid-gap: 12px;
  max-width: 288px;
  width: 100%;
  margin: 0;
  padding-left: 0;
}

@media (min-width: 768px) {
  .companies__list {
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 70px;
    grid-column-gap: 20px;
    max-width: none;
    border-radius: 8px;
  }
}

@media (min-width: 1340px) {
  .companies__list {
    grid-auto-rows: 100px;
  }
}

@media (min-width: 768px) {
  .companies__logo {
    width: 112px;
    height: 70px;
  }
}

@media (min-width: 1340px) {
  .companies__logo {
    width: 160px;
    height: 100px;
  }
}

.companies__item--johnson-johnson {
  grid-row: 2 / 3;
  grid-column: 1/-1;
}

@media (min-width: 768px) {
  .companies__item--johnson-johnson {
    grid-row: 1 / -1;
    grid-column: -2/-1;
  }
}

.companies__item--bayer {
  grid-column: 2 / -1;
}

@media (min-width: 768px) {
  .companies__item--bayer {
    grid-column: 3 / 4;
  }
}

.arrow__container {
  bottom: 0;
  height: 140px;
}

.arrow--left {
  left: -60px;
}

.arrow--right {
  right: -60px;
}
</style>
