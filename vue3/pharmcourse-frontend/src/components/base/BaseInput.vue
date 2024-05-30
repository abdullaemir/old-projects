<template>
  <div class="input__container">
    <div class="input__wrapper">
      <input
        :id="id"
        class="input"
        :class="[{'input__error':errorMessage && !isFocus}, modifiers, heightClasses]"
        :name="name.toLowerCase()"
        :placeholder="placeholder || label"
        :type="computedType"
        v-bind="$attrs"
        :value="value"
        @change="handleChange(value)"
        @blur="handleChange(value)"
        @input="inputValue($event.target.value)"
        @focusin="isFocus=true"
        @focusout="isFocus=false"
      />

      <label
        :class="['input__label', {'input__label_none': visuallyHiddenLabel && value}]"
        :for="id"
      >
        {{ label || placeholder }}
      </label>

      <button
        v-if="props.type === 'password'"
        :aria-label="isShowPassword ? 'Hide password' : 'Show password'"
        class="input__button--password"
        type="button"
        @click.prevent.stop="isShowPassword = !isShowPassword"
      >
        <svg
          v-if="isShowPassword"
          width="24"
          height="22"
          viewBox="0 0 16 10"
          fill="none"
        >
          <path
            fill="#bcc7cd"
            d="M0 5s2.7 5 8 5 8-5 8-5-3.3-5-8-5-8 5-8 5Zm1.7 1.1ZM2 5l1-1c1.4-1.1 3.4-2 5-2a8.5 8.5 0 0 1 6 3l-1
            1.1A7.4 7.4 0 0 1 2 5Z"
          />
          <path
            fill="#bcc7cd"
            fill-rule="evenodd"
            d="M8 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-.8-2.2a1 1 0 1 0 0-2.2 1 1 0 0 0 0 2.2Z"
          />
        </svg>

        <svg
          v-else
          width="24"
          height="22"
          fill="none"
        >
          <path
            fill="#C6D7F1"
            d="M21.9 0 2.1 19.8l1.4 1.4 4-4A13.4 13.4 0 0 0 24 10.4c-1-2.2-2.5-4-4.4-5.3l3.8-3.8L22 0Zm-4.2 7
            .2-.1c1.4.9 2.6 2 3.5 3.5a11 11 0 0 1-12 5l.8-1A6 6 0 0 0 17.7 7Z"
          />
          <path
            fill="#C6D7F1"
            d="M2.6 10.4c.9 1.4 2 2.6 3.4 3.5l-1.6 1.6c-1.9-1.3-3.4-3-4.4-5.1a13.4 13.4 0 0 1 16.3-6.8L12 8a2.3
            2.3 0 1 0-2.4 2.4l-2.3 2.3a6 6 0 0 1-1-5.9 11 11 0 0 0-3.7 3.7Z"
          />
        </svg>
      </button>
    </div>

    <BaseError
      v-if="showErrors"
      :is-focus="isFocus"
      :error-message="errorMessage ?? ''"
      :meta="meta"
    />
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import { toRef, ref, computed, onMounted, watch } from "vue";

import BaseError from "./BaseError.vue";

const emits = defineEmits(["update:modelValue"]);

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
  modifiers: {
    default: "",
    type: [String, Array, Object],
  },
  size: {
    type: String,
    default: 'large',
    description: "large/medium"
  },
  modelValue: {},
  showErrors: {
    type: Boolean,
    default: true,
  }
});

const isFocus = ref(false);
const isShowPassword = ref(false);

const computedType = computed(() => {
  if (props.type === "password") {
    return isShowPassword.value ? "text" : "password";
  }

  return props.type;
});

/**
 * Добавляет класс размера для .input
 * @returns {string} - Класс для .input - варианты: "large/medium"
 */
const heightClasses = computed(() => {
  return `input--${props.size}`
})

const visuallyHiddenLabel = computed(()=>{
  if (typeof props.modifiers === "string" && props.modifiers==="search") return true
  if (typeof props.modifiers === "object" && props.modifiers.search === true) return true
  if (Array.isArray(props.modifiers) && props.modifiers.includes("search")) return true
})

const {
  value,
  meta,
  errorMessage,
  handleChange
} = useField(toRef(props, "name"), toRef(props, "rules"), {type: props.type,validateOnValueUpdate: false,
  initialValue: ''});

const inputValue = (event) => {
  value.value = event
  emits('update:modelValue', value.value)
  handleChange(value.value);
}

const modelValue = toRef(props, "modelValue");

watch(modelValue, (newValue) => {
  handleChange(newValue);
}, {deep: true})

onMounted(() => {
  if (value.value) {
    emits('update:modelValue', value.value)
    return
  }
  value.value = modelValue.value
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

.input {
  width: 100%;
  height: 65px;
  padding: 22px 20px;
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
  padding: 32px 20px 12px;
}

.input--medium:focus,
.input--medium:not(:placeholder-shown) {
  padding: 30px 20px 14px;
}

.input.search:focus,
.input.search:not(:placeholder-shown) {
  padding: 22px 20px;
}

.input:disabled {
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

.input:focus.search ~ .input__label {
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

.input__error, .input__error.input:disabled, .input__error:hover:not(.input:disabled) {
  transition: all 0.3s ease-in-out;
  border: var(--input-border-width) solid var(--input-border-color-error);
}
</style>
