<script setup>
const { locale, locales, setLocale } = useI18n();

defineProps({
  isButtonStatic: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="language-switcher">
    <app-button
      v-for="language in locales"
      class="language-switcher__button"
      :is-static="isButtonStatic"
      :disabled="language.code === locale"
      @click="setLocale(language.code)"
    >
      {{ language.name.substring(0, 2) }}
    </app-button>
  </div>
</template>

<style lang="scss" scoped>
.language-switcher {
  display: grid;
  justify-content: start;
  grid-auto-flow: column;
  grid-column-gap: 40px;

  @include desktop() {
    grid-column-gap: 16px;
  }

  &__button {
    padding: 11px 7px;
    border-radius: 4px;
    background-color: $background-color-gray;
    text-transform: uppercase;

    @include desktop() {
      padding: 0;
      border-radius: 0;
      background-color: transparent;
    }

    &:disabled {
      background-color: transparent;
    }
  }
}
</style>
