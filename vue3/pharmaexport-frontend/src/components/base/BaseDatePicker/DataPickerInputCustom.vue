<template>
  <div class="input__wrapper">
    <input
      :id="id"
      class="input"
      :name="name.toLowerCase()"
      :placeholder="placeholder || label"
      type="text"
      v-bind="$attrs"
      :value="value"
    />
    <label
      class="input__label"
      :for="id"
    >
      {{ label || placeholder }}
    </label>

    <div class="input__action-buttons">
      <div v-if="clearable && value" class="input__button-clear" @click="emit('clearDate')">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="14.5115" height="2.23254" rx="1.11627"
                transform="matrix(0.69741 -0.716673 0.69741 0.716673 0 10.4001)" fill="#BAD1E6"/>
          <rect width="14.5115" height="2.23254" rx="1.11627"
                transform="matrix(0.69741 0.716673 -0.69741 0.716673 1.87927 0.000244141)" fill="#BAD1E6"/>
        </svg>
      </div>
      <div :class="['input__button-after', openMenu ? 'input__button-after_active' : '']">
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect class="icon-content" x="4" width="3" height="6" fill="white"/>
          <rect class="icon-content" x="14" width="3" height="6" fill="white"/>
          <rect class="icon-box" x="1" y="5" width="19" height="16" stroke="white" stroke-width="2"/>
          <rect class="icon-content" y="2" width="21" height="4" fill="white"/>
          <rect class="icon-content" x="4" y="8" width="3" height="2" fill="white"/>
          <rect class="icon-content" x="4" y="12" width="3" height="2" fill="white"/>
          <rect class="icon-content" x="4" y="16" width="3" height="2" fill="white"/>
          <rect class="icon-content" x="9" y="8" width="3" height="2" fill="white"/>
          <rect class="icon-content" x="9" y="12" width="3" height="2" fill="white"/>
          <rect class="icon-content" x="9" y="16" width="3" height="2" fill="white"/>
          <rect class="icon-content" x="14" y="8" width="3" height="2" fill="white"/>
          <rect class="icon-content" x="14" y="12" width="3" height="2" fill="white"/>
        </svg>
      </div>
    </div>

  </div>
</template>

<script setup>
// eslint-disable-next-line vue/require-emit-validator
const emit = defineEmits(["clearDate"])

defineProps({
  clearable: {
    default: true,
    type: Boolean
  },
  id: {
    required: true,
    type: String,
  },
  label: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  openMenu: {
    default: false,
    type: Boolean
  },
  placeholder: {
    default: null,
    type: String,
  },
  value: {
    default: null,
    type: String,
  },
});
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<style scoped>
.input__wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}

.input__action-buttons {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 2 * var(--date-picker-input-border-width));
  margin-right: var(--date-picker-input-border-width);
}

.input__button-clear {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  cursor: pointer;
}

.input__button-after {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0 var(--date-picker-input-border) var(--date-picker-input-border) 0;
  background-color: var(--date-picker-input-button-color);
  height: 100%;
  border-radius: 0 var(--date-picker-input-border-radius) var(--date-picker-input-border-radius) 0;
  padding: 0 20px;
  cursor: pointer;
  transition: 0.2s ease-in-out all;
  border-left: var(--date-picker-input-border)
}

.input__button-after svg .icon-content {
  fill: var(--date-picker-input-button-icon-color);
}

.input__button-after svg .icon-box {
  stroke: var(--date-picker-input-button-icon-color);
}

.input:not(:disabled) ~ .input__action-buttons .input__button-after:hover, .input__button-after_active {
  background-color: var(--date-picker-input-button-color-active);
}

.input:not(:disabled) ~ .input__action-buttons .input__button-after:hover > svg .icon-content {
  fill: var(--date-picker-input-button-icon-color-active);
}

.input:not(:disabled) ~ .input__action-buttons .input__button-after:hover > svg .icon-box {
  stroke: var(--date-picker-input-button-icon-color-active);
}

.input:not(:disabled) ~ .input__action-buttons .input__button-after_active:not(.input__button-after:hover) > svg .icon-content {
  fill: var(--date-picker-input-button-icon-color-active);
}

.input:not(:disabled) ~ .input__action-buttons .input__button-after_active:not(.input__button-after:hover) > svg .icon-box {
  stroke: var(--date-picker-input-button-icon-color-active);
}

.input:disabled ~ .input__action-buttons .input__button-after {
  cursor: inherit;
}

.input:disabled ~ .input__action-buttons .input__button-after svg .icon-content {
  fill: var(--date-picker-input-button-icon-color-disabled);
}

.input:disabled ~ .input__action-buttons .input__button-after svg .icon-box {
  stroke: var(--date-picker-input-button-icon-color-disabled);
}

.input {
  width: 100%;
  height: 65px;
  padding: 22px 20px;
  border: var(--date-picker-input-border);
  border-radius: var(--date-picker-input-border-radius);
  font-weight: var(--date-picker-input-font-weight);
  font-size: var(--date-picker-input-font-size);
  font-family: inherit;
  color: var(--date-picker-input-color);
  background-color: var(--date-picker-input-background-color);
  outline: none;
  transition-property: padding,
  border-color,
  background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

@media (any-pointer: fine) {
  .input:hover {
    border-color: var(--date-picker-input-border-color-hover);
    background-color: var(--date-picker-input-background-color-hover);
  }
}

.input:focus,
.input:active {
  border-color: var(--date-picker-input-border-color-active);
  background-color: var(--date-picker-input-background-color-active);
}

.input:focus,
.input:not(:placeholder-shown) {
  padding: 32px 20px 12px;
}

.input:disabled {
  border: 1px solid var(--date-picker-input-border-color-disabled);
  background-color: var(--date-picker-input-background-color-disabled);
  color: var(--date-picker-input-color-disabled);
}

.input::placeholder {
  font-size: 0;
}

.input:disabled ~ .input__action-buttons .input__button-clear {
  display: none;
}

input[type="number"] {
  appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  margin: 0;
  appearance: none;
}

.input__label {
  position: absolute;
  top: 50%;
  left: 20px;
  color: var(--date-picker-input-label-color);
  transform: translateY(-50%);
  transition-property: transform,
  font-weight,
  font-size,
  color;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  pointer-events: none;
  user-select: none;
}

@media (any-pointer: fine) {
  .input:hover ~ .input__label {
    color: var(--date-picker-input-label-color-hover);
  }
}

.input:not(:placeholder-shown) ~ .input__label {
  font-weight: var(--date-picker-input-label-font-weight-active);
  font-size: var(--date-picker-input-label-font-size-active);
  color: var(--date-picker-input-label-color-active);
  transform: translateY(-115%);
}

.input:disabled ~ .input__label {
  color: var(--date-picker-input-label-color-disabled);
}
</style>
