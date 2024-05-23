<script setup>
defineProps({
  menu: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <app-popup class="header-menu-popup">
    <app-link
      v-for="item in menu"
      class="header-menu-popup__link"
      :to="item.link"
    >
      {{ item.name }}
    </app-link>
  </app-popup>
</template>

<style lang="scss" scoped>
.header-menu-popup {
  display: grid;
  padding: 16px 24px;
  grid-row-gap: 16px;

  &__link {
    min-width: 272px;
  }
}
</style>
