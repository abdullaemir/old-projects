<template>
  <header class="header">
    <div class="container header__container">
      <TheHeaderHamburger
        :is-menu-visible="isMenuVisible"
        @click="toggleMenuVisibility"
      />

      <TheHeaderLogo class="header__logo" />

      <TheHeaderMenu
        :is-visible="isMenuVisible"
        @close-menu="toggleMenuVisibility"
      />

      <BaseButton
        class="header__button--enquiry"
        :modifiers="['small', 'square', 'purple']"
        @click="useModal.openModal('enquiry', $event)"
      >
        Submit trade enquiry
      </BaseButton>

      <RouterLink
        v-if="user.id"
        class="header__button--cabinet"
        :to="{ name: 'cabinetProfile' }"
      >
        <img
          alt="User cabinet"
          aria-hidden="true"
          height="24"
          src="/src/assets/icons/user.svg"
          width="24"
        />
      </RouterLink>

      <BaseButton
        v-else
        class="header__button--login"
        :modifiers="['small', 'square', 'gray']"
        @click="useModal.openModal('login', $event)"
      >
        <img
          alt="Login"
          aria-hidden="true"
          height="24"
          src="/src/assets/icons/login.svg"
          width="23"
        />
        Sign in
      </BaseButton>
    </div>
  </header>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { RouterLink } from "vue-router";

import BaseButton from "~/components/base/BaseButton.vue";
import { useModal } from "~/components/base/BaseModal.vue";
import useUserStore from "~/stores/user.js";

import TheHeaderHamburger from "./components/DefaultLayoutHeaderHamburger.vue";
import TheHeaderLogo from "./components/DefaultLayoutHeaderLogo.vue";
import TheHeaderMenu from "./components/DefaultLayoutHeaderMenu.vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const isMenuVisible = ref(false);

const changeDocumentScroll = (state) => {
  const { documentElement } = document;

  documentElement.style.marginRight = state ? `${window.innerWidth - documentElement.clientWidth}px` : null;
  documentElement.style.overflowY = state ? "hidden" : null;
};

const toggleMenuVisibility = () => {
  isMenuVisible.value = !isMenuVisible.value;

  changeDocumentScroll(isMenuVisible.value);
};
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-index-header);
  padding: 20px 0;
  border-bottom: 1px solid var(--border-color-primary);
  background-color: #ffffff;
}

@media (min-width: 1170px) {
  .header {
    padding: 12px 0;
  }
}

.header__container {
  display: flex;
  align-items: center;
}

.header__logo {
  margin-right: auto;
}

.header__button--enquiry {
  display: none;
}

@media (min-width: 768px) {
  .header__button--enquiry {
    display: inline-block;
    width: auto;
  }
}

@media (min-width: 1170px) {
  .header__button--enquiry {
    margin-left: 32px;
  }
}

.header__button--login {
  width: auto;
}

@media (min-width: 768px) {
  .header__button--login {
    margin-left: 16px;
  }
}

@media (min-width: 1170px) {
  .header__button--login {
    display: none;
  }
}

.header__button--cabinet {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-right: -8px;
  line-height: 0;
}

@media (min-width: 768px) {
  .header__button--cabinet {
    margin-left: 8px;
  }
}
</style>
