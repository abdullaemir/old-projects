<template>
  <section class="hr hr__container">
    <picture>
      <source
        media="(max-width: 768px)"
        srcset="./assets/images/hr-background-element-sm.png"
        type="image/png"
      />
      <img
        alt=""
        class="hr__background-img"
        src="./assets/images/hr-background-element-lg.png"
      />
    </picture>
    <CabinetHRfirstScreen />
    <CabinetHRstepsFromEmployees />
    <CabinetHRtariffs />
  </section>
</template>

<script setup>
import { useHead } from "@vueuse/head";
import {PROJECT_NAME} from "~/constants/meta.js";

import CabinetHRfirstScreen from "./components/cabinetHR/CabinetHRfirstScreen.vue";
import CabinetHRstepsFromEmployees from "./components/cabinetHR/CabinetHRstepsFromEmployees.vue";
import CabinetHRtariffs from "./components/cabinetHR/CabinetHRtariffs.vue";

useHead({
  title: `HR | ${PROJECT_NAME}`,
});
</script>

<style scoped>
.hr__container {
  position: relative;
  max-width: 1440px;
  width: 100%;
}

.hr__background-img {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 150%;
  margin-right: -50px;
  margin-bottom: -100px;
  margin-left: -50px;
}

@media (min-width: 768px) {
  .hr__background-img {
    width: 110%;
  }
}

@media (min-width: 1170px) {
  .hr__background-img {
    width: 100%;
    margin-right: 0;
    margin-left: 0;
  }
}
</style>
