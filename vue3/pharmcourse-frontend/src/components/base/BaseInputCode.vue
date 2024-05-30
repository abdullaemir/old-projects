<template>
  <div class="input-code__container">
    <div class="input-code__wrapper" @mousemove="isFocusWrapper=true" @mouseout="isFocusWrapper=false">
      <!-- TODO: табом попадаем на этот инпут -->
      <input
        :id="id"
        class="input-hidden"
        :name="name.toLowerCase()"
        type="text"
        v-bind="$attrs"
        :value="codeValuesStr"
        tabindex="-1"
      />
      <input
        v-for="input in codeValuesArr"
        :id="input.id"
        :key="input.id"
        v-mask="'#'"
        :value="input.value"
        @input.stop.prevent="inputCodeItem($event, input.id)"
        class="input"
        :class="[errorMessage && !isFocus ? 'input__error' : '', heightClasses]"
        type="text"
        placeholder="_"
        @focusin="isFocus=true"
        @focusout="!isFocusWrapper ? isFocus=false : ''"
        @keydown.left.stop.prevent="prevCodePart(input.id)"
        @keydown.right.stop.prevent="nextCodePart(input.id)"
        @keydown.delete.stop.prevent="deleteCodePart(input.id)"
      />
    </div>

    <BaseError
      :is-focus="isFocus"
      :error-message="errorMessage ?? ''"
      :meta="meta"
      class="input-code__box-error"
    />
  </div>
</template>

<script>
import {maska} from 'maska';

export default {
  name: "BaseInputTel",

  directives: {
    mask: maska
  },
};
</script>

<script setup>
import { mask } from 'maska'
import {ref, toRef, computed, watch, onMounted} from "vue";
import {defineRule, useField} from "vee-validate";
import BaseError from "./BaseError.vue";

const props = defineProps({
  id: {
    required: true,
    type: String,
  },
  lengthCode: {
    default: 4,
    type: [Number, String]
  },
  name: {
    required: false,
    type: String,
  },
  size: {
    default: 'large',
    type: [String],
    description: 'large|medium'
  },
  modelValue: {
    default: '',
    type: [Number, String]
  }
})

const emits = defineEmits(["update:modelValue"])

/**
 * Добавляет класс размера для .select
 * @returns {string} - Класс для .select - варианты: "large/medium"
 */
const heightClasses = computed(() => {
  return `input--${props.size}`
})

const isFocus = ref(false);
const isFocusWrapper = ref(false);
const {
  value,
  meta,
  errorMessage,
  handleChange
} = useField(toRef(props, "name"), 'required_code|code_length', {type: 'text', validateOnValueUpdate: false, initialValue: ''});

const codeValuesArr = ref([]);
const codeValuesStr=ref('');
const initFieldsCode = ref(false)

watch(toRef(props,'lengthCode'), (newVal) => {
  for (let item = 0; item<newVal; item++) {
    codeValuesArr.value.push({
      id: `input-${item}`,
      value: '',
    })
  }
}, {immediate: true})

const inputCodeItem = (event, inputId) => {
  const indexCurrent = codeValuesArr.value.findIndex(item => item.id === inputId)
  codeValuesArr.value.find(item => item.id === inputId).value = mask(event.target.value, '#');
  if (event.target.value && indexCurrent !== props.lengthCode-1) focusNextCodePart(inputId)
}

watch(codeValuesArr, (newVal)=>{
  codeValuesStr.value = newVal.reduce((acc,curr)=>{
    return acc.concat(curr.value || "_")
  }, '')
},{deep: true})

watch(codeValuesStr, (newVal) => {
  value.value = newVal
  emits("update:modelValue", value.value)
  if (!initFieldsCode.value) {
    initFieldsCode.value = true
    return
  }
  handleChange(value.value)
})

const prevCodePart = (current) => {
  const indexCurrent = codeValuesArr.value.findIndex(item => item.id === current)
  if (0 === indexCurrent) {
    document.getElementById(codeValuesArr.value[props.lengthCode-1].id).focus()
    return
  }
  document.getElementById(codeValuesArr.value[indexCurrent-1].id).focus()
}
const nextCodePart = (current) => {
  const indexCurrent = codeValuesArr.value.findIndex(item => item.id === current)
  if (indexCurrent === props.lengthCode-1) {
    document.getElementById(codeValuesArr.value[0].id).focus()
    return
  }
  document.getElementById(codeValuesArr.value[indexCurrent+1].id).focus()
}

const deleteCodePart = (current) => {
  const indexCurrent = codeValuesArr.value.findIndex(item => item.id === current)
  codeValuesArr.value[indexCurrent].value = '_'
}

const focusNextCodePart = (current) => {
  handleChange(value.value)
  nextCodePart(current)
}

watch(value, (newValue) => {
  [...String(newValue).replace(/[^\d]/gu,'_')].slice(0, props.lengthCode).map((item,index) => {
    codeValuesArr.value[index].value = item
  })
})

const modelValue = toRef(props, "modelValue");

watch(modelValue, (newValue) => {
  [...String(newValue).replace(/[^\d]/gu,'_')].slice(0, props.lengthCode).map((item,index) => {
    codeValuesArr.value[index].value = item
  })
})

onMounted(() => {
  if (value.value) {
    emits('update:modelValue', value.value)
    return
  }
  value.value = modelValue.value
})

defineRule('required_code', (value) => {
  const clearValue = String(value).replace(/[^\d]/gu, '')

  if (!clearValue || !clearValue.length) {
    return 'This field is required';
  }
  return true;
});

defineRule('code_length', (value) => {
  const clearValue = String(value).replace(/[^\d]/gu, '')
  const limit = props.lengthCode

  if (!clearValue || !clearValue.length) {
    return true;
  }
  if (clearValue.length !== limit) {
    return `This field should have held ${limit} characters`;
  }
  return true;
});
</script>

<style scoped>
.input-code__wrapper {
  position: relative;
  overflow: hidden;
  text-align: center;
}

.input-hidden {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.input {
  width: 100%;
  max-width: 50px;
  height: 65px;
  padding: 10px;
  border: var(--input-code-border-width) solid var(--input-code-border-color);
  border-radius: var(--input-code-border-radius);
  font-weight: var(--input-code-font-weight);
  font-size: var(--input-code-font-size);
  font-family: inherit;
  color: var(--input-code-color);
  background-color: var(--input-code-background-color);
  outline: none;
  transition-property:
    border-color,
    background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  margin: 0 8px;
  text-align: center;
}

.input--medium {
  height: var(--input-code-medium-height);
  font-size: var(--input-code-medium-font-size);
  max-width: 45px;
}

.input--large {
  height: var(--input-code-large-height);
  max-width: 50px;
  font-size: var(--input-code-large-font-size);
}

@media (any-pointer: fine) {
  .input:hover {
    border-color: var(--input-code-border-color-hover);
    background-color: var(--input-code-background-color-hover);
  }
}

.input:focus,
.input:active {
  border-color: var(--input-code-border-color-active);
  background-color: var(--input-code-background-color-active);
}

.input::placeholder {
  color: #8292A1;
  font-size: 24px;
}

.input--medium.input::placeholder  {
  font-size: 18px;
}

.input--large.input::placeholder  {
  font-size: 24px;
}

.input-code__box-error {
  text-align: center;
}

.input__error, .input__error.input:disabled, .input__error:hover:not(.input:disabled) {
  transition: all 0.3s ease-in-out;
  border: var(--input-code-border-width) solid var(--input-code-border-color-error);
}
</style>
