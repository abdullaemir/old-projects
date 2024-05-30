<template>
  <div class="socials">
    <div class="schema__card schema__card--data">
      <img
        alt=""
        aria-hidden="true"
        class="socials__logo"
        height="28"
        src="../../../assets/icons/data-partner.svg"
        width="28"
      />
      Data partner
    </div>

    <ul class="schema__card schema__card--social">
      <li
        v-for="(social, socialIndex) in socials"
        :key="socialIndex"
        class="socials__item"
      >
        <img
          alt=""
          aria-hidden="true"
          class="socials__logo"
          height="28"
          :src="getImg(social)"
          width="28"
        />
      </li>
    </ul>

    <div class="arrow__container">
      <CabinetFirstDataSchemaArrow
        class="arrow"
        reverse
      >
        Data sharing to FD
      </CabinetFirstDataSchemaArrow>
    </div>
  </div>
</template>

<script setup>
import CabinetFirstDataSchemaArrow from "./CabinetFirstDataSchemaArrow.vue";

const socials = [
  "facebook",
  "google",
  "youtube",
];
const getImg = (name) => {
  const path = `../../../../../../assets/logo/${name}.svg`;
  const modules = import.meta.globEager("~/assets/logo/*");

  return modules[path].default;
};
</script>

<style scoped>
.socials {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 -16px;
  padding: 20px 16px;
  border: 1px dashed #350078;
  border-image: url("../../../assets/icons/border-blue.svg") 30%/18px round;
  background-color: #f4f1f8;
}

@media (min-width: 768px) {
  .socials {
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;
    margin: 0 0 0 32px;
    padding: 32px;
    border-radius: 8px;
  }
}

@media (min-width: 1340px) {
  .socials {
    margin-left: 113px;
  }
}

@media (min-width: 1340px) {
  .socials__logo {
    width: 36px;
    height: 36px;
  }
}

.schema__card--data {
  left: -60px;
  max-width: 168px;
}

.schema__card--social {
  left: 60px;
  max-width: 168px;
  margin: 80px 0 0;
}

@media (min-width: 768px) {
  .schema__card--data,
  .schema__card--social {
    left: auto;
    margin: 0;
  }
}

@media (min-width: 1340px) {
  .schema__card--data,
  .schema__card--social {
    max-width: 200px;
  }
}

.socials__item {
  line-height: 0;
}

.arrow__container {
  top: 50%;
  height: 80px;
  transform: translateY(-50%);
}

@media (min-width: 768px) {
  .arrow__container {
    top: 0;
    height: 130px;
    transform: rotate(-90deg);
  }
}

@media (min-width: 1340px) {
  .arrow__container {
    height: 165px;
  }
}

.arrow {
  left: 5px;
}

@media (min-width: 768px) {
  .arrow {
    left: 0;
  }
}

:deep(.arrow__text) {
  background-color: #f4f1f8;
}

@media (min-width: 768px) {
  .socials :deep(.arrow__text) {
    transform: translate(-50%, -50%) rotate(-90deg);
  }
}
</style>
