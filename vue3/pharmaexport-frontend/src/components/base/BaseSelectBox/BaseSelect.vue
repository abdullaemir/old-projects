<template>
  <div class="select__wrapper">
    <div :class="['select', stateClasses, heightClasses]">
      <div
        ref="selectCombobox"
        :id="`select-${id}-combobox`"
        :aria-expanded="dropdownOpen.toString()"
        aria-label="Select"
        :aria-owns="`select-${id}-listbox`"
        class="select__select-box"
        :class="{'error': errorMessage && !isDropdownOpen}"
        role="combobox"
        @click.stop.prevent="updateStateDropdown($event)"
      >
        <div class="select__box-content">
          <slot v-if="prepend" name="prepend">
            <i class="select__prepend-icon"></i>
          </slot>

          <input
            v-if="remote"
            :value="searchRemote"
            ref="inputSearch"
            type="text"
            v-bind="$attrs"
            :class="['select__input-remote']"
            :disabled="disabled"
            :id="`select-${id}-input`"
            :name="name.toLowerCase()"
            :placeholder="label || placeholder"
            @focusin="isFocusSearch=true"
            @focusout="onBlurRemoteSearch"
            @input.stop.prevent="onInputSearch($event.target.value)"
          />

          <div v-if="!remote" ref="selectContainer" class="select__selected-options">
            <BaseSelectSelectedTags
              :selected-options="selectedOptions"
              @deselect="deselect"
            ></BaseSelectSelectedTags>

            <input
              ref="selectField"
              aria-autocomplete="list"
              :aria-controls="`select-${id}-listbox`"
              :aria-labelledby="`select-${id}-combobox`"
              :value="value"
              :id="`select-${id}-input`"
              :name="name"
              :disabled="disabled"
              @change="handleChange"
              @input="handleChange"
              class="select__input"
              readonly
              tabindex="-1"
            />
            <label
              :class="['select__label', classNameLabel, {'select__label-active': selectedOptions && selectedOptions.length || dropdownOpen }]"
              :for="`select-${id}-input`"
            >
              {{ label }}
            </label>
          </div>
        </div>

        <BaseSelectAppendActions :show-clear-button="showClearButton" @clear-select="clearSelect"/>

        <BaseSelectDropdownMenu
          :type-ahead-pointer="typeAheadPointer"
          :dropdown-open="dropdownOpen"
          @close-dropdown="closeDropdown"
        >
          <BaseSelectOptions
            :selectedOptions="selectedOptions"
            @update:selectedOptions="select"
            @update:typeAheadPointer="typeAheadPointer = $event"
          >
            <template #dropdownItem="slotProps">
              <slot name="dropdownItem" v-bind="{selectItem: slotProps.option, selected: slotProps.selectedOptions}"></slot>
            </template>
          </BaseSelectOptions>
        </BaseSelectDropdownMenu>
      </div>
    </div>
    <Transition name="show-errors">
      <p
        v-if="(!isDropdownOpen && (!remote ? errorMessage || !meta.valid && meta.dirty && meta.touched : errorMessage && !isFocusSearch))"
        class="error-message"
      >
        {{ errorMessage }}
      </p>
    </Transition>
    <div v-if="remote && multiple" class="select__remote-tags-wrapper">
      <BaseTag
        v-for="(option, index) in value"
        :data="option"
        :tag="props.tag"
        :key="`select-${props.id}-tag-${index}-selected`"
        @deselect="deselect($event)"
        rounded
        short
      ></BaseTag>
    </div>
  </div>
</template>

<script setup>
import {computed, toRef, ref, provide, watch, onMounted, nextTick} from "vue";
import {useField} from "vee-validate";

import { useDropdown } from "~/components/base/BaseDropdown/BaseDropdown.vue";

import BaseTag from "../BaseTag.vue"
import BaseSelectAppendActions from "./BaseSelectAppendActions.vue";
import BaseSelectDropdownMenu from "./BaseSelectDropdownMenu.vue";
import BaseSelectOptions from "./BaseSelectOptions.vue";
import BaseSelectSelectedTags from "./BaseSelectSelectedTags.vue"

