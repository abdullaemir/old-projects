<template>
  <section class="process__container">
    <h2 class="process__heading">
      How is the process going?
    </h2>

    <ul class="process__list">
      <li
        v-for="(process, processIndex) in processes"
        :key="processIndex"
        class="process__item"
      >
        <img
          alt=""
          aria-hidden="true"
          class="process__icon"
          height="68"
          loading="lazy"
          :src="getImg(process.icon)"
          width="68"
        />
        <h3 class="process__tag">
          {{ process.tag }}
        </h3>
        <p class="process__text">
          {{ process.text }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script setup>
const processes = [
  {
    icon: "agreement",
    tag: " agreement",
    text: "Our manager will contact you to discuss your needs and terms",
  },
  {
    icon: "progress",
    tag: "Report in progress",
    text: "Our team prepares an individual report for you",
  },
  {
    icon: "ready",
    tag: "Report ready",
    text: "You receive a finished report within the agreed time frame",
  },
];
// TODO: Удалить getImg
const getImg = (name) => {
  const path = `../assets/icons/${name}.svg`;
  const modules = import.meta.globEager("../assets/icons/*");

  return modules[path].default;
};
</script>

<style scoped>
.process__container {
  margin: 0 -16px;
  padding: 0 16px 32px;
  background-image: url("../assets/images/process-background-mobile.svg");
  background-position: center 20px;
  background-size: contain;
  background-repeat: no-repeat;
}

@media (min-width: 768px) {
  .process__container {
    margin: 0 -32px;
    padding: 0 32px 32px;
    background-image: url("../assets/images/process-background-tablet.svg");
    background-position: bottom;
    background-size: 100% 90%;
  }
}

.process__heading {
  margin-bottom: 24px;
  font-weight: 300;
  font-size: 20px;
  line-height: 1.75;
  color: var(--blue-darkest);
}

@media (min-width: 768px) {
  .process__heading {
    margin-bottom: 32px;
  }
}

.process__list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 12px;
  padding: 0;
}

@media (min-width: 768px) {
  .process__list {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
}

@media (min-width: 1170px) {
  .process__list {
    grid-gap: 32px;
  }
}

.process__item {
  padding: 32px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  background-color: #ffffff;
  box-shadow: 0 0 50px rgb(0 89 193 / 0.1);
}

.process__icon,
.process__tag {
  margin-bottom: 8px;
}

.process__tag {
  font-weight: 600;
  font-size: inherit;
  text-transform: uppercase;
}
</style>
