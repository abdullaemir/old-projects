<template>
  <div class="radio__wrapper">
    <input
      :id="id"
      :checked="isChecked"
      class="radio"
      :class="[classNameRadio]"
      :name="name"
      type="radio"
      :value="value"
      v-bind="$attrs"
      @change="$emit('change', $event.target.value)"
    />
    <label
      class="radio__label"
      :class="[classNameLabel]"
      :for="id"
    >
      <span
        class="radio--custom"
        :class="[classNameCustomRadio]"
      />
      <slot />
    </label>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  classNameCustomRadio: {
    type: [
      Array,
      String,
    ],
  },
  classNameLabel: {
    type: [
      Array,
      String,
    ],
  },
  classNameRadio: {
    type: [
      Array,
      String,
    ],
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  id: {
    required: true,
    type: String,
  },
  modelValue: {
    default: "",
  },
  name: {
    required: true,
    type: String,
  },
  value: {
    default: undefined,
    type: [
      String,
      Number,
    ],
  },
});

const isChecked = computed(() => props.modelValue == props.value);
</script>

<style>
.radio__wrapper {
  position: relative;
  padding-left: 32px;
}

.radio {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  cursor: pointer;
}

.radio--custom {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 2px solid var(--blue-lightest-2);
  border-radius: 50%;
  background-color: var(--white);
  transition-property: border-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.radio:checked ~ .radio__label .radio--custom {
  border-color: var(--blue-6);
}

.radio--custom::after {
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: transparent;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.radio:checked ~ .radio__label .radio--custom::after {
  background-color: var(--blue-6);
}

.radio__label {
  display: block;
  font-weight: 500;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  color: var(--blue-darkest);
  cursor: pointer;
}
</style>