import compareObjects from "./helpers/compareObject.js";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  labelSearch: {
    type: String,
    default: 'Start typing to search'
  },
  clasSearchInput: {
    type: [Array, Object, String],
    default: null,
  },
  classNameLabel: {
    type: [Array, Object, String],
    default: null,
  },
  size: {
    type: String,
    default: 'large',
    description: "large/medium"
  },
  options: {
    type: Array,
    default: () => []
  },
  disabledOptions: {
    type: Array,
    default: () => []
  },
  tag: {
    type: String,
    default: '',
  },
  valueKey: {
    type: [String],
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  filterable: {
    type: Boolean,
    default: true,
  },
  remote: {
    type: Boolean,
    default: false,
  },
  remoteMethod: {
    type: Function,
  },
  prepend: {
    type: Boolean,
    default: false,
  },
  noMatchText: {
    type: String,
    default: 'No matches found',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rules: {
    default: '',
    type: [String, Object],
  },
  showClearTag: {
    type: Boolean,
    default: true,
  },
  showArrowIndicator: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    default: '',
  },
})

// для поддержки работы v-model
const emits = defineEmits({
  "update:modelValue": (value) => true,
  changeSelect: (val) => true,
  closeDropdown: () => true,
  clearSelect: () => true
});

const selectContainer = ref(null)
const selectContainerWidth = ref(null)

const initSelectContainerWidth = () => {
  if (props.remote) return
  const {width} = selectContainer.value.getBoundingClientRect()
  selectContainerWidth.value = width
}

provide("useProps", props);
provide("selectContainerWidth", selectContainerWidth);

const selectCombobox = ref(null);
const inputSearch = ref(null);
const clearButton = ref(null);
const selectField = ref(null)
const selectedOptions = ref([]);
const initSelect = ref(true);
const isFocusSearch = ref(false);
const searchRemote = ref(null);
const typeAheadPointer = ref(null)

// для поддержки работы v-model
const modelValue = toRef(props, "modelValue");

const {
  value,
  meta,
  errorMessage,
  handleChange,
} = useField(toRef(props, "name"), props.rules, {validateOnValueUpdate: false, initialValue: ''});

/**
 * Возвращает состояние списка опций.
 * @returns {boolean} - Открыт/закрыт.
 */
const dropdownOpen = computed(()=>{
  return isDropdownOpen.value && !props.loading;
})

const isDropdownOpen = computed(()=>useDropdown.isDropdownOpen(`select-${props.id}-listboxD`));

const stateClasses = computed(()=>{
  return {
    'select--focus': isFocusSearch.value || dropdownOpen.value,
    'select--open': dropdownOpen.value,
    'select--multiple': props.multiple,
    'select--filterable': props.filterable,
    'select--loading': props.loading,
    'select--disabled': props.disabled,
    'select--rounded': props.rounded,
  };
})

/**
 * Добавляет класс размера для .select
 * @returns {string} - Класс для .select - варианты: "large/medium"
 */
const heightClasses = computed(() => {
  return `select--${props.size}`
})

const closeDropdown = () => {
  handleChange(value.value);
  useDropdown.closeDropdown()
  emits("closeDropdown", value.value)
}

const updateStateDropdown = (event) => {
  if (props.loading || props.disabled || (props.remote && !searchRemote.value)) return
  if (isDropdownOpen.value) {
    closeDropdown()
  } else {
    useDropdown.openDropdown(`select-${props.id}-listboxD`, event, { offsetX: -1 })
  }
}

/**
 * Показывает/скрывает кнопку удаления выбранной опции для селекта с одиночным выбором.
 * @returns {boolean} - Показать/скрыть.
 */
const showClearButton = computed(()=>{
  return props.clearable &&
    !isDropdownOpen.value &&
    !props.loading &&
    !props.disabled &&
    props.multiple ?
      value.value.length > 0 || (props.remote && !!searchRemote.value)
      : !!value.value || (props.remote && !!searchRemote.value)
})

/**
 * Удаляет опцию.
 * Для селекта с одиночным выбором удаляются все выбранные опции, для селекта с мультивыбором удаляется только та
 * опция, по кнопке которой произошло нажатие.
 * @param {string||object} option - Опция селекта.
 */
