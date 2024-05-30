<template>
  <div class="copyright">
    <span>&copy; 2008 &mdash; {{ UseDate.getYear() }}</span>
    <span>Pharma Global, Inc</span>
  </div>
</template>

<script setup>
import { UseDate } from "@pg/helpers";
</script>

<style scoped>
.copyright {
  display: grid;
  grid-row-gap: 16px;
  margin-bottom: 40px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
}

@media (min-width: 768px) {
  .copyright {
    color: rgba(255, 255, 255, 0.3);
  }
}
</style>
