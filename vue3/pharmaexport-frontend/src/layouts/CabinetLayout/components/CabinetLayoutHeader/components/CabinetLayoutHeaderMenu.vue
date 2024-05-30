<template>
  <Transition
    name="slide"
    @after-enter="isOpenedMenu = true"
  >
    <div
      v-show="isDesktop || isMenuVisible"
      class="menu__wrapper scrollbar"
      :class="[{ visible: isMenuVisible, opened: isOpenedMenu }]"
    >
      <div class="menu__header" />

      <nav
        id="cabinet-menu"
        class="menu"
      >
        <ul class="menu__list">
          <template
            v-for="menuItem in menu"
            :key="menuItem.id"
          >
            <li
              v-if="useCheckAccess(menuItem.access)"
              class="menu__item"
            >
              <RouterLink
                active-class="active"
                class="menu__link"
                :to="{ name: menuItem.to }"
                @click.stop.prevent="$emit('openPage', menuItem, 'menu')"
              >
                <img
                  alt=""
                  aria-hidden="true"
                  class="menu__icon"
                  height="28"
                  :src="getImg(menuItem.icon)"
                  width="28"
                />
                {{ menuItem.name }}
                <div
                  v-if="menuItem.isComing"
                  class="menu__coming"
                >
                  <span
                    :id="`menu-coming-${menuItem.name}`"
                    class="menu-coming__title"
                    @click.stop.prevent="openMenu(`menu-coming-${menuItem.name}`, menuItem.name)"
                  >
                    Coming soon

                    <img
                      v-if="menuItem.isComingInformation"
                      alt=""
                      aria-hidden="true"
                      class="menu-coming__icon"
                      height="18"
                      src="/src/assets/icons/info.svg"
                      width="18"
                      @click.stop.prevent
                      @mouseenter="openMenu(`menu-coming-${menuItem.name}`, menuItem.name)"
                      @mouseleave="useDropdown.closeDropdown()"
                      @touchstart.stop.prevent="openMenu(`menu-coming-${menuItem.name}`, menuItem.name)"
                    />
                  </span>
                  <BaseDropdown
                    v-if="comingTooltipComponent(menuItem.name)"
                    :id="menuItem.name"
                    class="menu-coming-tooltip"
                  >
                    <span class="menu-coming-tooltip__title">{{ menuItem.name }}</span>
                    <div class="menu-coming-tooltip__description">
                      <Component :is="comingTooltipComponent(menuItem.name)" />
                    </div>
                  </BaseDropdown>
                </div>
              </RouterLink>
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </Transition>
</template>

<script setup>
import { useBreakpoints } from "@vueuse/core";
import { useContext } from "vite-ssr";
import { computed, ref, watch } from "vue";
import { RouterLink } from "vue-router";

import useCheckAccess from "~/assets/scripts/functions/useCheckAccess.js";
import BaseDropdown, { useDropdown } from "~/components/base/BaseDropdown/BaseDropdown.vue";

import CabinetLayoutHeaderMenuTooltipsPromotions from "./CabinetLayoutHeaderMenuTooltips/CabinetLayoutHeaderMenuTooltipsPromotions.vue";
import CabinetLayoutHeaderMenuTooltipsPurchases from "./CabinetLayoutHeaderMenuTooltips/CabinetLayoutHeaderMenuTooltipsPurchases.vue";

const props = defineProps({
  isMenuVisible: {
    required: true,
    type: Boolean,
  },
});

const emits = defineEmits({
  closeMenu: () => true,
  openPage: (menuItem, menuType) => [
    menuItem,
    menuType,
  ],
});

const { isClient } = useContext();

