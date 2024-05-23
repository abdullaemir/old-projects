<script setup>
const head = useLocaleHead({ addSeoAttributes: true });

useHead({
  htmlAttrs: {
    lang: head.value.htmlAttrs.lang,
  },
  titleTemplate: title => (title ? `${title} | Металлсервис` : "Металлсервис"),
});
</script>

<template>
  <div class="app">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </div>
</template>

<style lang="scss" scoped>
.app {
  background-color: $background-color-white;
  color: $text-color-black;
  font-family: $text-font-family;
  line-height: $text-line-height;

  @include text($size: "XXS");

  @include breakpoint($device: "tablet") {
    @include text($size: "S");
  }
}
</style>
