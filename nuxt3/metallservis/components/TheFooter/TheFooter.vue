<template>
  <footer class="footer">
    <app-container>
      <the-footer-menu class="footer__menu" />

      <the-footer-copyright class="footer__copyright" />
    </app-container>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  $footer: &;

  padding-bottom: 32px;

  @include breakpoint($device: "desktop") {
    padding: 64px 0 128px;
  }

  &__menu {
    // ...
  }

  &__copyright {
    margin-top: 64px;

    @include breakpoint($device: "desktop") {
      margin-top: 0;
      pointer-events: none;
      text-align: right;
      transform: translateY(-100%);
    }
  }
}
</style>
