<template>
  <ClientOnly>
    <aside
      v-show="isOpened"
      class="tray"
      v-bind="$attrs"
      :style="trayStyle"
    >
      <div
        class="tray__actions"
        :style="{
          borderTopLeftRadius: trayStyle.borderTopLeftRadius,
          borderTopRightRadius: trayStyle.borderTopRightRadius
        }"
      >
        <button
          class="tray__button--line"
          type="button"
          @touchend.passive="touchend"
          @touchmove.passive="touchmove($event)"
          @touchstart.passive="touchstart($event)"
        />
        <button
          class="tray__button--cross"
          type="button"
          @click="closeTray"
        >
          <svg width="16" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path transform="matrix(.71804 -.696 .71804 .696 1.58789 14.579)" stroke="#031017"
                  stroke-width="2" stroke-linecap="round" d="M1-1h17.4859"
            />
            <path transform="matrix(.71864 .69538 -.71864 .69538 .421875 1.01666)"
                  stroke="#031017" stroke-width="2" stroke-linecap="round" d="M1-1h17.4868"
            />
          </svg>
        </button>
      </div>

      <div
        class="tray__list scroll"
      >
        <slot></slot>
      </div>
    </aside>
  </ClientOnly>
</template>

<script>
export default {
  name: "BaseTray",
  inheritAttrs: false,
}
</script>

<script setup>
import { useBreakpoints } from "@vueuse/core";
import { ClientOnly, useContext } from "vite-ssr";
import {onMounted, ref, watchEffect, computed} from "vue";

const emits = defineEmits({
  "closeTray": ()=>true
})

const props = defineProps({
  borderRadiusDesktop: {
    type: String,
    default: '8',
  },
  borderRadiusMobile: {
    type: String,
    default: '22',
  },
  heightMobile: {
    type: String,
    default: '210',
  },
  closingHeight: {
    type: String,
    default: '150',
  },
  isOpen: {
    type: Boolean,
    default: true,
  }
})

const { isClient } = useContext();

const isOpenTray = ref(true);
const scrollY = ref(0);
const touchEnd = ref(null);
const touchStart = ref(null);
const trayStyle = ref({});
const windowHeight = ref(0);
const htmlMargin = ref("0px");

onMounted(() => {
  windowHeight.value = window.innerHeight;
});

// TODO: Вытащить в глобальные константы
const breakpoints = useBreakpoints({
  desktop: 1170,
});

const isDesktop = breakpoints.greater("desktop");

const isOpened = computed({
  get() {
    return props.isOpen && isOpenTray.value
  },
  set(value) {
    isOpenTray.value = value;
  }
})

watchEffect(()=>{
  if (isClient) {
    const { documentElement } = document;

    documentElement.style.cssText = "";

    if (isDesktop.value) {
      trayStyle.value.height = "auto"
      trayStyle.value.borderTopLeftRadius = `${props.borderRadiusDesktop}px`;
      trayStyle.value.borderTopRightRadius = `${props.borderRadiusDesktop}px`;
    } else {
      trayStyle.value.height = `${props.heightMobile}px`
      trayStyle.value.borderTopLeftRadius = `${props.borderRadiusMobile}px`;
      trayStyle.value.borderTopRightRadius = `${props.borderRadiusMobile}px`;
    }
  }
})

const hidePageScroll = () => {
  if (isOpened.value) {
    const { documentElement } = document;

    scrollY.value = documentElement.style.position === "fixed" ? scrollY.value : window.scrollY

    documentElement.style.cssText = `
      position: fixed;
      top: -${scrollY.value}px;
      right: 0;
      left: 0;
      margin-right: ${window.innerWidth - documentElement.clientWidth}px;
      overflow-y: hidden;
    `;
  }
};

const showPageScroll = () => {
  const { documentElement } = document;
  documentElement.style.cssText = "";
  window.scrollTo(0, scrollY.value);
};

