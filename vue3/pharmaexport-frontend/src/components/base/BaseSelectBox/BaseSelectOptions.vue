<template>
  <div  v-if="useProps.filterable" class="select__search-box input__container" @click.stop.prevent @mouseover.stop.prevent>
    <input
      aria-label="Search by options"
      v-model.trim="search"
      :id="`select-${useProps.id}-input-search`"
      :class="['select__search-input', useProps.clasSearchInput]"
      ref="searchField"
      :disabled="useProps.disabled"
      :placeholder="useProps.labelSearch"
      :readonly="!useProps.filterable"
      type="text"
      @click.stop.prevent
    />
  </div>

  <li
    v-for="(option, index) in filteredOptions"
    :id="`select-${useProps.id}-option-${index}`"
    :key="`select-${useProps.id}-option-${index}`"
    :aria-selected="index === typeAheadPointer ? true : null"
    :class="['select__dropdown-option', {'select__dropdown-option--disabled': selectOptionDisabled(option)}, { 'select__dropdown-option--highlight': index === typeAheadPointer }]"
    role="option"
    @click.stop.prevent="selectOption(option)"
    @mouseover.stop.prevent="typeAheadPointer = index"
    @mousedown.stop.prevent
  >
    <slot name="dropdownItem" v-bind="{option, selectedOptions}">
      <label v-if="useProps.multiple" class="checkbox__wrapper">
        <input
          ref="checkbox"
          :id="`select-${useProps.id}-option-${index}-checkbox`"
          class="checkbox select-checkbox-item"
          type="checkbox"
          :disabled="selectOptionDisabled(option)"
          :checked="selectedOptions.indexOf(option) !== -1"
        />
        <span class="checkbox__element"/>
        <span class="checkbox__label">{{getOptionText(option)}}</span>
      </label>

      <span v-else>{{ getOptionText(option) }}</span>
    </slot>
  </li>
  <p
    v-if="useProps.filterable && search && !filteredOptions.length || (!filteredOptions.length && useProps.remote)"
    @click.stop.prevent class="select__dropdown-not-data"
  >
    {{ useProps.noMatchText }}
  </p>

</template>

<script setup>
import {ref, inject, computed, watch} from "vue";
import BaseCheckbox from "~/components/base/BaseCheckbox.vue";
import BaseInput from "~/components/base/BaseInput.vue";

// eslint-disable-next-line vue/require-emit-validator
const emits = defineEmits(["update:typeAheadPointer", "update:selectedOptions",])

const useProps = inject("useProps")
const search = ref('');
const searchField = ref('');

const props = defineProps({
  selectedOptions: {
    default: ()=>[],
    type: Array
  },
})

const typeAheadPointer = ref(-1);

/**
 * Генерирует текст для опции селекта. Он используется для отображения и фильтрации опций.
 * @param {string||object} option - Опция селекта.
 * @returns {string||object} - Если опция селекта {object} указан tag, то возвращает option[tag], если не
 * указан tag, то возвращается значение первого ключа. Если опция селекта {string} - возвращает саму опцию.
 */
const getOptionText = (option) => {
  if (typeof option === 'object') {
    const isTag = Object.prototype.hasOwnProperty.call(option, useProps.tag);
    return isTag ? option[useProps.tag] : Object.values(option)[0];
  }
  return option;
}

/**
 * Фильтрует опции по поисковому запросу в селекте для селекта с включённым поиском.
 * @returns {object} - Список отфильтрованных опций селекта.
 */
const filteredOptions = computed (()=> {
  if (useProps.filterable) {
    return useProps.options.filter((option) => {
      let text = getOptionText(option);

      if (typeof text === 'number') {
        text = text.toString();
      }

      return (text || '').toLowerCase().indexOf(search.value.toLowerCase()) > -1;
    });
  }
  return useProps.options;
})

watch(typeAheadPointer, (newVal)=>{
  emits('update:typeAheadPointer', newVal)
})