const menu = ref([
  {
    access: "MY_COMPANIES_VIEW",
    icon: "menu-my-companies",
    isComing: false,
    isComingInformation: false,
    name: "My companies",
    to: "cabinetCompanies",
  },
  {
    access: [
      "ANALYTICS_VIEW_DISTRIBUTION",
      "ANALYTICS_VIEW_PM",
    ],
    icon: "menu-analytics",
    isComing: false,
    isComingInformation: false,
    name: "Analytics",
    to: "cabinetAnalytics",
  },
  {
    access: [
      "TENDERS_VIEW_BUYER",
      "TENDERS_VIEW_SELLER",
    ],
    icon: "menu-tenderx",
    isComing: false,
    isComingInformation: false,
    name: "TendeRx",
    to: "cabinetTenders",
  },
  {
    access: [
      "PURCHASES_VIEW_BUYER",
      "PURCHASES_VIEW_SELLER",
    ],
    icon: "menu-purchases",
    isComing: false,
    isComingInformation: false,
    name: "Purchases",
    to: "cabinetPurchases",
  },
  {
    access: [
      "PROMOTIONS_VIEW_BUYER",
      "PROMOTIONS_VIEW_SELLER",
    ],
    icon: "menu-promotions",
    isComing: true,
    isComingInformation: true,
    name: "Promotions",
    to: "cabinetPromotions",
  },
  {
    access: "FIRST_DATA_VIEW",
    icon: "menu-firstdata",
    isComing: false,
    isComingInformation: false,
    name: "FirstData",
    to: "cabinetFirstData",
  },
  {
    access: [
      "PHARMACOURSE_VIEW_EDUCATION",
      "PHARMACOURSE_VIEW_PROMO",
    ],
    icon: "menu-pharmacourses",
    isComing: true,
    isComingInformation: false,
    name: "PharmaCourses",
    to: "cabinetPharmaCourses",
  },
  {
    access: "HR_VIEW",
    icon: "menu-hr",
    isComing: false,
    isComingInformation: false,
    name: "HR",
    to: "cabinetHR",
  },
]);

const comingTooltipComponent = computed(() => (name) => {
  let isComponent = null;

  switch (name) {
    case "Purchases": {
      isComponent = CabinetLayoutHeaderMenuTooltipsPurchases;

      break;
    }

    case "Promotions": {
      isComponent = CabinetLayoutHeaderMenuTooltipsPromotions;

      break;
    }

    default:
      isComponent = null;
  }

  return isComponent;
});

const openMenu = (parentId, menuId) => {
  useDropdown.openDropdown(`${menuId}`, parentId, {
    offsetX: -50,
    offsetY: 20,
    positionX: "left",
    width: 250,
  });
};

const breakpoints = useBreakpoints({
  desktop: 1170,
});
const isOpenedMenu = ref(false);
let isDesktop = ref(true);

if (isClient) {
  isDesktop = breakpoints.greater("desktop");
}

const closeMenu = () => {
  if (props.isMenuVisible) {
    emits("closeMenu");
  }
};

const getImg = (name) => {
  const path = `../assets/icon/${name}.svg`;
  const modules = import.meta.globEager("../assets/icon/*");

  return modules[path].default;
};

watch(isDesktop, () => {
  isOpenedMenu.value = false;

  if (props.isMenuVisible === true) {
    closeMenu();
  }
});
</script>

<style scoped>
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

@media (min-width: 1170px) {
  .menu__wrapper {
    top: 65px;
    right: auto;
    max-width: 293px;
    width: 100%;
    border-right: 1px solid var(--border-color-primary);
    box-shadow: 2px 2px 8px rgb(0 42 81 / 0.05);
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
  margin: 0;
  padding-left: 0;
}

.menu__item:not(:last-child) {
  border-bottom: 1px solid var(--border-color-primary);
}

.menu__link {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
  padding: 32px 16px;
  font-size: 15px;
}

@media (min-width: 768px) {
  .menu__link {
    padding: 32px 24px;
  }
}

.menu__link.active {
  font-weight: 600;
  background-color: #f6f7fb;
}

.menu__icon {
  margin-right: 14px;
}

.menu__coming {
  position: relative;
  display: flex;
  width: 100%;
  margin-top: 2px;
  padding-left: 42px;
  font-weight: 400;
  font-size: 12px;
  color: var(--text-color-five);
}

.menu-coming__title {
  display: inline-flex;
  align-items: center;
}

.menu-coming__icon {
  margin-left: 8px;
}

:global(.dropdown.menu-coming-tooltip) {
  /* position: absolute; */

  /* top: calc(100% + 10px); */

  /* left: 0; */

  /* z-index: 1; */
  display: flex;
  flex-direction: column;

  /* width: 100%; */
  padding: 16px;
  border: 1px solid var(--border-color-primary);
  border-radius: 8px;
  color: #04202f;
  background-color: #ffffff;
  box-shadow: 2px 2px 8px rgb(0 42 81 / 0.05);
  cursor: default;
}

:global(.dropdown.menu-coming-tooltip::before) {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 100%;
  height: 12px;
}

.menu-coming-tooltip__title {
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 12px;
}

.menu-coming-tooltip__description {
  font-size: 12px;
  line-height: 1.8;
}
</style>
