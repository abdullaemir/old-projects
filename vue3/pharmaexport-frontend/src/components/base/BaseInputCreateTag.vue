<template>
  <div class="input__container">
    <div class="input__wrapper">
      <input
        :value="value"
        type="text"
        class="input__hidden"
        :disabled="disabled || loading"
        :name="name"
        :placeholder="placeholder"
        @input="handleChange(value.value)"
        tabindex="-1"
      />

      <input
        :id="id"
        class="input"
        :class="[heightClasses, stateClasses]"
        :placeholder="placeholder || label"
        type="text"
        v-bind="$attrs"
        v-model="inputTag"
        :disabled="disabled || loading"
        @keyup.enter="blurInput"
        @focusin.stop.prevent="isFocus=true"
        @focusout="blurInput"
      />

      <label
        :class="['input__label', modifiers==='search' && value ? 'input__label_none' : '']"
        :for="id"
      >
        {{ label || placeholder }}
      </label>

      <div class="input__actions">
        <button
          v-if="showClearButton"
          aria-label="Clear tags"
          class="input__clear"
          :disabled="disabled"
          title="Clear tags"
          type="button"
          @click.stop.prevent="clearTags"
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
          v-if="loading"
          class="input__spinner"
        />
      </div>
    </div>

    <BaseError
      :is-focus="isFocus"
      :error-message="errorMessage ?? ''"
      :meta="meta"
    />

    <div v-if="value?.length" class="input__tags-wrapper">
      <BaseTag
        v-for="(option, index) in value"
        :data="option"
        :key="`input-${props.id}-tag-${index}`"
        @deselect="deselect(index)"
        rounded
        :disabled="disabled || loading"
        short
      ></BaseTag>
    </div>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import { toRef, ref, computed, onMounted, watch } from "vue";

import BaseTag from "./BaseTag.vue"
import BaseError from "./BaseError.vue";

const emits = defineEmits({
  "update:modelValue": (value)=>true,
  change: ()=>true
});

