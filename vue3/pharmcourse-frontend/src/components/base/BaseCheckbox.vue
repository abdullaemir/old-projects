<template>
  <div :class="[classCheckboxContainer]">
    <label class="checkbox__wrapper">
      <input
        ref="checkbox"
        :id="id"
        class="checkbox"
        :name="useName"
        type="checkbox"
        v-bind="$attrs"
        :value="value"
        @change="handleChange(value)"
        :checked="$attrs.checked ?? checked"
      />
      <span
        class="checkbox__element"
        :class="[classCheckboxCustom, errorMessage ? 'checkbox__element_error' : '']"
      />
      <p
        class="checkbox__label"
        :class="[classCheckboxLabel]"
      >
        <slot/>
      </p>
    </label>
    <Transition name="show-errors">
      <p v-if="!useGroup && (errorMessage || !meta.valid && meta.dirty && meta.touched)" class="input__error-message">
        {{ errorMessage }}
      </p>
    </Transition>
  </div>
</template>

<script setup>
import {inject, toRefs, ref, onMounted} from "vue";
import {useField} from 'vee-validate';

const props = defineProps({
  classCheckboxContainer: {
    default: null,
    type: [
      Array,
      Object,
      String,
    ],
  },
  classCheckboxCustom: {
    default: null,
    type: [
      Array,
      Object,
      String,
    ],
    description: "Style from checkbox fields"
  },
  classCheckboxLabel: {
    default: null,
    type: [
      Array,
      String,
    ],
    description: "Style from checkbox label"
  },
  id: {
    required: true,
    type: String,
  },
  name: {
    type: String,
  },
  rules: {
    default: null,
    type: [String, Object],
  },
  value: {
    default: true,
    type: [String, Boolean],
  },
});
const checkbox = ref(null)
const useGroup = inject("useGroup", false)
const useRules = inject("useRules", props.rules)
const useName = inject("useName", props.name)

const {name, value} = toRefs(props);
const {checked,errorMessage, handleChange, meta} = useField(useName, useRules, {
  type: 'checkbox',
  checkedValue: value,
  uncheckedValue: false,
});

const initializationCheckbox = () => {
  const checked = checkbox.value.checked
  if (checked) handleChange(value.value)
}

onMounted(() => {
  initializationCheckbox();
});
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<style scoped>
.checkbox__wrapper {
  position: relative;
  display: block;
  padding-left: 28px;
  cursor: pointer;
}

.checkbox {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.checkbox__element {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border: var(--checkbox-border-width) solid var(--checkbox-border-color);
  border-radius: 4px;
  background-color: var(--checkbox-background-color);
  box-shadow: inset 0 2px 0 rgb(0 0 0 / 0.07);
}

.checkbox:checked + .checkbox__element::after {
  content: "";
  display: block;
  width: 6px;
  height: 10px;
  border: solid var(--checkbox-checked-color);
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

input[type="checkbox"]:checked:disabled + .checkbox__element::after {
  content: "";
  display: block;
  width: 6px;
  height: 10px;
  border: solid var(--checkbox-checked-color-disabled);
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.checkbox__label {
  display: block;
  font-size: 12px;
}

input[type="checkbox"]:not(:disabled) ~ .checkbox__element_error {
  border: var(--checkbox-border-width) solid var(--checkbox-color-error);
}

input[type="checkbox"]:disabled ~ span {
  color: var(--checkbox-label-color-disabled);
}

input[type="checkbox"]:disabled ~ .checkbox__element {
  background-color: var(--checkbox-background-color-disabled);
}

.input__error-message {
  color: var(--checkbox-color-error);
  font-size: 10px;
  font-weight: 500;
  margin-top: 4px;
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
</style>
