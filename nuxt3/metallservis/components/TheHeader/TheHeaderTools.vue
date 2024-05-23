<script setup>
const tools = [
  {
    icon: "cart",
    link: "#",
    description: "Корзина",
  },
  {
    icon: "profile",
    link: "#",
    description: "Личный кабинет",
  },
];
</script>

<template>
  <nav class="header-tools">
    <app-link
      v-for="tool in tools"
      class="header-tools__link"
      :to="tool.link"
      :aria-label="tool.description"
    >
      <app-image
        class="header-tools__link__icon"
        :image="`icons/${tool.icon}.svg`"
      />
    </app-link>
  </nav>
</template>

<style lang="scss" scoped>
.header-tools {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 24px;

  @include breakpoint($device: "laptop") {
    grid-column-gap: 48px;
  }

  &__link {
    &__icon {
      width: 44px;
      max-width: none;
      height: 44px;
    }
  }
}
</style>
