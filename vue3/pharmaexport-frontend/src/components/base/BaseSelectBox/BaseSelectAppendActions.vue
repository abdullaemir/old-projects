<template>
  <div class="select__actions">
    <button
      v-if="showClearButton"
      ref="clearButton"
      aria-label="Clear Selected"
      class="select__clear"
      :disabled="useProps.disabled"
      title="Clear Selected"
      type="button"
      @click.stop.prevent="emits('clear-select')"
    >
      <svg
        height="10"
        width="10"
      >
        <line
          stroke="inherit"
          stroke-width="2"
          x1="0"
          x2="10"
          y1="0"
          y2="10"
        />
        <line
          stroke="inherit"
          stroke-width="2"
          x1="10"
          x2="0"
          y1="0"
          y2="10"
        />
      </svg>
    </button>

    <span
      v-if="useProps.loading"
      class="select__spinner"
    />

    <button
      v-if="!useProps.loading && useProps.showArrowIndicator"
      class="select__button-indicator"
      title="Clear Selected"
      type="button"
    >
      <svg
        class="select__open-indicator"
        height="4"
        width="8"
      >
        <path d="M8 0L4 4L0 0H8Z" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import {defineProps, inject} from "vue";

const emits = defineEmits({
  'clear-select': ()=>true,
})

const useProps = inject("useProps");

const props = defineProps({
  showClearButton: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>

.select__actions {
  display: flex;
  align-items: center;
}

.select__clear {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 100%;
  padding: 0;
  border: none;
  background-color: transparent;
  stroke: var(--select-clear-indicator-fill);
  cursor: pointer;
}

.select__button-indicator {
  width: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.select__open-indicator {
  fill: var(--select-open-indicator-fill);
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
}
.select--disabled .select__open-indicator {
  fill: var(--select-open-indicator-fill-disabled);
}

.select--open .select__open-indicator {
  transform: scale(1, -1);
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
}

.select__spinner {
  width: 20px;
  height: 20px;
  border-top: var(--select-spinner-border-width) solid var(--select-spinner-border-color);
  border-bottom: var(--select-spinner-border-width) solid var(--select-spinner-border-color);
  border-left: var(--select-spinner-border-width) solid var(--select-spinner-border-color-active);
  border-right: var(--select-spinner-border-width) solid var(--select-spinner-border-color);
  border-radius: 50%;
  overflow: hidden;
  animation: roundSpinner 1.1s infinite linear;
  margin-right: 12px;
}

@keyframes roundSpinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
