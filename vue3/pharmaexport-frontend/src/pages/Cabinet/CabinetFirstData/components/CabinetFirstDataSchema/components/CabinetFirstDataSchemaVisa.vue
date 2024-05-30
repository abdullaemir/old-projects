<template>
  <div class="visa">
    <div class="schema__card">
      <picture>
        <source
          srcset="../../../assets/logo/visa.avif"
          type="image/avif"
        />
        <source
          srcset="../../../assets/logo/visa.webp"
          type="image/webp"
        />
        <img
          alt=""
          aria-hidden="true"
          class="visa__logo"
          height="70"
          src="../../../assets/logo/visa.jpg"
          width="142"
        />
      </picture>
    </div>

    <div class="arrow__container">
      <CabinetFirstDataSchemaArrow
        class="arrow"
        double
      >
        First data partner
      </CabinetFirstDataSchemaArrow>
    </div>
  </div>
</template>

<script setup>
import CabinetFirstDataSchemaArrow from "./CabinetFirstDataSchemaArrow.vue";
</script>

<style scoped>
.visa {
  padding: 118px 0 184px;
}

@media (min-width: 768px) {
  .visa {
    flex-basis: 142px;
    padding: 0;
  }
}

@media (min-width: 1340px) {
  .visa {
    flex-basis: 200px;
  }
}

.schema__card {
  position: relative;
  z-index: 1;
  grid-template-rows: 70px;
  max-width: none;
}

@media (min-width: 1340px) {
  .schema__card {
    grid-template-rows: 100px;
  }
}

@media (min-width: 1340px) {
  .visa__logo {
    width: 200px;
    height: 100px;
  }
}

.arrow__container {
  top: 0;
  height: 118px;
}

@media (min-width: 768px) {
  .arrow__container {
    height: 172px;
  }
}

.arrow {
  left: 50px;
}

@media (min-width: 768px) {
  .arrow {
    left: -280px;
  }
}

@media (min-width: 1340px) {
  .arrow {
    left: -370px;
  }
}
</style>
