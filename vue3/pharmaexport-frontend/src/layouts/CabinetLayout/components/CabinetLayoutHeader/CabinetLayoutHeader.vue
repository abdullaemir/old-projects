<template>
  <header class="header">
    <CabinetLayoutHeaderHamburger
      :is-menu-visible="isMenuVisible"
      @click="toggleMenuVisibility"
    />

    <CabinetLayoutHeaderLogo class="header__logo" />

    <CabinetLayoutHeaderMenu
      :is-menu-visible="isMenuVisible"
      @close-menu="toggleMenuVisibility"
      @open-page="openPage"
    />

    <BaseButton
      v-if="!useCheckAccess('MY_PROFILE_CHANGE_EMAIL')"
      class="header__button--email-confirm"
      :disabled="isLoading"
      :modifiers="['small', 'square', 'blue']"
      @click="sendConfirmEmail"
    >
      Send confirm email
    </BaseButton>

    <div class="header-user__buttons">
<!--      <BaseButton-->
<!--        class="header__button&#45;&#45;notifications active"-->
<!--        @click="openNotifications"-->
<!--      >-->
<!--        <img-->
<!--          alt=""-->
<!--          aria-hidden="true"-->
<!--          class="notifications__icon"-->
<!--          height="24"-->
<!--          src="/src/assets/icons/bell.svg"-->
<!--          width="24"-->
<!--        />-->
<!--      </BaseButton>-->

<!--&lt;!&ndash;      <CabinetLayoutHeaderNotifications&ndash;&gt;-->
<!--&lt;!&ndash;        :isNotificationVisible="isNotificationVisible"&ndash;&gt;-->
<!--&lt;!&ndash;        @close-notifications="closeNotifications"&ndash;&gt;-->
<!--&lt;!&ndash;      />&ndash;&gt;-->

      <BaseButton
        aria-controls="cabinet-menu-user"
        :aria-expanded="useDropdown.isDropdownOpen('cabinet-menu-user-wrapper')"
        :aria-label="useDropdown.isDropdownOpen('cabinet-menu-user-wrapper') ? 'Close user menu' : 'Open user menu'"
        class="header__button--cabinet"
        @mouseenter.prevent="openMenu($event)"
        @touchstart.prevent="openMenu($event)"
      >
        <img
          alt=""
          aria-hidden="true"
          height="24"
          src="/src/assets/icons/user.svg"
          width="24"
        />
      </BaseButton>

      <CabinetLayoutHeaderMenuUser
        @mouseleave="useDropdown.closeDropdown()"
        @open-page="openPage"
      />
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import Auth from "~/api/rest/Auth.js";
import useCheckAccess from "~/assets/scripts/functions/useCheckAccess.js";
import BaseButton from "~/components/base/BaseButton.vue";
import { useDropdown } from "~/components/base/BaseDropdown/BaseDropdown.vue";
import { useNotification } from "~/components/base/BaseNotification.vue";

import CabinetLayoutHeaderHamburger from "./components/CabinetLayoutHeaderHamburger.vue";
import CabinetLayoutHeaderLogo from "./components/CabinetLayoutHeaderLogo.vue";
import CabinetLayoutHeaderMenu from "./components/CabinetLayoutHeaderMenu.vue";
import CabinetLayoutHeaderMenuUser from "./components/CabinetLayoutHeaderMenuUser.vue";
import CabinetLayoutHeaderNotifications from "./components/TheHeaderMenuNotifications/CabinetLayoutHeaderNotifications.vue";

const router = useRouter();
const isMenuVisible = ref(false);
const isLoading = ref(false);
const isNotificationVisible = ref(false);
const scrollY = ref(0);

const changeDocumentScroll = (state) => {
  const { documentElement } = document;

  documentElement.style.marginRight = state ? `${window.innerWidth - documentElement.clientWidth}px` : null;
  documentElement.style.overflowY = state ? "hidden" : null;
};

const toggleMenuVisibility = () => {
  isMenuVisible.value = !isMenuVisible.value;

  changeDocumentScroll(isMenuVisible.value);
};

const sendConfirmEmail = async () => {
  isLoading.value = true;

  const result = await Auth.sendConfirmEmail();

  isLoading.value = !result.errors;

  useNotification.openNotification(result.errors ? result.errors.message : result.extensions.message);
};

const openPage = (menuItem, menuType) => {
  router.push({
    name: menuItem.to,
  });

  if (menuType === "menu" && isMenuVisible.value) {
    toggleMenuVisibility();
  } else {
    useDropdown.closeDropdown();
  }
};

const openMenu = (event) => {
  useDropdown.openDropdown("cabinet-menu-user-wrapper", event, {
    offsetX: 16,
    offsetY: 12,
    positionX: "right",
    width: 200,
  });
};

const openNotifications = () => {
  const { documentElement } = document;

  isNotificationVisible.value = true;

  scrollY.value = documentElement.style.position === "fixed" ? scrollY.value : window.scrollY;

  documentElement.style.cssText = `
    position: fixed;
    top: -${scrollY.value}px;
    right: 0;
    left: 0;
    margin-right: ${window.innerWidth - documentElement.clientWidth}px;
    overflow-y: hidden;
  `;
};

const closeNotifications = () => {
  isNotificationVisible.value = false;

  document.documentElement.style.cssText = "";
  window.scrollTo(0, scrollY.value);
};
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-index-header);
  display: flex;
  align-items: center;
  padding: 20px 8px 20px 16px;
  border-bottom: 1px solid var(--border-color-primary);
  background-color: #ffffff;
}

@media (min-width: 768px) {
  .header {
    padding: 20px 16px 20px 24px;
  }
}

@media (min-width: 1170px) {
  .header {
    padding: 12px 16px 12px 24px;
  }
}

.header__logo {
  margin-right: auto;
}

.header__button--email-confirm {
  width: auto;
  margin-right: 8px;
  margin-left: 16px;
  padding: 4px 3px;
  font-size: 10px;
}

@media (min-width: 450px) {
  .header__button--email-confirm {
    padding: 8px 16px;
    font-size: 14px;
  }
}

.header-user__buttons {
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: column;
  grid-column-gap: 11px;
}

@media (min-width: 768px) {
  .header-user__buttons {
    grid-column-gap: 16px;
  }
}

.header__button--cabinet,
.header__button--notifications {
  display: inline-flex;
  position: relative;
  width: 40px;
  height: 40px;
  padding: 0;
  line-height: 0;
}

.active::after {
  content: "";
  position: absolute;
  top: 9px;
  left: 12px;
  width: 10px;
  height: 10px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background-color: var(--pink);
  transform: scale(1);
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}
</style>
