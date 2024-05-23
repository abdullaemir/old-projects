<script setup>
defineProps({
  modifier: {
    type: String,
    default: "white",
  },
});
</script>

<template>
  <input
    :class="['header-search', modifier]"
    type="search"
    placeholder="Поиск"
    aria-label="Поиск"
  />
</template>

<style lang="scss" scoped>
.header-search {
  width: 100%;
  height: 44px;
  padding: 10px 10px 10px 42px;
  border-radius: 12px;
  background-image: url("~/assets/images/icons/magnifier.svg");
  background-position: left 8px center;
  background-repeat: no-repeat;
  background-size: 32px;
  outline: none;

  @include border();

  @include text($size: "M");

  @include transition($property: border-color);

  @include breakpoint($device: "tablet", $mobile-first: false) {
    font-size: 16px;
  }

  @include breakpoint($device: "tablet") {
    height: 56px;
    padding: 16px 16px 16px 64px;
    background-size: 44px;
  }

  &:focus {
    border-color: $black;
  }

  &.white {
    background-color: $background-color-white;
  }

  &.gray {
    background-color: $background-color-gray;
  }

  &::placeholder {
    color: $text-color-gray;
  }

  // Internet Explorer
  &::-ms-clear,
  &::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }

  // Chrome
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
}
</style>
