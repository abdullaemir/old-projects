<template>
  <div class="information">
    <TheFooterInformationMenu class="information__menu" />
    <TheFooterInformationContacts class="information__contacts" />
  </div>
</template>

<script setup>
import TheFooterInformationContacts from "./components/DefaultLayoutFooterInformationContacts.vue";
import TheFooterInformationMenu from "./components/DefaultLayoutFooterInformationMenu.vue";
</script>

<style scoped>
.information {
  padding: 50px 0;
  border-bottom: 1px solid rgb(174 197 215 / 0.2);
}

@media (min-width: 1000px) {
  .information {
    display: flex;
    justify-content: space-between;
    padding: 80px 0;
  }
}

@media (min-width: 1000px) {
  .information__menu {
    width: 40%;
  }
}

@media (min-width: 1000px) {
  .information__contacts {
    width: 50%;
  }
}
</style>
