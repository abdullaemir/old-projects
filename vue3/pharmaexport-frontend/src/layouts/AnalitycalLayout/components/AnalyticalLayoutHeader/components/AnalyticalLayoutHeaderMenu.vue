<template>
  <Transition
    name="slide"
    @after-enter="isOpenedMenu = true"
    @after-leave="$emit('finishAnimation')"
  >
    <div
      v-show="isDesktop || isVisible"
      :class="['menu__wrapper', { 'visible': isVisible }]"
    >
      <div class="menu__header" />

      <nav class="menu">
        <ul class="menu__list">
          <li
            v-for="(link, linkIndex) in links"
            class="menu__item"
            :key="linkIndex"
          >
            <BaseLink
              class="menu__link"
              :href="link.href"
              @click="closeMenu"
              @click.prevent="useScrollIntoView"
            >
              {{ link.name }}
            </BaseLink>
          </li>
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

import BaseLink from "~/components/base/BaseLink.vue";
import { useModal } from "~/components/base/BaseModal.vue";
import useUserStore from "~/stores/user.js";

const links = [
  {
    name: "About us",
    href: "#about-us",
  },
  {
    name: "Unique approach",
    href: "#unique-approach",
  },
  {
    name: "For whom?",
    href: "#for-whom",
  },
  {
    name: "Methodology and types of report",
    href: "#methodology-and-types-of-report",
  },
  {
    name: "Report structure",
    href: "#report-structure",
  },
  {
    name: "Procedure",
    href: "#procedure",
  },
  {
    name: "Our partners",
    href: "#our-partners",
  },
];

const props = defineProps({
  isVisible: {
    required: true,
    type: Boolean,
  },
});
const emits = defineEmits({
  closeMenu: () => true,
  finishAnimation: () => true,
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
.menu {
  padding: 0 16px;
}

@media (min-width: 768px) {
  .menu {
    padding: 0 32px;
  }
}

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

  .menu__wrapper:not(.visible):not(.slide-leave-active) {
    display: none;
  }
}

@media (min-width: 1170px) {
  .menu__wrapper {
    margin-left: auto;
  }
}

@media (max-width: 1169px) {
  .slide-enter-active,
  .slide-leave-active {
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
  min-height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid #e7f0fe;
}

@media (min-width: 768px) {
  .menu__header {
    min-height: 72px;
    margin-bottom: 16px;
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
  grid-auto-rows: 69px;
  margin: 0;
  padding-left: 0;
}

@media (min-width: 1170px) {
  .menu__list {
    grid-auto-rows: auto;
    grid-auto-flow: column;
    grid-column-gap: 28px;
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

.menu__link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}

@media (min-width: 1170px) {
  .menu__link {
    align-items: center;
    padding: 0;
    color: #ffffff;
    font-weight: 600;
  }

  .header.white .menu__link {
    color: #011e41;
    transition-property: color;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }

  @media (any-pointer: fine) {
    .menu__link:hover {
      text-decoration: underline;
    }

    .header.white .menu__link:hover {
      color: #e80061;
    }
  }
}
</style>
