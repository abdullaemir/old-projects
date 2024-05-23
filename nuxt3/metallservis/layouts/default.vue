<template>
  <div class="layout">
    <the-header />

    <slot />

    <the-footer />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
}
</style>
