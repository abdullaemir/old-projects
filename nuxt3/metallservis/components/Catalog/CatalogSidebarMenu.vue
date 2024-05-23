<template>
  <nav class="menu">
    <app-link
      v-for="(menuItem, menuItemIndex) in menu"
      :class="['menu__link', { active: menuItemIndex === itemActive }]"
      :to="menuItem.link"
      @mouseenter="$emit('change-submenu', menuItemIndex)"
    >
      <app-image
        class="menu__link__image"
        image="catalog/express.png"
      />

      <span class="menu__link__title">
        <app-image
          v-if="menuItem.icon"
          class="menu__link__title-icon"
          :image="menuItem.icon"
        />
        {{ menuItem.title }}
      </span>
    </app-link>
  </nav>
</template>

<script setup>
defineProps({
  menu: {
    type: Array,
    default: [],
  },
  itemActive: {
    type: Number,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.menu {
  display: grid;
  align-items: start;
  grid-gap: 24px 10px;
  grid-template-columns: repeat(auto-fill, 105px);

  @include desktop() {
    grid-row-gap: 4px;
    grid-template-columns: none;
  }

  &__link {
    display: grid;

    // TODO: Текст
    font-weight: 500;
    grid-row-gap: 8px;
    letter-spacing: -0.7px;
    line-height: 100%;

    @include desktop() {
      padding: 6px 8px;
      border-radius: 12px;

      // TODO: Текст
      font-weight: 400;
      letter-spacing: -0.42px;
    }

    &.active {
      @include desktop() {
        background-color: $background-color-gray;
      }
    }

    &__image {
      width: 105px;
      height: 105px;
      border-radius: 12px;
      object-fit: cover;

      @include desktop() {
        display: none;
      }
    }

    &__title {
      word-break: break-word;

      @include desktop() {
        position: relative;
      }

      &::after {
        content: "\00a0\203a";

        @include desktop() {
          content: none;
        }
      }

      &-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin: 0 -2px 0 0;
        vertical-align: bottom;

        @include desktop() {
          position: absolute;
          right: calc(100% + 8px);
          width: 24px;
          height: 24px;
          margin: 0;
        }
      }
    }
  }
}
</style>
