<template>
  <div class="form__row">
    <slot />
  </div>
</template>

<style scoped>
.form__row {
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 20px;
  width: 100%;
}

@media (min-width: 768px) {
  .form__row {
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    grid-column-gap: 20px;
    align-items: flex-start;
  }
}

.form__row:not(:last-of-type) {
  margin-bottom: 24px;
}
</style>
