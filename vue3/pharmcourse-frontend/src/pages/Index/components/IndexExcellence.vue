<template>
  <section class="excellence">
    <IndexSectionHeader :title="title" />

    <ul class="excellence__list">
      <li
        v-for="(excellenceItem, excellenceItemIndex) in excellenceList"
        :key="excellenceItemIndex"
        class="excellence__item"
      >
        <img
          alt=""
          class="excellence__image"
          height="76"
          :src="getImg(excellenceItem.img)"
          width="77"
        />
        <span class="excellence__description">
          {{ excellenceItem.description }}
        </span>
      </li>
    </ul>
  </section>
</template>

<script setup>
import IndexSectionHeader from "./common/IndexSectionHeader.vue";

const title = {
  title: "Our Excellence",
};

const excellenceList = [
  {
    description: "More than 110,000 professionals globally",
    img: "pro",
  },
  {
    description: "Online learning from any location in the world",
    img: "online",
  },
  {
    description: "Various topics of CME/CPD accredited events",
    img: "bonus",
  },
  {
    description: "Free CPD webinars and manuals",
    img: "free",
  },
  {
    description: "The best speakers and lecturers",
    img: "best",
  },
  {
    description: "Useful gifts for educational activities",
    img: "gift",
  },
];

const getImg = (name) => {
  const path = `../assets/images/IndexExcellence/${name}.svg`;
  const modules = import.meta.globEager("../assets/images/IndexExcellence/*");

  return modules[path].default;
};
</script>

<style scoped>
.excellence {
  margin-bottom: 30px;
}

.excellence__list {
  display: grid;
  grid-template-columns: repeat(6, 230px);
  grid-gap: 8px;
  margin: 0 -16px 20px;
  padding: 0 16px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}

@media (min-width: 768px) {
  .excellence__list {
    margin: 0 -32px 20px;
    padding: 0 32px;
  }
}

@media (min-width: 1170px) {
  .excellence__list {
    grid-template-columns: repeat(6, 182px);
    margin: 0;
    padding: 0;
  }
}

.excellence__list::-webkit-scrollbar {
  display: none;
}

.excellence__item {
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 16px;
  border-radius: 10px;
  background-color: #f8f9fa;
  scroll-snap-align: center;
}

@media (min-width: 1170px) {
  .excellence__item {
    flex-direction: column;
    padding: 18px 34px;
  }
}

.excellence__image {
  margin-right: 9px;
}

@media (min-width: 1170px) {
  .excellence__image {
    margin: 0 auto;
  }
}

.excellence__description {
  font-size: 12px;
  color: var(--text-color-primary);
}

@media (min-width: 1170px) {
  .excellence__description {
    text-align: center;
  }
}
</style>
