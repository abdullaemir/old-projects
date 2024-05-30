<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        v-if="dropdownStore.isDropdownOpen(id)"
        class="dropdown"
        :id="id"
        v-bind="$attrs"
        ref="dropdown"
        :style="[dropdownStore.state.dropdownStyle]"
        @keydown.tab="retrainFocus"
        @keydown.esc="dropdownStore.closeDropdown()"
      >
        <slot />
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script>
import { ClientOnly } from "vite-ssr";
import { onClickOutside } from "@vueuse/core";
import { nextTick, onMounted, reactive, ref, watch, watchEffect } from "vue";

export const useDropdown = reactive({
  closeDropdown() {
    this.state.dropdownId = null;
    this.state.dropdownOffsetY = null;
    this.state.dropdownStyle = null;

    if (this.state.dropdownButton) {
      this.state.dropdownButton.focus();
      this.state.dropdownButton = null;
    }
  },
  isDropdownOpen(id = null) {
    if (id) {
      return this.state.dropdownId === id;
    }

    return this.state.dropdownId;
  },
  /**
   * @param {string} id - Id дропдауна
   * @param {{}} currentTarget - Элемент, который открывает дропдаун. Может быть событием на элементе (event), либо
   * реактивной переменной (ref), ибо id элемента, относительно которого будет открываться дропдаун.
   * @param {{}} options - Настройки дропдауна
   * @param {number} options.offsetX=0 - Смещение дропдауна по оси X
   * @param {number} options.offsetY=0 - Смещение дропдауна по оси Y
   * @param {string} options.positionX="right" - Позиционирование дропдауна относительно открывающего элемента
   * по оси X
   * @param {string} options.positionY="bottom" - Позиционирование дропдауна относительно открывающего элемента
   * по оси Y
   * @param {number} options.width=event.currentTarget.clientWidth - Ширина дропдауна
   */
  openDropdown(id, currentTarget, {
    offsetX = 0,
    offsetY = 0,
    positionX = "right",
    positionY = "bottom",
    width = null,
  } = {}) {
    if (id === this.state.dropdownId) {
      this.closeDropdown()

      return
    }

    let target = null

    if (typeof currentTarget === "string") {
      target = document.getElementById(currentTarget)
    } else {
      target = currentTarget.currentTarget ? currentTarget.currentTarget : currentTarget
    }

    const coords = target.getBoundingClientRect();
    const dropdownPosition = {};
    const dropdownOptions = {
      offsetX,
      offsetY,
      positionX,
      positionY,
      width: width ?? target.clientWidth,
    };

    switch (dropdownOptions.positionX) {
      case "right": {
        dropdownPosition.left = coords.right + window.scrollX - dropdownOptions.width + dropdownOptions.offsetX + "px";

        break;
      }

      case "left": {
        dropdownPosition.left = coords.left + window.scrollX + dropdownOptions.offsetX + "px";

        break;
      }
    }

    switch (dropdownOptions.positionY) {
      case "top": {
        dropdownPosition.top = coords.top + window.scrollY + dropdownOptions.offsetY + "px";

        break;
      }

      case "bottom": {
        dropdownPosition.top = coords.bottom + window.scrollY + dropdownOptions.offsetY + "px";

        break;
      }
    }

    this.state.dropdownButton = target;
    this.state.dropdownId = id;
    this.state.dropdownOffsetY = dropdownOptions.offsetY;
    this.state.dropdownStyle = {
      ...dropdownPosition,
      width: dropdownOptions.width + "px",
    };
  },
  state: {
    dropdownButton: null,
    dropdownId: null,
    dropdownOffsetY: null,
    dropdownStyle: null,
  },
});

export default {
  name: "BaseDropdown",
  components: {
    ClientOnly,
  },
  emits: {
    "close-dropdown": () => true,
  },
  inheritAttrs: false,
  props: {
    id: {
      required: true,
      type: String,
    },
    disabledClosedScroll: {
      default: false,
      type: Boolean,
    },
  },
  setup(props, context) {
    const dropdown = ref(null);
    const dropdownStore = useDropdown;

    const closeDropdown = function () {
      dropdownStore.closeDropdown();
      context.emit("close-dropdown");
      window.removeEventListener("resize", closeDropdown);

      if (!props.disabledClosedScroll) {
        window.removeEventListener("scroll", scrollHandler, { capture: true });
      }
    };

    const scrollHandler = function (event) {
      if (!event.target.closest || !event.target.closest(`#${props.id}`)) {
        closeDropdown();
      }
    };

    onMounted(() => onClickOutside(dropdown, (event)=> {
      const eventTarget = event.target;
      const button = dropdownStore.state.dropdownButton;

      const checkParent = (parent) => {
        if (parent === document.body) {
          return false
        }

        if (parent === button) {
          return true
        } else {
          checkParent(parent.parentNode)
        }
      }

      if (eventTarget === button || checkParent(eventTarget.parentNode)) {
        return
      }

      closeDropdown()
    }));

    watch(
      () => dropdownStore.state.dropdownId,
      () => {
        if (dropdownStore.isDropdownOpen(props.id)) {
          if (!props.disabledClosedScroll) {
            window.addEventListener("resize", closeDropdown);
            window.addEventListener("scroll", scrollHandler, { capture: true });
          }

          nextTick(() => {
            const OFFSET_BOTTOM = 30;
            const documentHeight = document.documentElement.clientHeight;
            const coords = dropdown.value.getBoundingClientRect();
            const button = dropdownStore.state.dropdownButton;
            const buttonCoords = button.getBoundingClientRect();

            if ((documentHeight - coords.bottom + coords.height) < coords.height + OFFSET_BOTTOM) {
              dropdown.value.style.top =
                buttonCoords.top + window.scrollY - coords.height - dropdownStore.state.dropdownOffsetY + "px";
            }
          })
        }
      });

    const FOCUSABLE_ELEMENTS = [
      "a[href]",
      "input:not([disabled]):not([type=\"hidden\"])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "iframe",
    ];

    const getFocusableNodes = () => {
      const nodes = dropdown.value.querySelectorAll(FOCUSABLE_ELEMENTS);

      return Array(...nodes);
    };

    watchEffect(() => {
      if (dropdown.value ) {
        const focusableNodes = getFocusableNodes();

        if (focusableNodes.length) {
          focusableNodes[0].focus();
        }
      }
    });

    const retrainFocus = (event) => {
      const focusableNodes = getFocusableNodes();
      const focusedItemIndex = focusableNodes.indexOf(document.activeElement);

      if (event.shiftKey && focusedItemIndex === 0) {
        focusableNodes[focusableNodes.length - 1].focus();
        event.preventDefault();
      }

      if (!event.shiftKey && focusableNodes.length > 0 && focusedItemIndex === focusableNodes.length - 1) {
        focusableNodes[0].focus();
        event.preventDefault();
      }
    };

    return {
      dropdown,
      dropdownStore,
      retrainFocus,
    };
  },
};
</script>

<style scoped>
.dropdown {
  position: absolute;
  z-index: var(--z-index-popup);
}
</style>
