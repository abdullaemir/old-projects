<template>
  <div class="textarea__container">
    <div class="textarea__wrapper">
      <textarea
        :id="id"
        class="textarea"
        :class="{'textarea__error': errorMessage && !isFocus}"
        :name="name.toLowerCase()"
        :placeholder="placeholder || label"
        v-bind="$attrs"
        v-model.trim="value"
        @change="handleChange"
        @blur="handleChange"
        @focusin="isFocus=true"
        @focusout="isFocus=false"
      />
      <label
        class="textarea__label"
        :for="id"
      >
        {{ label }}
      </label>
    </div>
    <BaseError
      :is-focus="isFocus"
      :error-message="errorMessage ?? ''"
      :meta="meta"
    />
  </div>
</template>

<script setup>
import {toRef, ref} from "vue";
import {useField} from "vee-validate";

import BaseError from "./BaseError.vue";

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
    type: [String, Object],
  },
});

const isFocus = ref(false)
const {
  value,
  meta,
  errorMessage,
  handleChange
} = useField(toRef(props, "name"), props.rules, {validateOnValueUpdate: false,});

</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<style scoped>
.textarea__wrapper {
  position: relative;
  overflow: hidden;
}

@media (max-width: 767px) {
  .textarea__wrapper:not(:last-child) {
    margin-bottom: 24px;
  }
}

.textarea {
  display: block;
  width: 100%;
  height: 200px;
  padding: 32px 20px 20px;
  border: 1px solid #e7f0fe;
  line-height: 150%;
  resize: none;
  outline: none;
  transition-property: padding,
  border-color,
  background-color;
  border: var(--textarea-border) var(--textarea-border-color);
  border-radius: var(--textarea-border-radius);
  font-weight: var(--textarea-font-weight);
  font-size: var(--textarea-font-size);
  font-family: inherit;
  color: var(--textarea-color);
  background-color: var(--textarea-background-color);
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .textarea {
    height: 148px;
  }
}

@media (any-pointer: fine) {
  .textarea:hover {
    border-color: #d9e6fb;
    background-color: #f8f9fa;
  }
}

.textarea:focus,
.textarea:active {
  border-color: var(--textarea-border-color-active);
  background-color: var(--textarea-background-color-active);
}

.textarea:focus,
.textarea:not(:placeholder-shown) {
  padding: 32px 20px 12px;
}

.textarea:disabled {
  border-color: var(--textarea-border-color-disabled);
  background-color: var(--textarea-background-color-disabled);
  opacity: 0.6;
  cursor: not-allowed;
}

.textarea::placeholder {
  font-size: 0;
}

.textarea::-webkit-scrollbar {
  width: 16px;
}

.textarea::-webkit-scrollbar-track {
  width: 16px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #ffffff;
}

.textarea::-webkit-scrollbar-thumb {
  width: 16px;
  border: 5px solid #ffffff;
  border-radius: 40px;
  background-color: #eeefef;
}

.textarea::-webkit-scrollbar-corner {
  background-color: #ffffff;
}

.textarea__error, .textarea__error.input:disabled, .textarea__error:hover:not(.textarea:disabled) {
  transition: all 0.3s ease-in-out;
  border: var(--textarea-border) var(--textarea-border-color-error);
}

.textarea__label {
  position: absolute;
  top: 17px;
  right: 20px;
  left: 20px;
  display: flex;
  align-items: flex-end;
  height: 32px;
  color: var(--textarea-label-color);
  background-color: #f6f7fb;
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
  .textarea:hover ~ .textarea__label {
    color: var(--textarea-label-color-hover);
  }
}

.textarea:focus ~ .textarea__label,
.textarea:not(:placeholder-shown) ~ .textarea__label {
  font-weight: var(--textarea-label-font-weight-active);
  font-size: var(--textarea-label-font-size-active);
  color: var(--textarea-label-color-active);
  transform: translateY(-50%);
}

.textarea:disabled ~ .textarea__label {
  color: var(--textarea-label-color-disabled);
  background-color: var(--textarea-background-color-disabled);
}

.show-errors-enter-active {
  animation: show-errors 0.3s;
}

.show-errors-leave-active {
  animation: show-errors 0.3s reverse;
}

@keyframes show-errors {
  0% {
    transform: translateY(-8px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

.textarea__error, .textarea__error.textarea:disabled, .textarea__error:hover:not(.textarea:disabled) {
  transition: all 0.3s ease-in-out;
  border: var(--input-border-width) solid var(--input-border-color-error);
}
</style>
