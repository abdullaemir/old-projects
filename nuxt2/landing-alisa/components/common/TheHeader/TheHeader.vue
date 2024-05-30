<template>
  <header class="header">
    <TheHeaderTitle />
    <TheHeaderNavigation />
    <TheHeaderAddress />
    <BaseButton
      class="header__button"
      bordered
      @click="switchModalFormVisibility(true)"
    >
      Оставить заявку
    </BaseButton>
    <TheHeaderSocial />
  </header>
</template>

<script>
import { mapMutations } from "vuex";

import BaseButton from "~/components/base/BaseButton.vue";

import TheHeaderTitle from "./TheHeaderTitle.vue";
import TheHeaderNavigation from "./TheHeaderNavigation.vue";
import TheHeaderAddress from "./TheHeaderAddress.vue";
import TheHeaderSocial from "./TheHeaderSocial.vue";

export default {
  name: "TheHeader",
  components: {
    BaseButton,
    TheHeaderTitle,
    TheHeaderAddress,
    TheHeaderNavigation,
    TheHeaderSocial,
  },
  methods: {
    ...mapMutations({
      switchModalFormVisibility: "modalForm/switchModalFormVisibility",
    }),
  },
};
</script>

<style scoped>
.header {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 34px 20px 0;
}

@media (min-width: 768px) {
  .header {
    padding: 34px 34px 0;
  }
}

@media (min-width: 1024px) {
  .header {
    position: fixed;
    flex-direction: column;
    align-items: flex-start;
    max-width: 272px;
    height: 100%;
    padding: 48px 31px 69px 27px;
    background-color: var(--background-color-secondary);
  }
}

@media (min-width: 1280px) {
  .header {
    max-width: 305px;
    padding: 48px 31px 69px 60px;
  }
}

@media (min-width: 1920px) {
  .header {
    max-width: 355px;
    padding: 48px 55px 122px 61px;
  }
}

.header__button {
  max-width: 149px;
}

@media (min-width: 768px) {
  .header__button {
    max-width: 219px;
  }
}

@media (min-width: 1024px) {
  .header__button {
    max-width: none;
    margin-bottom: 25px;
  }
}

@media (min-width: 1920px) {
  .header__button {
    margin-bottom: 47px;
  }
}
</style>
