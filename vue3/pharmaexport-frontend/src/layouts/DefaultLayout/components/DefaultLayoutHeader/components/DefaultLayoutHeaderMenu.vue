<template>
  <Transition
    name="slide"
    @after-enter="isOpenedMenu = true"
  >
    <div
      v-show="isDesktop || isVisible"
      class="menu__wrapper"
      :class="[{ visible: isVisible, opened: isOpenedMenu }]"
    >
      <div class="menu__header" />

      <nav
        id="default-menu"
        class="menu"
      >
        <ul class="menu__list">
          <li class="menu__item">
            <BaseLink
              class="menu__link"
              href="#contact-us"
              @click="closeMenu"
              @click.prevent="useScrollIntoView"
            >
              Contact us
            </BaseLink>
          </li>

          <li class="menu__item menu__item--divider">
            <RouterLink
              active-class="active"
              class="menu__link"
              data-name="Event Calendar"
              :to="{ name: 'events' }"
              @click.prevent="closeMenu"
            >
              Event Calendar
            </RouterLink>
          </li>

          <template v-if="!user.id">
            <li class="menu__item">
              <BaseButton
                class="menu__link"
                :modifiers="['text']"
                @click="openModal('login', $event)"
              >
                Sign in
              </BaseButton>
            </li>

            <li class="menu__item">
              <BaseButton
                class="menu__link"
                :modifiers="['text']"
                @click="openModal('registration', $event)"
              >
                Sign up
              </BaseButton>
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </Transition>
</template>

<script setup>
import { useScrollIntoView } from "@pg/helpers";
import { useBreakpoints } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { useContext } from "vite-ssr";
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";

import BaseButton from "~/components/base/BaseButton.vue";
import BaseLink from "~/components/base/BaseLink.vue";
import { useModal } from "~/components/base/BaseModal.vue";
import useUserStore from "~/stores/user.js";

const props = defineProps({
  isVisible: {
    required: true,
    type: Boolean,
  },
});
const emits = defineEmits({
  closeMenu: () => true,
});
const userStore = useUserStore();
const { isClient } = useContext();
const { user } = storeToRefs(userStore);

const breakpoints = useBreakpoints({
  desktop: 1170,
});
const isOpenedMenu = ref(false);
let isDesktop = ref(true);

if (isClient) {
  isDesktop = breakpoints.greater("desktop");
}

const closeMenu = () => {
  if (props.isVisible) {
    emits("closeMenu");
  }
};

watch(isDesktop, () => {
  isOpenedMenu.value = false;

  if (props.isVisible === true) {
    closeMenu();
  }
});

const openModal = (modalId, event) => {
  closeMenu();
  useModal.openModal(modalId, event);
};
</script>

<style scoped>
@media (max-width: 1169px) {
  .menu__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--z-index-header);
    background-color: #ffffff;
    overflow-y: auto;
  }
}

@media (min-width: 1170px) {
  .menu__wrapper {
    margin-left: auto;
  }
}

@media (max-width: 1169px) {
  .slide-enter-active,
  .opened.slide-leave-active {
    transition-property: transform;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(-100%);
  }

  .slide-enter-to,
  .slide-leave-from {
    transform: translateX(0);
  }
}

.menu__header {
  display: flex;
  align-items: center;
  min-height: 85px;
  padding: 0 16px;
}

@media (min-width: 768px) {
  .menu__header {
    min-height: 94px;
    padding: 0 32px;
  }
}

@media (min-width: 1170px) {
  .menu__header {
    display: none;
  }
}

.menu__list {
  display: grid;
  grid-auto-rows: 56px;
  margin: 0;
  padding-left: 0;
}

@media (min-width: 1170px) {
  .menu__list {
    grid-auto-rows: auto;
    grid-auto-flow: column;
    grid-column-gap: 32px;
    align-items: center;
  }
}

.menu__item:not(:last-child) {
  border-bottom: 1px solid var(--border-color-primary);
}

@media (min-width: 1170px) {
  .menu__item:not(:last-child) {
    border-bottom: none;
  }
}

@media (min-width: 1170px) {
  .menu__item--divider {
    height: 36px;
    padding: 0 32px;
    border-left: 1px solid rgb(4 32 47 / 0.1);
    border-right: 1px solid rgb(4 32 47 / 0.1);
  }
}

.menu__link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  padding: 0 16px;
}

@media (min-width: 768px) {
  .menu__link {
    padding: 0 32px;
  }
}

@media (min-width: 1170px) {
  .menu__link {
    align-items: center;
    padding: 0;
  }
}

@media (min-width: 1170px) {
  .menu__link[data-name] {
    position: relative;
  }
}

@media (min-width: 1170px) {
  .menu__link[data-name]::after {
    content: attr(data-name);
    display: block;
    height: 0;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    visibility: hidden;
  }
}

.menu__link.active {
  font-weight: 600;
}
</style>
