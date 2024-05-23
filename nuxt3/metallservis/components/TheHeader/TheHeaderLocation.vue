<script setup>
const button = ref(null);
const popup = ref(null);

onClickOutside(popup, event => {
  if (event.target !== button.value.$el) {
    togglePopupVisibility();
  }
});

const isLaptop = useMediaQuery("(min-width: 1024px)");
const isPopupVisible = ref(false);

const togglePopupVisibility = () => {
  isPopupVisible.value = !isPopupVisible.value;

  if (!isLaptop.value) {
    scrollbar.toggleAccess(!isPopupVisible.value);
  }
};

const capital = "Москва"; // TODO: Уточнить, что означает звёздочка рядом с городом
const location = ref(capital);

const changeLocation = city => {
  location.value = city;
  togglePopupVisibility();
};
</script>

<template>
  <div class="header-location">
    <app-button
      ref="button"
      :class="['header-location__button u-fit-content', { active: isPopupVisible }]"
      @click="togglePopupVisibility()"
    >
      <span
        v-if="location === capital"
        class="header-location__button__star"
      >
        &#9733;
      </span>
      {{ location }}
    </app-button>

    <app-link
      class="header-location__link"
      to="tel:+78005551155"
    >
      8&nbsp;800&nbsp;555&#8209;11&#8209;55
    </app-link>

    <transition>
      <app-overlay
        v-if="isPopupVisible"
        class="header-location__overlay"
      >
        <the-header-location-popup
          ref="popup"
          class="header-location__popup"
          :location="location"
          @toggle-visibility="togglePopupVisibility()"
          @change-location="changeLocation($event)"
        />
      </app-overlay>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.header-location {
  display: grid;
  justify-content: end;
  grid-row-gap: 8px;

  @include breakpoint($device: "tablet") {
    position: relative;
    align-items: center;
    grid-auto-flow: column;
    grid-column-gap: 24px;
  }

  @include breakpoint($device: "desktop") {
    justify-content: start;
  }

  &__button {
    $button: &;

    display: grid;
    justify-content: start;
    grid-auto-flow: column;
    grid-column-gap: 4px;
    white-space: nowrap;

    @include breakpoint($device: "laptop") {
      padding: 6px 8px;
      border-radius: 8px;
    }

    &.active {
      @include breakpoint($device: "laptop") {
        background-color: $background-color-gray;
      }
    }

    &__star {
      pointer-events: none;

      @include breakpoint($device: "laptop") {
        @include transition($property: color);
      }

      #{$button}.active > & {
        @include breakpoint($device: "laptop") {
          color: $red;
        }
      }
    }
  }

  &__link {
    // ...
  }

  &__overlay {
    @include breakpoint($device: "laptop") {
      position: absolute;
      padding: 0;
      background-color: transparent;
      inset: auto 0 0 auto;
      overflow-y: visible;
    }

    @include breakpoint($device: "desktop") {
      left: 0;
    }
  }

  &__popup {
    @include breakpoint($device: "laptop") {
      position: absolute;
      top: calc(100% + 11px);
      right: 0;
    }

    @include breakpoint($device: "desktop") {
      right: auto;
      left: -24px;
    }
  }
}
</style>