const deselect = (option = null) => {
  const isValueKey = props.valueKey && Object.prototype.hasOwnProperty.call(option, props.valueKey)
  if (typeof option === "object") {
    if (isValueKey) {
      value.value = value.value.filter((item)=>!compareObjects(item, option[props.valueKey]))
    } else {
      value.value = value.value.filter((item)=>!compareObjects(item, option))
    }
    handleChange(value.value);
    emits('update:modelValue', value.value)
    return
  }
  if (typeof option === "string" || typeof option === "number") {
    value.value = value.value.filter((item)=>!compareObjects(item,option))
    handleChange(value.value);
    emits('update:modelValue', value.value)
  }
}

const getOptionText = (option) => {
  if (typeof option === 'object') {
    const isTag = Object.prototype.hasOwnProperty.call(option, props.tag);
    return isTag ? option[props.tag] : Object.values(option)[0];
  }
  return option
}

const requestRemoteSearch = (query) => {
  props.remoteMethod(query)
}

const onInputSearch = (event) => {
  searchRemote.value = event
  requestRemoteSearch(event)
  if (props.remote && !searchRemote.value) {
    closeDropdown()
    return
  }
  useDropdown.openDropdown(`select-${props.id}-listboxD`, selectCombobox.value, { offsetX: -1 })
}

const onBlurRemoteSearch = () => {
  isFocusSearch.value = false;
  if (!props.multiple) {
    searchRemote.value = getOptionText(selectedOptions.value[0]) || searchRemote.value
  }
}

/**
 * Удаляет все выбранные опции.
 */
const clearSelect = () => {
  emits("clearSelect")
  searchRemote.value = '';
  if (props.multiple) {
    handleChange([]);
    emits('update:modelValue', []);
    return
  }
  handleChange('');
  emits('update:modelValue', '');
  if (props.remote) {
    requestRemoteSearch('')
  }
}

/**
 * Выбирает опцию.
 * Для селекта с одиночным выбором предыдущая выбранная опция заменяется новой.
 * Для селекта с мультивыбором добавляются все выбранные опции, если их нет, иначе удаляются.
 * @param {string||object} option - Опция селекта.
 */
const select = (option) => {
  let options = JSON.parse(JSON.stringify(value.value));

  const isValueKey = props.valueKey && Object.prototype.hasOwnProperty.call(option, props.valueKey)

  if (props.multiple) {
    if (!options) options = [];
    if (typeof option === "object") {
      if (isValueKey) {
        const optionIndex = options.findIndex((item) => compareObjects(item,option[props.valueKey]));
        if (optionIndex > -1) {
          options.splice(optionIndex, 1);
        } else options.push(option[props.valueKey])
        handleChange(options);
        emits('update:modelValue', options)
        emits('changeSelect', option[props.valueKey])
        return
      }
      const optionIndex = options.findIndex((item) => compareObjects(item,option));
      if (optionIndex > -1) {
        options.splice(optionIndex, 1);
      } else options.push(option)
      handleChange(options);
      emits('update:modelValue', options)
      emits('changeSelect', option)
    }

    if (typeof option === "string" || typeof option === "number") {
      const optionIndex = options.findIndex((item) => compareObjects(item,option));
      if (optionIndex > -1) {
        options.splice(optionIndex, 1);
      } else options.push(option)
      handleChange(options);
      emits('update:modelValue', options)
      emits('changeSelect', option)
    }
  } else {
    closeDropdown();
    if (typeof option === "object") {
      if (isValueKey) {
        if (props.remote) {
          searchRemote.value = option[props.tag]
        }
        handleChange(option[props.valueKey]);
        emits('update:modelValue', option[props.valueKey])
        emits('changeSelect', option[props.valueKey])
        return
      }
      if (props.remote) {
        searchRemote.value = option[props.tag]
      }
      handleChange(option);
      emits('update:modelValue', option)
      emits('changeSelect', option)
    }

    if (typeof option === "string" || typeof option === "number") {
      if (props.remote) {
        searchRemote.value = option
      }
      handleChange(option);
      emits('update:modelValue', option)
      emits('changeSelect', option)
    }
  }
}

/**
 * Фильтр значений ввода в селект
 * Фильтрует ввод при инициализации селекта и при изменении значений в селекте
 * Защищает ввод от недействительных значений, которых нет в опциях и с неверной структурой
 * @param {string||number||object||array} values - Опция селекта.
 * @return {boolean} - возвращает true если неверные значения найдены, и false если нет
 */