const touchstart = (event) => {
  touchStart.value = event.touches[0].clientY;
  touchEnd.value = touchStart.value;
  trayStyle.value.borderTopLeftRadius = `${props.borderRadiusMobile}px`;
  trayStyle.value.borderTopRightRadius = `${props.borderRadiusMobile}px`;
  hidePageScroll();
};

const touchmove = (event) => {
  const coordinateTouchMove = event.touches[0].clientY;
  const currentHeightTray = windowHeight.value - coordinateTouchMove;

  if (coordinateTouchMove >= 0) {
    trayStyle.value.height = currentHeightTray > 0 ? `${currentHeightTray}px` : "0px";
  }

  touchEnd.value = coordinateTouchMove;
};

const touchend = () => {
  const differenceTouch = touchStart.value - touchEnd.value
  const touchendTrayDirection = differenceTouch > 0 ? "top" : "bottom";

  if (differenceTouch === 0) {
    showPageScroll();
  } else if (windowHeight.value - touchEnd.value < Number(props.closingHeight)) {
    closeTray();
    trayStyle.value.height = `${props.heightMobile}px`;
  } else {
    switch (touchendTrayDirection) {
      case "top": {
        hidePageScroll();
        trayStyle.value.height = "100%";
        trayStyle.value.borderTopLeftRadius = "0";
        trayStyle.value.borderTopRightRadius = "0";

        break;
      }

      case "bottom": {
        showPageScroll();

        trayStyle.value.height = `${props.heightMobile}px`;

        break;
      }

      // No default
    }
  }
};

const closeTray = () => {
  if (!isDesktop.value) showPageScroll();
  isOpened.value = false;
  emits("closeTray");
}

if (isClient) {
  const { documentElement } = document;
  const observer = new MutationObserver(() => {
    htmlMargin.value = documentElement.style.marginRight || "0px";
  });

  observer.observe(documentElement, {
    attributeFilter: [
      "style",
    ],
  });
}
</script>

<style scoped>

/* TODO: вынести стили кроме overflow: hidden; will-change: height; z-index: width height transition в родительский компонент*/
.tray {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: var(--z-index-tray);
  width: 100%;
  height: 210px;
  border-radius: 22px 22px 0 0;
  background-color: #ffffff;
  box-shadow: 0 -1px 46px rgb(0 0 0 / 0.15);
  overflow: hidden;
  transition-property: border-radius;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  will-change: height;
  padding: 50px 0 30px;
}

/* TODO: вынести стили кроме height width max-height в родительский компонент*/
@media (min-width: 1170px) {
  .tray {
    top: auto;
    right: calc(20px + v-bind(htmlMargin));
    bottom: 8px;
    width: 320px;
    height: auto;
    max-height: calc(100% - 100px);
    padding: 50px 0 24px ;
    border-radius: 8px;
  }
}

.tray__actions {
  position: absolute;
  left: 0;
  margin-top: -50px;
  width: 100%;
  height: 45px;
  background-color: #ffffff;
}

.tray__button--line {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 40px;
}

.tray__button--line::after {
  content: "";
  position: absolute;
  top: 8px;
  left: 50%;
  width: 60px;
  height: 3px;
  border-radius: 8px;
  background-color: #bad1e6;
  transform: translateX(-50%);
}

@media (min-width: 1170px) {
  .tray__button--line {
    display: none;
  }
}

.tray__button--cross {
  position: absolute;
  top: 5px;
  right: 4px;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tray__list {
  height: 100%;
  margin: 0;
  overflow-y: auto;
  padding: 0 19px;
}

@media (min-width: 1170px) {
  .tray__list {
    padding: 0 24px;
    max-height: calc(100vh - 200px);
  }
}

.scroll::-webkit-scrollbar {
  width: 16px;
  height: 16px;
  background-color: transparent;
}

.scroll::-webkit-scrollbar-track {
  margin: 0;
}

.scroll::-webkit-scrollbar-thumb {
  min-height: 70px;
  border: 4px solid transparent;
  border-radius: 8px;
  background-color: var(--blue-lightest);
  background-clip: content-box;
}
</style>
