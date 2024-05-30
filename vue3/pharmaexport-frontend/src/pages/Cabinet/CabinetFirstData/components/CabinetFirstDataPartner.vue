<template>
  <section class="partner__container">
    <h2 class="partner__title">
      Become a partner and get personal benefits
    </h2>

    <ul class="partner__list">
      <li
        v-for="(partner, partnerIndex) in partners"
        :key="partnerIndex"
        class="partner__item"
      >
        <img
          alt=""
          aria-hidden="true"
          class="partner__icon"
          height="68"
          loading="lazy"
          :src="getImg(partner.icon)"
          width="68"
        />
        <h3 class="partner__tag">
          {{ partner.tag }}
        </h3>
        <p class="partner__text">
          {{ partner.text }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script setup>
const partners = [
  {
    icon: "marketing",
    tag: "Tech marketing",
    text: "We specialize in creating advertising products for retailers including healthcare retail",
  },
  {
    icon: "benefit",
    tag: "Benefit for data partners",
    text: "Our products help retail to monetize data",
  },
  {
    icon: "experience",
    tag: "Experience",
    text: "Over 5 years of working with data",
  },
  {
    icon: "partners",
    tag: "Data partners",
    text: "Biggest retailers in FMCG, pharma and child goods spheres",
  },
  {
    icon: "business",
    tag: "Business model",
    text: "- Revenue Sharing for data providers;\n- Buying data from suppliers",
  },
  {
    icon: "clients",
    tag: "Clients",
    text: "J&J, Bayer, Stada, Takeda and etc.",
  },
];

const getImg = (name) => {
  const path = `../assets/icons/${name}.svg`;
  const modules = import.meta.globEager("../assets/icons/*");

  return modules[path].default;
};
</script>

<style scoped>
.partner__container {
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .partner__container {
    margin-bottom: 60px;
  }
}

@media (min-width: 1170px) {
  .partner__container {
    margin-bottom: 80px;
  }
}

.partner__title {
  margin-bottom: 24px;
  font-weight: 300;
  font-size: 20px;
  line-height: 1.75;
}

@media (min-width: 768px) {
  .partner__title {
    margin-bottom: 32px;
    font-size: 24px;
    line-height: 1.88;
  }
}

.partner__list {
  display: grid;
  grid-row-gap: 32px;
  margin: 0;
  padding-left: 0;
}

@media (min-width: 768px) {
  .partner__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 40px;
    grid-column-gap: 52px;
  }
}

@media (min-width: 1170px) {
  .partner__list {
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 60px;
    grid-column-gap: 35px;
  }
}

.partner__item {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-auto-rows: min-content;
  grid-row-gap: 8px;
  grid-column-gap: 20px;
}

.partner__icon {
  grid-row: 1 / span 2;
}

.partner__tag {
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
}

.partner__text {
  white-space: pre-wrap;
}
</style>
