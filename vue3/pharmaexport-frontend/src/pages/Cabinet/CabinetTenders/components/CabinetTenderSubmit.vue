<template>
  <div class="tender-submit">
    <div>
      <p class="tender-submit__title">
        Submit an offer!
      </p>
      <p class="tender-submit__description">
        By clicking on the "Yalla!" button you will send an offer for tender
      </p>
    </div>

    <BaseButton
      class="tender-submit__button"
      :modifiers="['small', 'half-round', 'purple']"
    >
      Yalla!
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";
</script>

<style scoped>
.tender-submit {
  margin-bottom: 20px;
  padding-left: 76px;
  background-image: url("../assets/icons/find.svg");
  background-position: left top;
  background-size: 52px 52px;
  background-repeat: no-repeat;
}

@media (min-width: 450px) {
  .tender-submit {
    display: flex;
    align-items: center;
  }
}

@media (min-width: 768px) {
  .tender-submit {
    max-width: 576px;
    width: 100%;
    margin-bottom: 12px;
    padding: 20px 32px 20px 108px;
    border: 1px solid var(--border-color-primary);
    border-radius: 8px;
    background-color: #ffffff;
    background-position: left 32px center;
    box-shadow: 0 1px 16px rgb(0 42 81 / 0.06);
  }
}

@media (min-width: 1170px) {
  .tender-submit {
    display: block;
    order: 1;
    max-width: 296px;
    margin: 0 0 0 70px;
    padding: 0 0 0 76px;
    border: none;
    background-position: left top;
    box-shadow: none;
  }
}

.tender-submit__title {
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
}

.tender-submit__description {
  margin-bottom: 32px;
  font-size: 12px;
}

@media (min-width: 450px) {
  .tender-submit__description {
    margin-bottom: 0;
  }
}

@media (min-width: 1170px) {
  .tender-submit__description {
    margin-bottom: 20px;
  }
}

.tender-submit__button {
  width: calc(100% + 76px);
  margin-left: -76px;
}

@media (min-width: 450px) {
  .tender-submit__button {
    width: auto;
    margin-left: 24px;
    padding: 12px 50px;
  }
}

@media (min-width: 1170px) {
  .tender-submit__button {
    margin-left: 0;
    padding: 12px 24px;
  }
}
</style>
