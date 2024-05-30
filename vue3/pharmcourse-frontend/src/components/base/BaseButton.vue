<template>
  <button
    class="button"
    :class="[modifiers]"
    type="button"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  modifiers: {
    default: "",
    type: [String, Array, Object],
  },
});
</script>

<style scoped>
.button {
  width: auto;
  display: inline-grid;
  grid-auto-flow: column;
  grid-gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 16px 40px;
  font-weight: var(--button-font-weight);
  font-family: inherit;
  color: var(--button-color);
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.button:disabled {
  opacity: 0.7;
  pointer-events: none;
}

.button.text {
  font-weight: 500;
  color: var(--text-color-primary);
}

.button.small {
  height: var(--button-height-small);
  padding: 4px 24px;
  font-size: 12px;
}

.button.medium {
  height: var(--button-height-medium);
}

.button.large {
  height: var(--button-height-large);
}

.button.square {
  border-radius: var(--button-border-radius-square);
}

.button.half-round {
  border-radius: var(--button-border-radius-half-round);
}

.button.round {
  border-radius: var(--button-border-radius-round);
}

.button.blue {
  background-color: var(--button-background-color-blue);
}

@media (any-pointer: fine) {
  .button.blue:hover {
    background-color: var(--button-background-color-blue-hover);
  }

  .button.blue:active {
    background-color: var(--button-background-color-blue-active);
  }
}

.button.dark-blue {
  background-color: var(--button-background-color-dark-blue);
}

.button.gray {
  color: #8292a1;
  background-color: rgb(207 219 236 / 0.3);
}

.transparent {
  padding: 0;
  font-weight: 500;
  color: var(--text-color-secondary);
  background-color: transparent;
}
</style>
