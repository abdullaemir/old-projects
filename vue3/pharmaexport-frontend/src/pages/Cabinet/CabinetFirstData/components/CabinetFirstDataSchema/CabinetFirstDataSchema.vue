<template>
  <section class="schema">
    <CabinetFirstDataSchemaCompanies />

    <CabinetFirstDataSchemaBanner />

    <div class="schema__relative">
      <div class="arrow__container arrow__container--data">
        <CabinetFirstDataSchemaArrow class="arrow--data--left">
          Depersonalized date
        </CabinetFirstDataSchemaArrow>
        <CabinetFirstDataSchemaArrow
          class="arrow--data--right"
          reverse
        >
          Revenue share
        </CabinetFirstDataSchemaArrow>
      </div>

      <div class="arrow__container arrow__container--socials">
        <CabinetFirstDataSchemaArrow
          class="arrow--socials"
          reverse
        >
          Ad campaign management
        </CabinetFirstDataSchemaArrow>
      </div>

      <CabinetFirstDataSchemaVisa />

      <CabinetFirstDataSchemaSocials />
    </div>
  </section>
</template>

<script setup>
import CabinetFirstDataSchemaArrow from "./components/CabinetFirstDataSchemaArrow.vue";
import CabinetFirstDataSchemaBanner from "./components/CabinetFirstDataSchemaBanner.vue";
import CabinetFirstDataSchemaCompanies from "./components/CabinetFirstDataSchemaCompanies.vue";
import CabinetFirstDataSchemaSocials from "./components/CabinetFirstDataSchemaSocials.vue";
import CabinetFirstDataSchemaVisa from "./components/CabinetFirstDataSchemaVisa.vue";
</script>

<style scoped>
.schema {
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .schema {
    max-width: 704px;
    margin: 0 auto 60px;
  }
}

@media (min-width: 1340px) {
  .schema {
    max-width: none;
    margin-bottom: 80px;
  }
}

.schema__relative {
  position: relative;
}

@media (min-width: 768px) {
  .schema__relative {
    display: flex;
    align-items: center;
    padding-top: 140px;
  }
}

:deep(.schema__card) {
  position: relative;
  display: grid;
  grid-auto-rows: 80px;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-left: 0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 50px rgb(0 89 193 / 0.1);
  overflow: hidden;
}

@media (min-width: 768px) {
  :deep(.schema__card) {
    grid-auto-rows: 70px;
    grid-column-gap: 20px;
  }
}

@media (min-width: 1340px) {
  :deep(.schema__card) {
    grid-auto-rows: 100px;
  }
}

:deep(.arrow__container) {
  position: absolute;
  left: 50%;
  display: flex;
  justify-content: center;
  font-size: 10px;
  line-height: 1.2;
  color: var(--text-color-five);
  text-align: center;
  text-transform: uppercase;
}

@media (min-width: 768px) {
  :deep(.arrow__container) {
    font-size: 12px;
    line-height: 1.25;
  }
}

.arrow__container--data {
  top: 0;
  height: 392px;
}

@media (min-width: 768px) {
  .arrow__container--data {
    height: 172px;
  }
}

.arrow__container--socials {
  top: 0;
  height: 553px;
}

@media (min-width: 768px) {
  .arrow__container--socials {
    height: 172px;
  }
}

.arrow__container--socials :deep(.arrow__text) {
  top: 51%;
}

@media (min-width: 768px) {
  .arrow__container--socials :deep(.arrow__text) {
    top: 50%;
  }
}

.arrow--data--left {
  left: -15px;
}

@media (min-width: 768px) {
  .arrow--data--left {
    left: -120px;
  }
}

@media (min-width: 1340px) {
  .arrow--data--left {
    left: -90px;
  }
}

.arrow--data--left :deep(.arrow__text) {
  top: 69%;
}

@media (min-width: 768px) {
  .arrow--data--left :deep(.arrow__text) {
    top: 50%;
  }
}

.arrow--data--right {
  left: -105px;
}

@media (min-width: 768px) {
  .arrow--data--right {
    left: -10px;
  }
}

@media (min-width: 1340px) {
  .arrow--data--right {
    left: 30px;
  }
}

.arrow--data--right :deep(.arrow__text) {
  top: 31%;
}

@media (min-width: 768px) {
  .arrow--data--right :deep(.arrow__text) {
    top: 50%;
  }
}

.arrow--socials {
  left: 115px;
}

@media (min-width: 768px) {
  .arrow--socials {
    left: 234px;
  }
}

@media (min-width: 1340px) {
  .arrow--socials {
    left: 337px;
  }
}
</style>
