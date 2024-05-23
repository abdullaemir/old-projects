<script setup>
const menu = [
  {
    name: "О компании",
    link: "#",
    popupMenu: [
      {
        name: "Основная деятельность",
        link: "#",
      },
      {
        name: "История",
        link: "#",
      },
      {
        name: "Партнерам",
        link: "#",
      },
    ],
  },
  {
    name: "Контакты",
    link: "#",
  },
  {
    name: "Производство",
    link: "#",
  },
  {
    name: "Карьера",
    link: "#",
  },
  {
    name: "Доставка",
    link: "#",
  },
  {
    name: "Услуги и сервис",
    link: "#",
  },
];
</script>

<template>
  <nav class="header-menu">
    <app-button class="header-menu__button">Каталог</app-button>

    <div
      v-for="item in menu"
      :class="['header-menu__item', { 'non-empty': item.popupMenu }]"
    >
      <!-- TODO: Реализовать эффект при наведении (<= Desktop && popupMenu) -->
      <app-link
        class="header-menu__item__link"
        :to="item.link"
        :is-interactive="!Boolean(item.popupMenu)"
      >
        {{ item.name }}
      </app-link>

      <the-header-menu-popup
        v-if="item.popupMenu"
        class="header-menu__item__popup"
        :menu="item.popupMenu"
      />
    </div>

    <language-switcher class="header-menu__language-switcher" />
  </nav>
</template>

<style lang="scss" scoped>
.header-menu {
  display: grid;
  justify-content: start;
  grid-auto-flow: column;
  grid-column-gap: 16px;

  @include breakpoint($device: "desktop") {
    justify-content: end;
    grid-column-gap: 32px;
  }

  &__button {
    @include breakpoint($device: "laptop") {
      display: none;
    }
  }

  &__item {
    &.non-empty {
      @include breakpoint($device: "desktop") {
        position: relative;
        z-index: 0;
        display: grid;
        align-items: center;
        cursor: pointer;
        grid-auto-flow: column;
        grid-column-gap: 4px;
      }

      &::before {
        @include breakpoint($device: "desktop") {
          position: absolute;
          z-index: -1;
          border-radius: 8px;
          content: "";
          inset: -6px -8px;

          @include transition($property: background-color);
        }
      }

      @include hover() {
        &::before {
          @include breakpoint($device: "desktop") {
            background-color: $background-color-gray;
          }
        }
      }

      &::after {
        @include breakpoint($device: "desktop") {
          width: 16px;
          height: 16px;
          background-image: url("~/assets/images/icons/cap.svg");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          content: "";

          @include transition($property: transform);
        }
      }

      @include hover() {
        &::after {
          @include breakpoint($device: "desktop") {
            transform: scale(1, -1) translateY(-2px);
          }
        }
      }
    }

    &__link {
      white-space: nowrap;
    }

    &__popup {
      @include breakpoint($device: "desktop", $mobile-first: false) {
        display: none;
      }

      @include breakpoint($device: "desktop") {
        position: absolute;
        top: calc(100% + 16px);
        left: -16px;
        cursor: default;
        opacity: 0;
        pointer-events: none;

        @include transition($property: opacity);
      }

      &::before {
        position: absolute;
        height: 20px;
        content: "";
        inset: auto 0 100%;
      }
    }
  }

  &__popup:hover,
  &__item.non-empty:hover &__item__popup {
    @media (any-pointer: fine) {
      opacity: 1;
      pointer-events: all;
    }
  }

  &__language-switcher {
    @include breakpoint($device: "desktop", $mobile-first: false) {
      display: none;
    }
  }
}
</style>
