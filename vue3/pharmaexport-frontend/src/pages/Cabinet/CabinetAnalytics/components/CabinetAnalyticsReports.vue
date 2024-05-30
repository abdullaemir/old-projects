<template>
  <section class="reports__container">
    <p class="reports__description">
      Based on the official sources and Pharma Global own resources, we propose several types of analytical reports for
      the audience:
    </p>
    <ul class="reports__list">
      <li
        v-for="(report, reportIndex) in reports"
        :key="reportIndex"
        class="reports__item"
      >
        <img
          alt=""
          aria-hidden="true"
          class="report__icon"
          height="68"
          loading="lazy"
          :src="getImg(report.icon)"
          width="68"
        />
        <h3 class="report__tag">
          {{ report.tag }}
        </h3>
        <p>
          {{ report.text }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script setup>
const reports = [
  {
    icon: "manufacturers",
    tag: " Pharmaceutical manufacturers",
    text: "planning launching activities to enter the GCC market or expanding their presence in this market",
  },
  {
    icon: "distributors",
    tag: "Distributors",
    text: "from the GCC countries willing to expand their portfolio with the valid positions",
  },
  {
    icon: "clinics",
    tag: "Clinics and public hospitals",
    text: "from the GCC countries looking for medicinal products to purchase",
  },
  {
    icon: "other",
    tag: "Other pharmaceutical market players",
    text: "exploring the market insights",
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
.reports__container {
  margin-bottom: 32px;
  color: var(--blue-darkest);
}

@media (min-width: 768px) {
  .reports__container {
    margin-bottom: 60px;
  }
}

@media (min-width: 1300px) {
  .reports__container {
    display: flex;
    margin-bottom: 30px;
  }
}

.reports__description {
  margin-bottom: 24px;
  font-weight: 300;
  font-size: 20px;
  line-height: 1.75;
}

@media (min-width: 768px) {
  .reports__description {
    margin-bottom: 20px;
    font-size: 24px;
    line-height: 1.9;
  }
}

@media (min-width: 1300px) {
  .reports__description {
    max-width: 311px;
    margin: 0 32px 0 0;
  }
}

.reports__list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 12px;
  margin: 0;
  padding: 0;
}

@media (min-width: 768px) {
  .reports__list {
    grid-template-columns: repeat(2, 284px);
    grid-gap: 24px 32px;
  }
}

@media (min-width: 1300px) {
  .reports__list {
    grid-gap: 32px;
  }
}

.reports__item {
  height: 278px;
  padding: 32px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 50px rgb(0 89 193 / 0.1);
}

@media (min-width: 1300px) {
  .reports__item:nth-child(odd) {
    margin-top: -70px;
  }
}

.report__icon {
  margin-bottom: 12px;
}

.report__tag {
  margin-bottom: 8px;
  font-weight: 600;
  font-size: inherit;
  text-transform: uppercase;
}
</style>