const selectOptionDisabled = (option) => {
  // useProps.disabledOptions.'select__dropdown-option--disabled'
  if (typeof option === "object") {
    const isValueKey = useProps.valueKey && Object.prototype.hasOwnProperty.call(option, useProps.valueKey)
    if (isValueKey) {
      return useProps.disabledOptions.includes(option[useProps.valueKey])
    }
    return false
  }
  return useProps.disabledOptions.includes(option)
}

const selectOption = (option) => {
  if (selectOptionDisabled(option)) return
  emits('update:selectedOptions', option);
  if (useProps.filterable) {
    document.getElementById(`select-${useProps.id}-input-search`).blur()
  }
}

// /**
//  * Обрабатывает нажание клавиш в селекте.
//  * @param {object} event
//  * @returns {object} - Результат функции, вызванной клавишей.
//  */
// const onSearchKeyDown = (event) => {
//   const key = {
//     /**
//      * Backspace.
//      * Удаляет опцию.
//      */
//     8: () => {
//       if (!search.value.length && selectedOptions.value.length) {
//         props.multiple ? selectedOptions.value.pop() : deselect();
//       }
//     },
//     /**
//      * Enter.
//      * Выбирает опцию.
//      */
//     13: () => {
//       const typeAheadOption = filteredOptions.value[typeAheadPointer.value];
//
//       if (typeAheadOption) {
//         select(typeAheadOption);
//       }
//     },
//     /**
//      * Esc.
//      * Очищает поисковой запрос или закрывает список опций, если поисковой запрос пуст.
//      * @returns {string|void}
//      */
//     27: () => search.value.length ? search.value = '' : searchField.blur(),
//     /**
//      * Up.
//      * Передвигает фокус по опциям вверх.
//      */
//     38: () => {
//       for (let i = typeAheadPointer.value - 1; i >= 0; i--) {
//         if (filteredOptions[i]) {
//           typeAheadPointer.value = i;
//           break;
//         }
//       }
//     },
//     /**
//      * Down.
//      * Передвигает фокус по опциям вниз.
//      */
//     40: () => {
//       for (let i = typeAheadPointer.value + 1; i < filteredOptions.value.length; i++) {
//         if (filteredOptions.value[i]) {
//           typeAheadPointer.value = i;
//           break;
//         }
//       }
//     },
//   };
//
//   if (typeof key[event.keyCode] === 'function') {
//     return key[event.keyCode](event);
//   }
//   return false;
// }

</script>

<style scoped>
.select__search-input {
  width: 100%;
  padding: 15px 20px;
  border: none;
  font-weight: var(--input-font-weight);
  font-size: var(--input-medium-font-size);
  font-family: inherit;
  color: var(--input-color);
  outline: none;
  transition-property:
    border-color,
    background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}
input.select__search-input::-ms-clear {  display: none; width : 0; height: 0; }
input.select__search-input::-ms-reveal {  display: none; width : 0; height: 0; }

input.select__search-input::placeholder {
  color: var(--select-label-color);
  font-weight: var(--select-filter-placeholder-font-weight);
  font-size: var(--select-filter-placeholder-font-size);
  font-family: inherit;
}

.select__dropdown-not-data {
  font-size: 12px;
  text-align: center;
  padding: 15px 0;
  color: var(--select-label-color);
}

:deep(.select-checkbox-item) {
  top: 50%;
  transform: translateY(-50%);
}

.select__search-box {
  top: 0;
  position: sticky;
  border: none;
  border-bottom: 1px solid var(--select-dropdown-option-color-separator);
  border-radius: 0;
  background-color: #ffffff;
  z-index: 2;
}

.select__dropdown-option {
  padding: var(--select-dropdown-option-padding);
  color: var(--select-color);
  border-bottom: 1px solid var(--select-dropdown-option-color-separator);
}

@media (hover: hover),(min-width:0\0),(min--moz-device-pixel-ratio:0) and (any-pointer: fine) {
  .select__dropdown-option:hover {
    cursor: pointer;
  }
}

.select__dropdown-option--highlight {
  color: var(--select-dropdown-option-color-highlight);
  background-color: var(--select-dropdown-option-background-color-highlight);
}

.select__dropdown-option--disabled {
  color: var(--select-dropdown-option-color-disabled)
}

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
</style>
