<template>
  <section class="partners">
    <h2 class="partners__title">
      Find business partners from the Globe
    </h2>
    <ul class="partners__list">
      <li
        v-for="(partner, partnerIndex) in partners"
        :key="partnerIndex"
        class="partners-item partners__item"
      >
        <img
          alt=""
          aria-hidden="true"
          class="partners-item__image"
          height="52"
          loading="lazy"
          :src="getImg(partner.icon)"
          width="52"
        />
        <span class="partners-item__title">{{ partner.name }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup>
const getImg = (name) => {
  const path = `../assets/images/countries/${name}.svg`;
  const modules = import.meta.globEager("../assets/images/countries/*");

  return modules[path].default;
};

const partners = [
  {
    icon: "UAE",
    name: "UAE",
  },
  {
    icon: "SaudiArabia",
    name: "Saudi Arabia",
  },
  {
    icon: "Japan",
    name: "Japan",
  },
  {
    icon: "Canada",
    name: "Canada",
  },
  {
    icon: "Russia",
    name: "Russia",
  },
  {
    icon: "India",
    name: "India",
  },
  {
    icon: "USA",
    name: "USA",
  },
  {
    icon: "EuropeanUnion",
    name: "European Union",
  },
  {
    icon: "Kazakhstan",
    name: "Kazakhstan",
  },
  {
    icon: "China",
    name: "China",
  },
  {
    icon: "Jordan",
    name: "Jordan",
  },
  {
    icon: "Turkey",
    name: "Turkey",
  },
];
</script>

<style scoped>
.partners {
  margin-bottom: 40px;
}

@media (min-width: 1170px) {
  .partners {
    padding-bottom: 100px;
  }
}

.partners__title {
  margin-bottom: 18px;
  font-weight: 800;
  font-size: 18px;
  text-align: center;
}

@media (min-width: 768px) {
  .partners__title {
    margin-bottom: 24px;
    font-size: 28px;
  }
}

@media (min-width: 1170px) {
  .partners__title {
    margin-bottom: 40px;
  }
}

.partners__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  padding-left: 0;
}

@media (min-width: 768px) {
  .partners__list {
    display: grid;
    grid-template-columns: repeat(4, 160px);
    grid-gap: 20px;
  }
}

@media (min-width: 1170px) {
  .partners__list {
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 30px;
  }
}

.partners-item {
  display: flex;
  flex-direction: column;
  flex-basis: 130px;
  align-items: center;
  padding: 32px 20px 0;
}

@media (min-width: 768px) {
  .partners-item {
    padding-bottom: 14px;
    border: 1px solid var(--border-color-primary);
    border-radius: 8px;
  }
}

@media (min-width: 1170px) {
  .partners-item {
    padding-bottom: 28px;
  }
}

.partners-item__image {
  margin-bottom: 20px;
  border-radius: 50%;
  filter: drop-shadow(0 4px 12px rgb(218 225 233));
}

.partners-item__title {
  display: flex;
  align-items: center;
  min-height: 54px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
}

@media (min-width: 1170px) {
  .partners-item__title {
    font-size: 18px;
  }
}
</style>
