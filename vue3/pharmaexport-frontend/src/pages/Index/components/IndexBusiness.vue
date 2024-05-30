<template>
  <section class="business">
    <h2 class="business__title">
      Grow your business with international partners
    </h2>
    <ul class="business__list">
      <li
        v-for="(item, index) in list"
        :key="index"
        class="business-item business__item"
      >
        <img
          alt=""
          aria-hidden="true"
          class="business-item__icon"
          height="52"
          loading="lazy"
          :src="getImg(item.icon)"
          width="52"
        />
        {{ item.text }}
      </li>
    </ul>
  </section>
</template>

<script setup>
const list = [
  {
    icon: "dialog",
    text: "Seek for the Products in Your Target Niche",
  },
  {
    icon: "letter",
    text: "Receive Quotations Rapidly",
  },
  {
    icon: "handshake",
    text: "Seal the Deal, Exchange the Documentations, Submit Your Purchase Online",
  },
];

const getImg = (name) => {
  const path = `../assets/icons/${name}.svg`;
  const modules = import.meta.globEager("../assets/icons/*");

  return modules[path].default;
};
</script>

<style scoped>
.business {
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .business {
    margin-bottom: 40px;
  }
}

@media (min-width: 1170px) {
  .business {
    margin-bottom: 100px;
  }
}

.business__title {
  margin-bottom: 24px;
  font-weight: 800;
  font-size: 16px;
  text-align: center;
}

@media (min-width: 768px) {
  .business__title {
    margin-bottom: 18px;
    font-size: 24px;
  }
}

@media (min-width: 1170px) {
  .business__title {
    margin-bottom: 40px;
    font-size: 28px;
  }
}

.business__list {
  display: grid;
  justify-content: center;
  margin: 0;
  padding-left: 0;
  grid-row-gap: 24px;
}

@media (min-width: 768px) {
  .business__list {
    grid-template-columns: repeat(3, 220px);
    grid-column-gap: 20px;
  }
}

@media (min-width: 1170px) {
  .business__list {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 32px;
  }
}

.business-item {
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .business-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 18px 20px 32px;
    border-radius: 8px;
    box-shadow: 0 0 50px rgb(0 89 193 / 0.1);
  }
}

@media (min-width: 1170px) {
  .business-item {
    flex-direction: row;
    align-items: center;
    padding: 20px 32px;
  }
}

.business-item__icon {
  margin-right: 20px;
}

@media (min-width: 768px) {
  .business-item__icon {
    width: 68px;
    height: 68px;
    margin: 0 0 20px;
  }
}

@media (min-width: 1170px) {
  .business-item__icon {
    margin: 0 32px 0 0;
  }
}
</style>
