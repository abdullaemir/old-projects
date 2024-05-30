<template>
  <section class="deliver__container">
    <h2 class="deliver__title">
      What we deliver to our clients
    </h2>

    <ul class="deliver__list">
      <li
        v-for="(deliver, deliverIndex) in delivers"
        :key="deliverIndex"
        class="deliver__item"
      >
        <img
          alt=""
          aria-hidden="true"
          class="partner__icon"
          height="56"
          loading="lazy"
          :src="getImg(deliver.icon)"
          width="56"
        />
        <h3 class="deliver__tag">
          {{ deliver.tag }}
        </h3>
        <p>{{ deliver.text }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
const delivers = [
  {
    icon: "1",
    tag: "Online personalization",
    text: "Purchase-based targeting on big ad platforms (FB, Youtube, Google)",
  },
  {
    icon: "2",
    tag: "Analytics and research",
    text: "Measurement of the sales uplift (O2O)",
  },
  {
    icon: "3",
    tag: "Offline Personalization",
    text: "Geolocation based push ads in the retailers’ apps",
  },
];

const getImg = (name) => {
  const path = `../assets/icons/${name}.svg`;
  const modules = import.meta.globEager("../assets/icons/*");

  return modules[path].default;
};
</script>

<style scoped>
.deliver__container {
  margin-bottom: 40px;
}

@media (min-width: 768px) {
  .deliver__container {
    margin-bottom: 80px;
  }
}

@media (min-width: 1170px) {
  .deliver__container {
    margin-bottom: 100px;
  }
}

.deliver__title {
  margin-bottom: 24px;
  font-weight: 300;
  font-size: 20px;
  line-height: 1.75;
}

@media (min-width: 768px) {
  .deliver__title {
    margin-bottom: 32px;
    font-size: 24px;
    line-height: 1.88;
  }
}

.deliver__list {
  display: grid;
  grid-row-gap: 12px;
  margin: 0;
  padding-left: 0;
}

@media (min-width: 768px) {
  .deliver__list {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
  }
}

@media (min-width: 1170px) {
  .deliver__list {
    grid-column-gap: 32px;
  }
}

.deliver__item {
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 0 50px rgb(0 89 193 / 0.1);
}

.deliver__tag {
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .deliver__tag {
    margin-bottom: 8px;
  }
}

.partner__icon {
  margin-bottom: 20px;
}
</style>
