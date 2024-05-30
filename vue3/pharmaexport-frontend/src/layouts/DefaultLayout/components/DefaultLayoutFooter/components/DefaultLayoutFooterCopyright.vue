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
  display: flex;
  justify-content: space-between;
  padding: 32px 0;
  font-size: 12px;
}
</style>
