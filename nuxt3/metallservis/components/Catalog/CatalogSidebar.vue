<template>
  <aside class="sidebar">
    <app-button
      v-if="isButtonVisible"
      :class="['text-M sidebar__button', { active: isSubmenuVisible }]"
      @click="$emit('open-submenu')"
    >
      <span class="sidebar__button__icon" />
      Каталог
    </app-button>

    <slot />
  </aside>
</template>

<script setup>
defineProps({
  isButtonVisible: {
    type: Boolean,
    default: true,
  },
  isSubmenuVisible: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  &__button {
    $button: &;
    display: none;

    @include desktop() {
      display: grid;
      align-items: center;
      padding: 6px 16px;
      border-radius: 12px;
      margin-bottom: 24px;

      // TODO: Текст
      font-weight: 500;
      grid-auto-flow: column;
      grid-column-gap: 8px;

      @include border();
    }

    &.active {
      @include desktop() {
        background-color: $background-color-gray;
      }
    }

    &__icon {
      @include desktop() {
        position: relative;
        width: 24px;
        height: 11px;
      }

      &::before,
      &::after {
        @include desktop() {
          position: absolute;
          width: 100%;
          height: 3px;
          background-color: $black;
          content: "";
          inset: auto 0;
          transition-delay: $transition-duration, $transition-duration, 0s;

          @include transition(
            $property: (
              top,
              bottom,
              transform,
            )
          );
        }
      }

      &::before {
        @include desktop() {
          top: 0;
        }
      }

      &::after {
        @include desktop() {
          bottom: 0;
        }
      }

      #{$button}.active &::before,
      #{$button}.active &::after {
        @include desktop() {
          transition-delay: 0s, 0s, $transition-duration;
        }
      }

      #{$button}.active &::before {
        @include desktop() {
          top: 4px;
          transform: rotate(45deg);
        }
      }

      #{$button}.active &::after {
        @include desktop() {
          bottom: 4px;
          transform: rotate(-45deg);
        }
      }
    }
  }
}
</style>
