<template>
  <footer class="footer">
    <div class="container">
      <TheFooterInformation />
      <TheFooterCopyright />
    </div>
  </footer>
</template>

<script setup>
import TheFooterCopyright from "./components/DefaultLayoutFooterCopyright.vue";
import TheFooterInformation from "./components/DefaultLayoutFooterInformation/DefaultLayoutFooterInformation.vue";
</script>

<style scoped>
.footer {
  font-weight: 400;
  color: #889097;
  background-color: #04202f;
}
</style>
