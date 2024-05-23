<template>
  <!-- TODO: Добавить интерактив -->
  <header class="header">
    <app-container class="header__container">
      <the-header-logo class="header__logo u-fit-content" />
      <the-header-location class="header__location" />

      <div class="header__row">
        <the-header-search
          class="header__search"
          modifier="gray"
        />
        <the-header-tools class="header__tools" />
      </div>

      <the-header-menu class="header__menu" />
    </app-container>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding: 8px 0;

  @include breakpoint($device: "tablet") {
    padding: 16px 0;
  }

  &__container {
    display: grid;
    align-items: center;
    grid-template-areas:
      "logo location"
      "row row";

    @include breakpoint($device: "desktop") {
      justify-content: space-between;
      grid-row-gap: 48px;
      grid-template-areas:
        "location menu"
        "logo row";
      grid-template-columns: 192px auto;
    }
  }

  &__logo {
    grid-area: logo;
  }

  &__location {
    grid-area: location;
  }

  &__row {
    margin-top: 24px;
    grid-area: row;

    @include breakpoint($device: "tablet") {
      display: grid;
      align-items: center;
      grid-column-gap: 24px;
      grid-template-columns: 1fr auto;
    }

    @include breakpoint($device: "laptop") {
      grid-column-gap: 56px;
    }

    @include breakpoint($device: "desktop") {
      margin-top: 0;
    }
  }

  &__search {
    @include breakpoint($device: "desktop") {
      width: 882px;
    }
  }

  &__tools {
    @include breakpoint($device: "tablet", $mobile-first: false) {
      display: none;
    }
  }

  &__menu {
    @include breakpoint($device: "desktop", $mobile-first: false) {
      display: none;
    }

    @include breakpoint($device: "desktop") {
      grid-area: menu;
    }
  }
}
</style>
