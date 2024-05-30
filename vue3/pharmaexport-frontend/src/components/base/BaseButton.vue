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
  display: inline-grid;
  grid-auto-flow: column;
  grid-gap: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  color: var(--text-color-one);
}

.small {
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

.button.purple {
  background-color: var(--button-background-color-purple);
  box-shadow: var(--button-background-box-shadow-purple);
}

@media (any-pointer: fine) {
  .button.purple:hover {
    background-color: var(--button-background-color-purple-hover);
  }

  .button.purple:active {
    background-color: var(--button-background-color-purple-active);
  }
}

.button.gray {
  color: #8292a1;
  background-color: rgb(207 219 236 / 0.3);
}

.button.plain.blue {
  border: 1px solid var(--button-background-color-blue);
  color: var(--button-background-color-blue);
  background-color: #ffffff;
}

.button.plain.purple {
  border: 1px solid var(--button-background-color-purple);
  color: var(--button-background-color-purple);
  background-color: #ffffff;
  box-shadow: var(--button-background-box-shadow-purple);
}

.button.plain.gray {
  border: 1px solid rgb(207 219 236 / 0.3);
  color: #8292a1;
  background-color: #ffffff;
}

.transparent {
  padding: 0;
  font-weight: 500;
  color: var(--text-color-five);
  background-color: transparent;
}
</style>