const filterForbiddenValue = (values) => {
  if (props.multiple) {
    if (!Array.isArray(values)) {
      handleChange([]);
      emits('update:modelValue', [])
      return true
    }
    return false
  }

  if (Array.isArray(values)) {
    handleChange('');
    emits('update:modelValue', '')
    return true
  }
  if (props.valueKey) {
    if (typeof values === "object") {
      handleChange('');
      emits('update:modelValue', "")
      return true
    }
    if ((typeof values === "string" || typeof values === "number") && typeof props.options[0] === "object") {
      if (!props.options.some(item=>compareObjects(item[props.valueKey], values))) {
        handleChange('');
        emits('update:modelValue', "")
        return true
      }
    }
    return false
  }
  if (typeof values === "object") {
    if (typeof props.options[0] === "string" || typeof props.options[0] === "number" || (typeof props.options[0] === "object" && !props.options.some(item=>compareObjects(item, values)))) {
      handleChange('');
      emits('update:modelValue', "")
      return true
    }
  }
  if ((typeof values === "string" || typeof values === "number") && props.options[0] === "object" && !props.valueKey) {
    handleChange('');
    emits('update:modelValue', "")
    return true
  }
  if (!props.options.some(item=>compareObjects(item, values))) {
    handleChange('');
    emits('update:modelValue', "")
    return true
  }
  return false
}

/**
 * Обновляет отображение выбранных опций в выпадающем меню
 * Отправляет значения ввода на проверку
 */
const updateSelectedOptions = (options) => {
  if (!options) {
    selectedOptions.value = []
    return
  }
  if (filterForbiddenValue(options)) return
  if (props.multiple) {
    selectedOptions.value = options.reduce((acc, current) => {
      if (typeof current === "object") {
        return [...acc, ...props.options.filter(item=>compareObjects(item,current))]
      }
      if (typeof current === "string" || typeof current === "number") {
        if (props.valueKey && typeof props.options[0] === "object") {
          return [...acc, ...props.options.filter(item=>item[props.valueKey] === current)]
        }
        return [...acc, ...props.options.filter(item=>item === current)]
      }
      return acc
    },[])
    return;
  }
  if (typeof options === "object") {
    selectedOptions.value = props.options.filter(item=>compareObjects(item,options))
    return;
  }
  if (typeof options === "string" || typeof options === "number") {
    if (props.valueKey && typeof props.options[0] === "object") {
      selectedOptions.value = props.options.filter(item=>item[props.valueKey] === options)
      return;
    }
    selectedOptions.value = props.options.filter(item=>item === options)
  }
}

onMounted(()=> {
  if (value.value) {
    updateSelectedOptions(value.value);
    emits('update:modelValue', value.value);
    return
  }
  value.value = modelValue.value
  nextTick(()=>initSelectContainerWidth())
})

watch(()=>props.options, (newValue) => {
  updateSelectedOptions(value.value)
}, {deep: true})

watch(modelValue, (newValue) => {
  handleChange(newValue);
  nextTick(()=>initSelectContainerWidth())
}, {deep: true})

watch(value, (newVal) => {
  updateSelectedOptions(newVal)
  initSelect.value ? initSelect.value = false : handleChange(newVal);
  nextTick(()=>initSelectContainerWidth())
}, {deep: true})

defineExpose({
  clearSelect,
})
</script>

<style scoped>
*:focus-visible {
  outline: 0;
  outline-offset: 0;
}

.select__wrapper {
  width: 100%;
}

.select {
  position: relative;
}

.select--small {
  height: var(--select-small-height);
  font-size: var(--select-medium-font-size);
}

.select--medium {
  height: var(--select-medium-height);
  font-size: var(--select-medium-font-size);
}

.select--large {
  height: var(--select-large-height);
  font-size: var(--select-large-font-size);
}

.select__select-box {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  padding: 0 10px 0 20px;
  border: var(--select-border-width) solid var(--select-border-color);
  border-radius: var(--select-border-radius);
  background-color: var(--select-background-color);
  transition-property:
    border-color,
    border-radius,
    background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  cursor: pointer;
}