const props = defineProps({
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
  placeholder: {
    default: null,
    type: String,
  },
  rules: {
    default: null,
    type: [String, Object, null],
  },
  type: {
    default: "text",
    type: String,
  },
  size: {
    type: String,
    default: 'large',
    description: "large/medium"
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modifiers: {
    type: String,
    default: ""
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  modelValue: {}
});

const isFocus = ref(false);
const inputTag = ref("")

const {
  value,
  meta,
  errorMessage,
  handleChange
} = useField(toRef(props, "name"), props.rules, {validateOnValueUpdate: false, initialValue: ""});

/**
 * Добавляет класс размера для .input
 * @returns {string} - Класс для .input - варианты: "large/medium"
 */
const heightClasses = computed(() => {
  return `input--${props.size}`
})

const stateClasses = computed(()=>{
  return {
    'input--loading': props.loading,
    'input--search': props.modifiers === "search",
    'error': errorMessage.value && !isFocus.value
  };
})

const blurInput = () => {
  if (value.value.indexOf(inputTag.value) !== -1 || !inputTag.value?.length) return
  handleChange([...value.value, inputTag.value]);
  emits('update:modelValue', value.value);
  emits('change');
  isFocus.value = false
}

const deselect = (indexDelete) => {
  handleChange([...value.value].filter((item,index) => index !== indexDelete));
  emits('update:modelValue', value.value)
}

const clearTags = () => {
  inputTag.value = '';
  handleChange([])
  emits('update:modelValue', [])
}

const showClearButton = computed(()=>{
  return props.clearable &&
    (value.value?.length || inputTag.value) &&
    !props.disabled && !props.loading
})

const modelValue = toRef(props, "modelValue");

watch(modelValue, (newValue) => {
  handleChange(newValue);
}, {deep: true})

watch(value, (newValue) => {
  handleChange(newValue);
}, {deep: true})

onMounted(() => {
  if (value.value) {
    Array.isArray(value.value) ?
      emits('update:modelValue', value.value) :
      emits('update:modelValue', [])
    return
  }
  Array.isArray(modelValue.value) ?
    value.value = modelValue.value :
    value.value = []
})

defineExpose({
  clearTags
})
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<style scoped>
.input__wrapper {
  position: relative;
  overflow: hidden;
}

.input__actions {
  height: 100%;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}

.input {
  width: 100%;
  height: 65px;
  padding: 22px 45px 22px 20px;
  border: var(--input-border-width) solid var(--input-border-color);
  border-radius: var(--input-border-radius);
  font-weight: var(--input-font-weight);
  font-size: var(--input-font-size);
  font-family: inherit;
  color: var(--input-color);
  background-color: var(--input-background-color);
  outline: none;
  transition-property:
    border-color,
    background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

.input--medium {
  height: var(--input-medium-height);
  font-size: var(--input-medium-font-size);
}

.input--large {
  height: var(--input-large-height);
  font-size: var(--input-large-font-size);
}

@media (any-pointer: fine) {
  .input:hover {
    border-color: var(--input-border-color-hover);
    background-color: var(--input-background-color-hover);
  }
}

.input:focus,
.input:active {
  border-color: var(--input-border-color-active);
  background-color: var(--input-background-color-active);
}

.input:focus,
.input:not(:placeholder-shown) {
  padding: 32px 45px 12px 20px;
}

.input--medium:focus,
.input--medium:not(:placeholder-shown) {
  padding: 30px 40px 14px 20px;
}

.input--search:focus,
.input--search:not(:placeholder-shown) {
  padding: 22px 40px 22px 20px;
}

.input:not(.input--loading):disabled {
  border-color: var(--input-border-color-disabled);
  color: var(--input-color-disabled);
  background-color: var(--input-background-color-disabled);
}

.input::placeholder {
  font-size: 0;
}

.input.error {
  border-color: var(--input-border-color-error);
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
  transform: translateY(-50%);
  color: var(--input-label-color);
  transition-property:
    transform,
    font-weight,
    font-size,
    color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  pointer-events: none;
  user-select: none;
}

@media (any-pointer: fine) {
  .input:hover ~ .input__label {
    color: var(--input-label-color-hover);
  }
}

.input--medium .input__label{
  font-size: var(--input-label-medium-font-size);
}
.input--large .input__label{
  font-size: var(--input-label-large-font-size);
}

.input--large.input:focus ~ .input__label,
.input--large.input:not(:placeholder-shown) ~ .input__label {
  font-weight: var(--input-label-font-weight-active);
  color: var(--input-label-color-active);
  font-size: var(--input-label-large-font-size-active);
  transform: translateY(-115%);
}

.input--medium.input:focus ~ .input__label,
.input--medium.input:not(:placeholder-shown) ~ .input__label {
  font-weight: var(--input-label-font-weight-active);
  font-size: var(--input-label-medium-font-size-active);
  color: var(--input-label-color-active);
  transform: translateY(-100%);
}

.input:disabled ~ .input__label {
  color: var(--input-label-color-disabled);
}

.input:focus.input--search ~ .input__label {
  display: none;
}
.input__label_none {
  display: none;
}

input[type=text]::-ms-clear {  display: none; width : 0; height: 0; }
input[type=text]::-ms-reveal {  display: none; width : 0; height: 0; }
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }

.input__button--password {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input__button--password path {
  fill: var(--input-icon-password-color);
  transition-property: fill;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

.input__button--password:hover path {
  fill: var(--input-icon-password-color-hover);
}

.error, .error.input:disabled, .error:hover:not(.input:disabled) {
  transition: all 0.3s ease-in-out;
  border: var(--input-border-width) solid var(--input-border-color-error);
}

input.input__hidden {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  opacity: 0;
}

.input__clear {
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

.input__tags-wrapper {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 8px;
}

.input__spinner {
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
