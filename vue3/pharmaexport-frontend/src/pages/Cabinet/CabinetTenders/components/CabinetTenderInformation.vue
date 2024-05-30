<template>
  <div class="information">
    <p class="information__title">
      Tender number information
    </p>

    <dl class="information__row">
      <dd class="information__number">
        № {{ number }}
      </dd>
      <dd class="information__sum">
        $ 12 000
      </dd>

      <dt class="information__caption information__number">
        Tender number
      </dt>
      <dt class="information__caption information__sum">
        Total sum
      </dt>
    </dl>

    <CabinetDivider class="information__divider" />

    <dl class="information__list">
      <template
        v-for="(feature, index) in features"
        :key="index"
      >
        <dt class="information__name">
          {{ feature.name }}
        </dt>
        <dd class="information__value">
          {{ feature.value }}
        </dd>
      </template>
    </dl>
  </div>
</template>

<script setup>
import CabinetDivider from "../../components/CabinetDivider.vue";

defineProps({
  features: {
    required: true,
    type: Array,
  },
  number: {
    required: true,
    type: [
      String,
      Number,
    ],
  },
});
</script>

<style scoped>
.information {
  margin: 0 -16px 28px;
  padding: 20px 16px;
  color: var(--text-color-five);
  background-color: #f6f7fb;
}

@media (min-width: 768px) {
  .information {
    max-width: 576px;
    width: 100%;
    margin: 0 0 28px;
    padding: 20px 32px;
    border-radius: 8px;
  }
}

.information__title {
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .information__title {
    margin-bottom: 16px;
  }
}

.information__row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 12px;
  margin: 0 0 24px;
  font-weight: 300;
  font-size: 22px;
  line-height: 1.75;
}

@media (min-width: 768px) {
  .information__row {
    margin-bottom: 16px;
    font-size: 26px;
  }
}

.information__number {
  margin-left: 0;
}

.information__sum {
  margin-left: 0;
  text-align: right;
}

.information__caption {
  display: block;
  font-weight: 700;
  font-size: 10px;
  line-height: 1;
  text-transform: uppercase;
}

.information__divider {
  background-color: rgb(100 124 159 / 0.2);
}

@media (min-width: 768px) {
  .information__divider {
    margin-bottom: 16px;
  }
}

.information__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 12px;
  margin: 0;
  padding-left: 0;
  font-size: 12px;
}

@media (min-width: 768px) {
  .information__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    columns: 2;
    column-rule: 1px solid rgb(100 124 159 / 0.2);
    grid-column-gap: 40px;
    background-image: linear-gradient(rgb(100 124 159 / 0.2), rgb(100 124 159 / 0.2));
    background-position: center;
    background-size: 1px 100%;
    background-repeat: no-repeat;
  }
}

.information__name {
  opacity: 0.5;
}

.information__value {
  margin-left: 0;
  text-align: right;
}
</style>
