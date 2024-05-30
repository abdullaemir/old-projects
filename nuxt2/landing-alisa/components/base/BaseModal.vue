<template>
  <div
    :class="['modal-overlay', { 'visible': isVisible }]"
    @click.self="$emit('close')"
  >
    <div class="modal">
      <button
        class="modal__button"
        type="button"
        @click="$emit('close')"
      />
      <slot />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "BaseModal",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapMutations({
      changeScrollability: 'scroll/changeScrollability'
    }),
  },
  watch: {
    visible: function(value) {
      this.changeScrollability(!value);
    },
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 130px 0;
  background-color: var(--background-color-quinary);
  overflow-y: auto;
  z-index: var(--z-index-modal);
}

@media (min-width: 1280px) {
  .c-modal-overlay {
    padding: 118px 0;
  }
}

@media (min-width: 1920px) {
  .c-modal-overlay {
    padding: 236px 0;
  }
}

.modal-overlay:not(.visible) {
  display: none;
}

.modal {
  position: relative;
  width: 100%;
  max-width: 320px;
  padding: 35px 22px;
  background-color: var(--background-color-secondary);
}

@media (min-width: 768px) {
  .modal {
    max-width: 398px;
    padding: 35px 61px;
  }
}

@media (min-width: 1280px) {
  .modal {
    max-width: 670px;
    padding: 81px 103px;
  }
}

.modal__button {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  background-image: url("~/assets/icons/cross--white.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

@media (min-width: 768px) {
  .modal__button {
    top: 15px;
    right: 15px;
  }
}

@media (min-width: 1280px) {
  .modal__button {
    top: 30px;
    right: 30px;
  }
}
</style>
