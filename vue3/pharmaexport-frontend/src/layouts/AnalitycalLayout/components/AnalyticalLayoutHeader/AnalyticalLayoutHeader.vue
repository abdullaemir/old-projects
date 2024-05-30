<template>
  <header :class="['header', { 'white': y > 0 || useModal.isModalOpen() }]">
    <div class="container header__container">
      <AnalyticalLayoutHeaderHamburger
        :is-black="y > 0 || !isMenuAnimationFinished || Boolean(useModal.isModalOpen())"
        :is-menu-visible="isMenuVisible"
        @click="toggleMenuVisibility"
      />

      <AnalyticalLayoutHeaderLogo
        :is-colored="y > 0 || !isMenuAnimationFinished || isMenuVisible || Boolean(useModal.isModalOpen())"
      />

      <AnalyticalLayoutHeaderMenu
        :is-visible="isMenuVisible"
        @close-menu="toggleMenuVisibility"
        @finish-animation="isMenuAnimationFinished = true"
      />
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useWindowScroll } from '@vueuse/core';

import { useModal } from "~/components/base/BaseModal.vue";

import AnalyticalLayoutHeaderHamburger from "./components/AnalyticalLayoutHeaderHamburger.vue";
import AnalyticalLayoutHeaderLogo from "./components/AnalyticalLayoutHeaderLogo.vue";
import AnalyticalLayoutHeaderMenu from "./components/AnalyticalLayoutHeaderMenu.vue";

const { x, y } = useWindowScroll();

const isMenuVisible = ref(false);
const isMenuAnimationFinished = ref(true);

const changeDocumentScroll = (state) => {
  const { documentElement } = document;

  documentElement.style.marginRight = state ? `${window.innerWidth - documentElement.clientWidth}px` : null;
  documentElement.style.overflowY = state ? "hidden" : null;
};

const toggleMenuVisibility = () => {
  isMenuVisible.value = !isMenuVisible.value;

  if (isMenuVisible.value) {
    isMenuAnimationFinished.value = false;
  }

  changeDocumentScroll(isMenuVisible.value);
};
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-index-header);
  margin-bottom: -66px;
  padding: 12px 0;
  border-bottom: 1px solid transparent;
  background-color: rgba(255, 255, 255, 0.05);
  transition-property: border-color, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .header {
    margin-bottom: -74px;
    padding: 16px 0;
  }
}

@media (min-width: 1170px) {
  .header {
    margin-bottom: -82px;
    padding: 24px 0;
  }
}

.header.white {
  border-color: #e7f0fe;
  background-color: #ffffff;
}

.header__container {
  display: flex;
  align-items: center;
}
</style>

