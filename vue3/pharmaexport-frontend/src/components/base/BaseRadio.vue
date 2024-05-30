<template>
  <label role="radio" class="radio__wrapper">
    <input
      ref="radio"
      :id="id"
      class="radio"
      :name="useName"
      type="radio"
      v-bind="$attrs"
      :value="value"
      @change="handleChange(value)"
      :checked="$attrs.checked ?? checked"
    />
    <span
      :class="[classWrapper, errorMessage ? 'radio__element_error' : '',
               typeElement === 'radio' ? 'radio__element' : 'checkbox__element']"
    />
    <span
      class="radio__label"
      :class="[classLabel]"
    >
      <slot/>
    </span>
  </label>
  <Transition name="show-errors">
    <p v-if="!useGroup && (errorMessage || !meta.valid && meta.dirty && meta.touched)" class="input__error-message">
      {{ errorMessage }}
    </p>
  </Transition>
</template>

<script setup>
import {inject, toRefs, ref, onMounted} from "vue";
import {useField} from 'vee-validate';

const props = defineProps({
  classLabel: {
    default: null,
    description: "Style from radio label",
    type: [Array, Object, String],
  },
  classWrapper: {
    default: null,
    description: "Style from radio fields",
    type: [Array, Object, String],
  },
  name: {
    type: String,
  },
  id: {
    required: true,
    type: String,
  },
  value: {
    default: true,
    type: [String, Boolean],
  },
  rules: {
    default: null,
    type: [String, Object],
  },
  typeElement: {
    default: 'radio',
    required: false,
    type: String,
  },
});

const radio = ref(null)
const useGroup = inject("useGroup", false)
const useRules = inject("useRules", props.rules)
const useName = inject("useName", props.name)

const {name, value} = toRefs(props);
const {checked,errorMessage, handleChange, meta} = useField(useName, useRules, {
  type: 'radio',
  checkedValue: value,
  uncheckedValue: false,
});

const initializationRadio = () => {
  const checked = radio.value.checked
  if (checked) handleChange(value.value)
}

onMounted(() => {
  initializationRadio();
});
</script>

<script>
export default {
  name: "BaseRadio",
  inheritAttrs: false,
};
</script>

<style scoped>
.radio__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 28px;
  cursor: pointer;
}

.radio {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.radio__element {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border: var(--radio-border);
  border-radius: 50%;
  background-color: var(--radio-background-color);
}

.radio:checked + .radio__element::after {
  content: "";
  display: block;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: var(--radio-checked-color);
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
  border: var(--radio-border);
  border-radius: 4px;
  background-color: var(--radio-background-color);
  box-shadow: inset 0 2px 0 rgb(0 0 0 / 0.07);
}

.radio:checked + .checkbox__element {
  background-color: var(--pink);
}

.radio:checked + .checkbox__element::after {
  content: "";
  position: absolute;
  display: block;
  width: 6px;
  height: 10px;
  top: 2px;
  border: solid var(--radio-border-width);
  border-color: var(--radio-border-color);
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.radio__label {
  display: block;
  font-size: 12px;
}

input[type="radio"]:not(:disabled) ~ .radio__element_error {
  border: var(--radio-border-width) solid var(--radio-color-error);
}

input[type="radio"]:disabled ~ span {
  color: var(--radio-label-color-disabled);
}

input[type="radio"]:disabled ~ .radio__element {
  background-color: var(--radio-background-color-disabled);
}

input[type="radio"]:disabled ~ .radio__element::after {
  background-color: var(--radio-checked-color-disabled);
}
</style>
