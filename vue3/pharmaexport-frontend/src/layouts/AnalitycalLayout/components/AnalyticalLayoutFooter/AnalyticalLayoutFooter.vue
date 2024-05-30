<template>
  <footer class="footer">
    <div class="container footer__container">
      <div>
        <AnalyticalLayoutFooterLogo />
        <AnalyticalLayoutFooterCopyright />
      </div>

      <AnalyticalLayoutFooterMenu />
    </div>
  </footer>
</template>

<script setup>
import AnalyticalLayoutFooterLogo from "./components/AnalyticalLayoutFooterLogo.vue";
import AnalyticalLayoutFooterCopyright from "./components/AnalyticalLayoutFooterCopyright.vue";
import AnalyticalLayoutFooterMenu from "./components/AnalyticalLayoutFooterMenu.vue";
</script>

<style scoped>
.footer {
  padding: 40px 0;
  background-color: #04202f;
}

@media (min-width: 768px) {
  .footer__container {
    display: flex;
    align-items: flex-start;
  }
}
</style>
