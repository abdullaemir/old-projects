<!-- TODO: Исправить мерцание при переключении между модальными окнами -->
<!-- TODO: Добавить событие при открытии модального окна (передать айди) -->

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition
        name="fade"
        :appear="true"
      >
        <div
          v-if="modalStore.isModalOpen(id)"
          class="modal-overlay"
          @mousedown.self="closeModal"
        >
          <div
            :aria-hidden="!modalStore.isModalOpen(id)"
            role="dialog"
            class="modal"
            :id="id"
            ref="modal"
            v-bind="$attrs"
            @keydown.tab="retrainFocus"
          >
            <div class="modal__header">
              <button
                aria-label="Close modal"
                :aria-controls="id"
                :aria-expanded="modalStore.isModalOpen(id)"
                class="modal__button"
                type="button"
                @click="closeModal"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke-width="2"
                  stroke="var(--modal-cross-stroke)"
                >
                  <path
                    transform="matrix(0.718037 -0.696004 0.718037 0.696004 6.07812 18.5264)"
                    d="M0-1h17.997"
                  />
                  <path
                    transform="matrix(0.718638 0.695384 -0.718638 0.695384 5 6)"
                    d="M0-1h17.998"
                  />
                </svg>
              </button>
            </div>
            <slot />
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script>
import { ClientOnly } from "vite-ssr";
import { reactive, ref, watchEffect } from "vue";

export const useModal = reactive({
  closeModal() {
    const { documentElement } = document;
    this.state.currentModal = null;

    documentElement.removeAttribute("style");
    window.scrollTo(0, this.state.scrollPosition);

    if (this.state.modalButton) {
      this.state.modalButton.focus();
      this.state.modalButton = null;
    }
  },
  isModalOpen(id = null) {
    if (id) {
      return this.state.currentModal === id;
    }

    return this.state.currentModal;
  },
  openModal(id, event = null) {
    if (!this.state.currentModal) {
      const { documentElement } = document;

      this.state.scrollPosition = documentElement.style.position === "fixed"
        ? this.state.scrollPosition
        : window.scrollY;

      this.state.scrollbarWidth = window.innerWidth - documentElement.clientWidth;

      documentElement.style.cssText = `
        position: fixed;
        top: -${this.state.scrollPosition}px;
        right: 0;
        left: 0;
        margin-right: ${this.state.scrollbarWidth}px;
        overflow-y: hidden;
      `;
    }

    this.state.currentModal = id;

    if (event) {
      this.state.modalButton = event.target;
    }
  },
  state: {
    currentModal: null,
    modalButton: null,
    scrollPosition: 0,
    scrollbarWidth: 0,
  },
});

export default {
  name: "BaseModal",
  expose: [],
  components: {
    ClientOnly,
  },
  emits: {
    "close-modal": () => true,
  },
  inheritAttrs: false,
  props: {
    id: {
      default: "",
      required: true,
      type: String,
    },
  },
  setup(props, context) {
    const modal = ref(null);
    const modalStore = useModal;

    const closeModal = () => {
      modalStore.closeModal();
      context.emit("close-modal", { id: props.id });
    };

    const FOCUSABLE_ELEMENTS = [
      "a[href]",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "iframe",
    ];

    const getFocusableNodes = () => {
      const nodes = modal.value.querySelectorAll(FOCUSABLE_ELEMENTS);

      return Array(...nodes);
    };

    watchEffect(() => {
      if (modal.value) {
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
      closeModal,
      modal,
      modalStore,
      retrainFocus,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--modal-z-index);
  background-color: var(--modal-overlay-background-color);
  transition-property: opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .modal-overlay {
    padding: 120px 20px;
    overflow-y: auto;
  }
}

.modal-overlay.fade-enter-from,
.modal-overlay.fade-leave-to {
  opacity: 0;
}

.modal {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 16px 20px;
  background-color: var(--modal-background-color);
  overflow-y: auto;
}

@media (min-width: 768px) {
  .modal {
    max-width: var(--modal-width);
    height: auto;
    margin: 0 auto;
    padding: 32px;
    border-radius: var(--modal-border-radius);
    box-shadow: var(--modal-box-shadow);
  }
}

@media (max-width: 768px) {
  .modal__header {
    height: 56px;
    margin: 0 -16px 32px;
    padding: 0 16px;
    box-shadow: var(--modal-header-box-shadow);
  }
}

.modal__button {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
}
</style>
