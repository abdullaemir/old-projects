<template>
  <section
    id="procedure"
    class="procedure analytics__section"
  >
    <AnalyticsBaseTitle> What is the Procedure? </AnalyticsBaseTitle>

    <ul class="procedure__list">
      <li
        v-for="(procedure, procedureIndex) in procedures"
        :key="procedureIndex"
        class="procedure__item"
      >
        <img
          alt=""
          aria-hidden="true"
          class="procedure__icon"
          height="68"
          loading="lazy"
          :src="getImg(procedure.icon)"
          width="68"
        />

        <h3 class="procedure__tag">
          {{ procedure.tag }}
        </h3>

        <p>
          {{ procedure.text }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import AnalyticsBaseTitle from "./AnalyticsTitle.vue";

const procedures = [
  {
    icon: "agreement",
    tag: "agreement",
    text: "Our manager will contact you to discuss your needs and terms",
  },
  {
    icon: "progress",
    tag: "Report in progress",
    text: "Our highly professional team develops an individual report for you",
  },
  {
    icon: "ready",
    tag: "Report complete",
    text: "You receive a complete finalized report within the agreed timing",
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
.procedure {
  margin-top: -52px;
  padding: 52px 0 42px;
  background-image: url("../assets/images/procedure-background-mobile.svg");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

@media (min-width: 768px) {
  .procedure {
    margin-top: 0;
    padding: 0 0 26px;
    background: none;
  }
}

@media (min-width: 1170px) {
  .procedure {
    padding: 0 0 21px;
  }
}

.procedure__list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 12px;
  margin: 0;
  padding: 0;
}

@media (min-width: 768px) {
  .procedure__list {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin: 0 -32px;
    padding: 0 32px 32px;
    background-image: url("../assets/images/procedure-background-tablet.svg");
    background-position: bottom;
    background-size: 100% 90%;
    background-repeat: no-repeat;
  }
}

@media (min-width: 1170px) {
  .procedure__list {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 32px;
    max-width: 1070px;
    padding: 0 45px 59px;
  }
}

.procedure__item {
  min-height: 232px;
  padding: 32px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 50px rgb(0 89 193 / 0.1);
}

@media (min-width: 1170px) {
  .procedure__item {
    max-width: 300px;
  }
}

.procedure__icon,
.procedure__tag {
  margin-bottom: 8px;
}

@media (min-width: 1170px) {
  .procedure__icon {
    margin-bottom: 12px;
  }
}

.procedure__tag {
  font-weight: 600;
  font-size: inherit;
  text-transform: uppercase;
}
</style>
