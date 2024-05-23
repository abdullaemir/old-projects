<template>
  <div class="popup">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.popup {
  z-index: $z-index-popup;
  border-radius: $popup-border-radius;
  background-color: $popup-background-color;
  box-shadow: $popup-box-shadow;

  @include border($width: $popup-border-width);
}
</style>