.select__box-content {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.select__prepend-icon {
  height: 20px;
  width: 20px;
  background: center center no-repeat url("~/assets/icons/search.svg");
  margin-right: 10px;
  align-self: center;
}

.select--rounded.select--small .select__select-box {
  border-radius: calc(var(--select-small-height)/2);
}
.select--rounded.select--medium .select__select-box {
  border-radius: calc(var(--select-medium-height)/2);
}
.select--rounded.select--large .select__select-box {
  border-radius: calc(var(--select-large-height)/2);
}

.select__select-box:not(.error):hover {
  border: var(--select-border-width) solid var(--select-border-color-hover);
  background-color: var(--select-background-color-hover);
}

.select--filterable .select__select-box {
  cursor: text;
}

.select--disabled .select__select-box {
  color: var(--select-color-disabled);
  background-color: var(--select-background-color-disabled);
  border-color: var(--select-border-color-disabled);
  cursor: default;
}

.select--disabled:hover .select__select-box {
  background-color: var(--select-background-color-disabled);
}

.select--focus .select__select-box {
  border-color: var(--select-border-color-active);
  background-color: var(--select-background-color-active);
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
}

.select--open .select__select-box {
  border-bottom-color: transparent;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.select__selected-options {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: flex-end;
  overflow: hidden;
}

.select__selected-options::-webkit-scrollbar {
  display: none;
}

.select--medium .select__selected-options {
  padding-bottom: calc(4px - var(--select-border-width));
}

.select--large .select__selected-options {
  padding-bottom: calc(12px - var(--select-border-width));
}

.select--multiple .select__selected-options {
  align-items: flex-end;
}

.select__input {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  opacity: 0;
}

.select__input::placeholder {
  font-size: 0;
}

.select__input::-webkit-search-cancel-button {
  display: none;
}

.select--multiple.select--filterable .select__input {
  bottom: auto;
}

input.select__input-remote {
  width: 100%;
  height: 100%;
  font-weight: var(--select-font-weight);
  color: var(--select-color);
  font-family: inherit;
  background-color: transparent;
  border-radius: 0;
  border-color: transparent;
  border-width: 0;
}
input.select__input-remote:hover,
input.select__input-remote:focus-within,
input.select__input-remote:focus-visible,
input.select__input-remote:active  {
  outline: none;
}
input.select__input-remote::placeholder {
  color: var(--select-label-color);
  font-weight: var(--select-label-font-weight-active);
  font-family: inherit;
}
input.select__input-remote:disabled::placeholder {
  color: var(--select-label-color-disabled);
}
.select--medium input.select__input-remote, .select--medium input.select__input-remote::placeholder  {
  font-size: var(--select-label-medium-font-size);
}
.select--large input.select__input-remote, .select--large input.select__input-remote::placeholder {
  font-size: var(--select-label-large-font-size);
}

.select__label {
  position: absolute;
  top: 50%;
  color: var(--select-label-color);
  transform: translateY(-50%);
  transition-property:
    font-weight,
    font-size,
    color,
    transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.select--medium .select__label{
  font-size: var(--select-label-medium-font-size);
}

.select--large .select__label{
  font-size: var(--select-label-large-font-size);
}

@media (any-pointer: fine) {
  .select:hover .select__label{
    color: var(--select-label-color-hover);
  }
}

:deep(.select__selected ~ .select__label) {
  font-weight: var(--select-label-font-weight-active);
  color: var(--select-label-color-active);
  transform: var(--select-label-transform);
}

:deep(.select--medium .select__selected ~ .select__label) {
  font-size: var(--select-label-medium-font-size-active);
}

:deep(.select--large .select__selected ~ .select__label) {
  font-size: var(--select-label-large-font-size-active);
}

.select__input:disabled ~ .select__label {
  color: var(--select-label-color-disabled);
}

.select__label-active, .select__input:focus ~ .select__label {
  font-weight: var(--select-label-font-weight-active);
  color: var(--select-label-color-active);
  transform: var(--select-label-transform);
}

.select--medium .select__input:focus ~ .select__label, .select--medium .select__label-active {
  font-size: var(--select-label-medium-font-size-active);
}

.select--large .select__input:focus ~ .select__label, .select--large .select__label-active {
  font-size: var(--select-label-large-font-size-active);
}

.error, .error.input:disabled{
  transition: all 0.3s ease-in-out;
  border: 1px solid var(--pink);
}

.error-message {
  color: var(--pink);
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

.select__remote-tags-wrapper {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 8px;
}
</style>
