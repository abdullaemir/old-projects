<script setup>
const regions = [
  {
    cities: [
      {
        name: "Москва",
        link: "#",
      },
      {
        name: "Санкт-Петербург",
        link: "#",
      },
    ],
  },
  {
    title: "Черноземье",
    cities: [
      {
        name: "Брянск",
        link: "#",
      },
      {
        name: "Курск",
        link: "#",
      },
      {
        name: "Белгород",
        link: "#",
      },
    ],
  },
  {
    title: "Поволжье",
    cities: [
      {
        name: "Нижний Новгород",
        link: "#",
      },
      {
        name: "Самара",
        link: "#",
      },
      {
        name: "Пенза",
        link: "#",
      },
      {
        name: "Балаково",
        link: "#",
      },
    ],
  },
  {
    title: "Казахстан",
  },
  {
    title: "Сибирь",
    cities: [
      {
        name: "Новосибирск",
        link: "#",
      },
      {
        name: "Барнаул",
        link: "#",
      },
    ],
  },
  {
    title: "Юг",
    cities: [
      {
        name: "Краснодар",
        link: "#",
      },
      {
        name: "Ростов-на-Дону",
        link: "#",
      },
      {
        name: "Таганрог",
        link: "#",
      },
    ],
  },
  {
    title: "Урал",
    cities: [
      {
        name: "Екатеринбург",
        link: "#",
      },
      {
        name: "Пермь",
        link: "#",
      },
      {
        name: "Челябинск",
        link: "#",
      },
      {
        name: "Уфа",
        link: "#",
      },
    ],
  },
];

defineProps({
  location: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <app-popup class="header-location-popup">
    <app-button
      class="header-location-popup__button"
      @click="$emit('toggle-visibility')"
    />

    <nav class="header-location-popup__navigation">
      <section
        v-for="region in regions"
        class="header-location-popup__navigation__section"
      >
        <span
          v-if="region.title"
          class="header-location-popup__navigation__title"
        >
          {{ region.title }}
        </span>

        <app-button
          v-for="city in region.cities"
          class="header-location-popup__navigation__button"
          is-interactive
          :disabled="city.name === location"
          @click="$emit('change-location', city.name)"
        >
          {{ city.name }}
        </app-button>
      </section>
    </nav>
  </app-popup>
</template>

<style lang="scss" scoped>
.header-location-popup {
  position: relative;
  padding: 69px 32px 44px;

  @include breakpoint($device: "laptop", $mobile-first: false) {
    border: none;
    box-shadow: none;
  }

  @include breakpoint($device: "laptop") {
    padding: 16px 24px 40px;
  }

  &__button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 44px;
    height: 44px;
    background-image: url("~/assets/images/icons/cross.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    @include breakpoint($device: "laptop") {
      display: none;
    }
  }

  &__navigation {
    display: grid;
    max-height: 60vh;
    margin-right: 2.5px;
    grid-row-gap: 16px;
    overflow-y: auto;

    @include breakpoint($device: "laptop") {
      display: block;
      max-height: none;
      margin: -16px 0 0;
      column-count: 2;
      column-gap: 24px;
    }

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 4px;
      background-color: #d9d9d9;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #808080;
    }

    &__section {
      display: inline-grid;
      grid-row-gap: 4px;

      @include breakpoint($device: "laptop") {
        width: 272px;
        margin-top: 16px;
      }
    }

    &__title {
      padding: 6px 8px;

      @include text($size: "L", $font-weight: 500);
    }

    &__button {
      padding: 6px 8px;
      text-align: left;

      @include text($size: "M");
    }
  }
}
</style>
