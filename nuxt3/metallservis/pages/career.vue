<template>
  <app-page class="career">
    <app-title
      class="career__title"
      size="small"
      tag="h1"
    >
      {{ title }}
    </app-title>

    <app-tabs class="career__tabs">
      <app-tab name="Работа в компании">
        <career-about />
      </app-tab>

      <app-tab name="Вакансии">
        <career-vacancies />
      </app-tab>
    </app-tabs>
  </app-page>
</template>

<script setup>
const title = "Карьера";

useHead({
  title: title,
});
</script>

<style lang="scss" scoped>
.career {
  // padding-top: 24px;
  // padding-bottom: 48px;

  // @include laptop() {
  //   padding-bottom: 32px;
  // }

  // &__title {
  //   @include textQ($size: "large", $font-size: 22px);
  // }

  // &__tabs {
  //   margin-top: 24px;
  // }
}
</style>
