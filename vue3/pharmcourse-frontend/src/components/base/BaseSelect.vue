<template>
  <div class="select__wrapper">
    <div :class="[classNameSelect, 'select', stateClasses, heightClasses]">
      <div
        :id="`select-${id}-combobox`"
        :aria-expanded="dropdownOpen.toString()"
        aria-label="Search for option"
        :aria-owns="`select-${id}-listbox`"
        class="select__dropdown-toggle"
        role="combobox"
        @mousedown.prevent="openDropdown"
      >
        <div class="select__selected-options">
          <span
            v-for="(option, index) in selectedOptions"
            :key="`select-${id}-option-${index}-selected`"
            :class="['select__selected', { 'select__selected--multiple': multiple }]"
          >
            {{ getOptionText(option) }}
            <button
              v-if="multiple"
              ref="deselectButtons"
              :aria-label="`Deselect ${getOptionText(option)}`"
              class="select__deselect"
              :disabled="disabled"
              :title="`Deselect ${getOptionText(option)}`"
              type="button"
              @click="deselect(option)"
            >
              <svg
                height="10"
                width="10"
              >
                <line
                  stroke="inherit"
                  stroke-width="2"
                  x1="1"
                  x2="9"
                  y1="1"
                  y2="9"
                />
                <line
                  stroke="inherit"
                  stroke-width="2"
                  x1="9"
                  x2="1"
                  y1="1"
                  y2="9"
                />
              </svg>
            </button>
          </span>

          <input
            :id="`select-${id}-input`"
            ref="searchField"
            v-model.trim="search"
            aria-autocomplete="list"
            :aria-controls="`select-${id}-listbox`"
            :aria-labelledby="`select-${id}-combobox`"
            :class="['select__input', classNameInput]"
            :disabled="disabled"
            :name="name.toLowerCase()"
            :placeholder="label"
            :readonly="!searchable"
            type="search"
            @blur="closeDropdown"
            @focus="openDropdown"
            @keydown="onSearchKeyDown"
          />
          <label
            :class="['select__label', classNameLabel]"
            :for="`select-${id}-input`"
          >
            {{ label }}
          </label>
        </div>

        <div class="select__actions">
          <button
            v-show="showClearButton"
            ref="clearButton"
            aria-label="Clear Selected"
            class="select__clear"
            :disabled="disabled"
            title="Clear Selected"
            type="button"
            @click="deselect"
          >
            <svg
              height="10"
              role="img"
              width="10"
            >
              <line
                stroke="inherit"
                stroke-width="2"
                x1="1"
                x2="9"
                y1="1"
                y2="9"
              />
              <line
                stroke="inherit"
                stroke-width="2"
                x1="9"
                x2="1"
                y1="1"
                y2="9"
              />
            </svg>
          </button>

          <svg
            class="select__open-indicator"
            height="4"
            role="img"
            width="8"
          >
            <path d="M8 0L4 4L0 0H8Z" />
          </svg>

          <span
            v-if="loading"
            class="select__spinner"
          />
        </div>
      </div>

      <transition name="open">
        <ul
          v-if="dropdownOpen"
          :id="`select-${id}-listbox`"
          :key="`select-${id}-listbox`"
          ref="dropdownMenu"
          class="select__dropdown-menu"
          role="listbox"
          tabindex="-1"
          @mouseenter="activeDropdownMenu = true"
          @mouseleave="activeDropdownMenu = false"
        >
          <li
            v-for="(option, index) in filteredOptions"
            :id="`select-${id}-option-${index}`"
            :key="`select-${id}-option-${index}`"
            :aria-selected="index === typeAheadPointer ? true : null"
            :class="['select__dropdown-option', { 'select__dropdown-option--highlight': index === typeAheadPointer }]"
            role="option"
            @click.stop.prevent="select(option)"
            @mouseover="typeAheadPointer = index"
          >
            <BaseCheckbox
              v-if="multiple"
              :name="`select-${id}-option-${index}-checkbox`"
              :id="`select-${id}-option-${index}-checkbox`"
              :checked="selectedOptions.indexOf(option) !== -1"
            >
              <span >{{getOptionText(option)}}</span>
            </BaseCheckbox>
<!--            <label-->
<!--              v-if="multiple"-->
<!--              class="select__checkbox-wrapper"-->
<!--            >-->
<!--              <input-->
<!--                :id="`select-${id}-option-${index}-checkbox`"-->
<!--                :checked="selectedOptions.indexOf(option) !== -1"-->
<!--                class="select__checkbox"-->
<!--                :name="`select-${id}-option-${index}-checkbox`"-->
<!--                type="checkbox"-->
<!--              />-->
<!--              <span :class="['select__checkbox-custom', classNameCheckbox]">-->
<!--                <svg-->
<!--                  fill="none"-->
<!--                  height="11"-->
<!--                  role="presentation"-->
<!--                  width="14"-->
<!--                >-->
<!--                  <path-->
<!--                    d="M2 4.4L5.33 8 12 2"-->
<!--                    stroke="inherit"-->
<!--                    stroke-width="3"-->
<!--                  />-->
<!--                </svg>-->
<!--              </span>-->
<!--              {{ getOptionText(option) }}-->
<!--            </label>-->
            <template v-else>{{ getOptionText(option) }}</template>
          </li>

          <li
            v-if="filteredOptions.length === 0"
            class="select__no-options"
          >
            <template v-if="loading">Please wait, options are loading</template>
            <template v-else-if="Boolean(search)">No results found for {{ search }}</template>
            <template v-else>Start typing to search</template>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script setup>
import {toRef, ref, computed, watchEffect, watch} from "vue";
import {useField} from "vee-validate";
import BaseCheckbox from "~/components/base/BaseCheckbox.vue";

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
  classNameSelect: {
    type: [Array, Object, String],
    default: null,
  },
  classNameInput: {
    type: [Array, Object, String],
    default: null,
  },
  classNameLabel: {
    type: [Array, Object, String],
    default: null,
  },
  classNameCheckbox: {
    type: [Array, Object, String],
    default: null,
  },
  small: {
    type: Boolean,
    default: false,
  },
  medium: {
    type: Boolean,
    default: false,
  },
  large: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Array,
    default() {
      return ["sdcefsfsd1sdcefsfsd1sdcefsfsd1sdcefsfsd1","sdcefsfsd1sdcefsfsd1sdcefsfsd1sdcefsfsd1sdcefsfsd1sdcsd2","sdcsd3","4","5","6","7"];
    },
  },
  tag: {
    type: String,
    default: 'tag',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [Boolean, Object, String],
    default: null,
  },
  rules: {
    default: null,
    type: [String, Object],
  },
})

const emits = defineEmits(["search", "input", "select", ])

const search = ref('');
const selectedOptions = ref([]);
const typeAheadPointer = ref(-1);
const isDropdownOpen = ref(false);
const activeDropdownMenu = ref(false);
const dropdownMenu = ref(null);
const deselectButtons = ref(null);
const clearButton = ref(null);
const searchField = ref(null);

/**
 * Добавляет классы состояний для .select.
 * @returns {object} - Классы для .select.
 */
const stateClasses = computed(()=>{
  return {
    // 'select--active': this.isActive,
    'select--open': dropdownOpen.value,
    'select--multiple': props.multiple,
    'select--searching': Boolean(search.value),
    'select--searchable': props.searchable,
    'select--loading': props.loading,
    'select--disabled': props.disabled,
  };
})


/**
 * Генерирует текст для опции селекта. Он используется для отображения и фильтрации опций.
 * @param {string||object} option - Опция селекта.
 * @returns {string||object} - Если опция селекта {object} указан tag, то возвращает option[this.tag], если не
 * указан tag, то возвращается значение первого ключа. Если опция селекта {string} - возвращает саму опцию.
 */
const getOptionText = (option) => {
  if (typeof option === 'object') {
    const isTag = Object.prototype.hasOwnProperty.call(option, props.tag);
    return isTag ? option[props.tag] : Object.values(option)[0];
  }
  return option;
}

/**
 * Удаляет опцию.
 * Для селекта с одиночным выбором удаляются все выбранные опции, для селекта с мультивыбором удаляется только та
 * опция, по кнопке которой произошло нажатие.
 * @param {string||object} option - Опция селекта.
 */
const deselect = (option = null) => {
  if (props.multiple) {
    const optionIndex = selectedOptions.value.findIndex((item) => item === option);
    if (optionIndex > -1) {
      selectedOptions.value.splice(optionIndex, 1);
    }
  } else {
    selectedOptions.value = [];
  }

  emits('input', null);
}

/**
 * Закрывает список опций.
 */
const closeDropdown = () => {
  if (activeDropdownMenu.value) {
    search.value = '';
    searchField.value.focus();
    return
  }
  isDropdownOpen.value = false
  searchField.value.blur();
  search.value = '';
}

/**
 * Выбирает опцию.
 * Для селекта с одиночным выбором предыдущая выбранная опция заменяется новой.
 * Для селекта с мультивыбором добавляются все выбранные опции, если их нет, иначе удаляются.
 * Запускает событие input для селекта (активирует v-model).
 * Запускает событие select для селекта.
 * @param {string||object} option - Опция селекта.
 */
const select = (option) => {
  let options = selectedOptions.value;
  if (props.multiple) {
    options.includes(option) ? deselect(option) : options.push(option);
  } else {
    options.length ? options.splice(0, options.length, option) : options.push(option);
    closeDropdown();
  }

  emits('input', option);
  emits('select', selectedOptions.value, option);
}

/**
 * Открывает список опций.
 * Не срабатывает, если клик произошёл по кнопке удаления опции.
 * @param {object} event
 */
const openDropdown = (event) => {
  const buttons = [...deselectButtons.value || [], ...[clearButton.value] || []];
  const isButtonClick = buttons.filter(Boolean).some((el) => el.contains(event.target) || el === event.target);
  if (!isButtonClick && !props.disabled) {
    console.log("searchField.value", searchField.value)
    isDropdownOpen.value = true;
    searchField.value.focus();
  }
}

/**
 * Добавляет класс размера для .select.
 * @returns {object} - Классы для .select.
 */
const heightClasses = computed(() => {
  return {
    'select--small': props.small,
    'select--medium': props.medium,
    'select--large': props.large && !props.small && !props.medium,
  };
})

/**
 * Показывает/скрывает кнопку удаления выбранной опции для селекта с одиночным выбором.
 * @returns {boolean} - Показать/скрыть.
 */
const showClearButton = computed(()=>{
  return !props.multiple && !isDropdownOpen.value && !(selectedOptions.value.length === 0);
})

/**
 * Возвращает состояние списка опций.
 * @returns {boolean} - Открыт/закрыт.
 */
const dropdownOpen = computed(()=>{
  return isDropdownOpen.value && !props.loading;
})

/**
 * Фильтрует опции по поисковому запросу в селекте для селекта с включённым поиском.
 * @returns {object} - Список отфильтрованных опций селекта.
 */
const filteredOptions = computed (()=> {
  if (props.searchable) {
    return props.options.filter((option) => {
      let text = getOptionText(option);

      if (typeof text === 'number') {
        text = text.toString();
      }

      return (text || '').toLowerCase().indexOf(search.value.toLowerCase()) > -1;
    });
  }
  return props.options;
})

/**
 * Активирует v-model на селекте.
 */
watch(props.value, (newVal) => {
  newVal ? select(newVal) : deselect()
})

/**
 * Запускает событие search для селекта при вводе поискового запроса.
 */
watch(search, (newVal) => {
  emits('search', newVal)
})

/**
 * Регулирует прокрутку списка опций, если текущая опция находится за границами списка опций.
 * @returns {number} - Количество пикселей для прокрутки спика опций вверх или вниз.
 */
watch(typeAheadPointer, (newVal)=>{
    const option = dropdownMenu.value.children[newVal];
    const bounds = dropdownMenu.value.getBoundingClientRect();
    const { top, bottom, height } = option.getBoundingClientRect();

    if (top < bounds.top) {
      dropdownMenu.value.scrollTop = option.offsetTop;
    } else if (bottom > bounds.bottom) {
      dropdownMenu.value.scrollTop = option.offsetTop - (bounds.height - height);
    }
    return option;
})

/**
 * Выделяет первую опцию в фильтре опций при поисковом запросе.
 */
watch(filteredOptions, (newVal) => {
  for (let i = 0; i < newVal.length; i++) {
    if (newVal[i]) {
      typeAheadPointer.value = i;
      break;
    }
  }
})

/**
 * Обрабатывает нажание клавиш в селекте.
 * @param {object} event
 * @returns {object} - Результат функции, вызванной клавишей.
 */
const onSearchKeyDown = (event) => {
  const key = {
    /**
     * Backspace.
     * Удаляет опцию.
     */
    8: () => {
      if (!search.value.length && selectedOptions.value.length) {
        props.multiple ? selectedOptions.value.pop() : deselect();
      }
    },
    /**
     * Enter.
     * Выбирает опцию.
     */
    13: () => {
      const typeAheadOption = filteredOptions.value[typeAheadPointer.value];

      if (typeAheadOption) {
        select(typeAheadOption);
      }
    },
    /**
     * Esc.
     * Очищает поисковой запрос или закрывает список опций, если поисковой запрос пуст.
     * @returns {string|void}
     */
    27: () => search.value.length ? search.value = '' : searchField.blur(),
    /**
     * Up.
     * Передвигает фокус по опциям вверх.
     */
    38: () => {
      for (let i = typeAheadPointer.value - 1; i >= 0; i--) {
        if (filteredOptions[i]) {
          typeAheadPointer.value = i;
          break;
        }
      }
    },
    /**
     * Down.
     * Передвигает фокус по опциям вниз.
     */
    40: () => {
      for (let i = typeAheadPointer.value + 1; i < filteredOptions.value.length; i++) {
        if (filteredOptions.value[i]) {
          typeAheadPointer.value = i;
          break;
        }
      }
    },
  };

  if (typeof key[event.keyCode] === 'function') {
    return key[event.keyCode](event);
  }
  return false;
}

</script>

<style scoped>
.select__wrapper {
  width: 100%;
}

@media (max-width: 767px) {
  .select__wrapper:not(:last-child) {
    margin-bottom: var(--select-wrapper-margin-bottom);
  }
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

.select__dropdown-toggle {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
  justify-content: space-between;
  height: 100%;
  /*padding: 22px 20px;*/
  padding: 0 20px;
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


@media (hover: hover) and (any-pointer: fine) {
  .select:not(.select--open, .select--disabled) .select__dropdown-toggle:hover {
    border-color: var(--select-border-color-hover);

    background-color: var(--select-background-color-hover);
  }
}

.select--active .select__dropdown-toggle {
  border-color: var(--select-border-color-active);
  background-color: var(--select-background-color-active);
}

.select--searchable .select__dropdown-toggle {
  cursor: text;
}

.select--disabled .select__dropdown-toggle {
  color: var(--select-color-disabled);
  background-color: var(--select-background-color-disabled);
  border-color: var(--select-border-color-disabled);
  cursor: default;
}

.select--open .select__dropdown-toggle {
  border-color: var(--select-border-color-active);
  border-bottom-color: transparent;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
}

.select__selected-options {
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: flex-end;
  overflow: auto;
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
  align-items: center;
  margin-right: var(--select-multiple-selected-margin-right);
  padding-bottom: 0;
}

.select__selected {
  position: relative;
  display: flex;
  align-items: center;
  color: var(--select-color);
  white-space: nowrap;
  overflow: hidden;
  font-size: var(--select-large-font-size);
  font-weight: var(--select-font-weight);
}

.select--medium .select__selected {
  font-size: var(--select-medium-font-size);
}

.select--open .select__selected {
  opacity: 0.5;
}

.select--searching .select__selected {
  display: none;
}

.select--multiple.select--open .select__selected {
  opacity: 0.1;
}

.select--multiple.select--searchable .select__selected {
  display: flex;
}

.select__selected--multiple {
  flex-shrink: 0;
  margin-right: var(--select-multiple-selected-margin-right);
  padding: var(--select-multiple-selected-padding);
  border-radius: var(--select-multiple-selected-border-radius);

  background-color: var(--select-multiple-background-color);

  transition-property: background-color;
  transition-duration: 0.2s;
  transition-timing-function: linear;
}

@media (any-pointer: fine) {
  .select__selected--multiple:hover {
    background-color: var(--select-multiple-background-color-hover);
  }
}

.select__selected--multiple:focus {
  background-color: var(--select-multiple-background-color-hover);
}

.select__selected--multiple:active {
  background-color: var(--select-multiple-background-color-active);
}

.select--disabled .select__selected--multiple {
  background-color: var(--select-multiple-background-color-disabled);
}

.select__deselect {
  display: inline-flex;
  margin-left: var(--select-multiple-deselect-margin-left);
  padding: 0;
  border: 0;
  background-color: transparent;
  stroke: var(--select-clear-indicator-fill);
  cursor: pointer;
}

.select__input {
  position: absolute;

  padding: 0;
  border: none;

  font: inherit;
  font-weight: var(--select-font-weight);
  color: var(--select-color);

  appearance: none;
  background-color: transparent;
  outline: none;

  pointer-events: none;
}

.select__input::placeholder {
  font-size: 0;
}

.select__input::-webkit-search-cancel-button {
  display: none;
}

.select--multiple.select--searchable .select__input {
  bottom: auto;
}

.select__label {
  position: absolute;
  top: 50%;
  font-weight: var(--select-label-font-weight);
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
}

.select--medium .select__label {
  font-size: var(--select-label-medium-font-size);
}

.select--large .select__label {
  font-size: var(--select-label-large-font-size);
}

@media (any-pointer: fine) {
  .select:hover .select__label {
    color: var(--select-label-color-hover);
  }
}

.select__selected ~ .select__label {
  font-weight: var(--select-label-font-weight-active);
  color: var(--select-label-color-active);

  transform: var(--select-label-transform);
}

.select--medium .select__selected ~ .select__label {
  font-size: var(--select-label-medium-font-size-active);
}

.select--large .select__selected ~ .select__label {
  font-size: var(--select-label-large-font-size-active);
}

.select--multiple .select__selected ~ .select__label {
  display: none;
}

.select__input:disabled ~ .select__label {
  color: var(--select-label-color-disabled);
}

.select__input:focus ~ .select__label {
  font-weight: var(--select-label-font-weight-active);
  color: var(--select-label-color-active);

  transform: var(--select-label-transform);
}

.select--medium .select__input:focus ~ .select__label {
  font-size: var(--select-label-medium-font-size-active);
}

.select--large .select__input:focus ~ .select__label {
  font-size: var(--select-label-large-font-size-active);
}

.select--multiple .select__input:focus ~ .select__label {
  display: none;
}

.select__actions {
  display: flex;
  align-items: center;
}

.select__clear {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  max-height: 40px;
  height: 100%;
  padding: 0;
  border: none;

  background-color: transparent;
  stroke: var(--select-clear-indicator-fill);

  cursor: pointer;
}

.select__open-indicator {
  fill: var(--select-open-indicator-fill);
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
}
.select--disabled .select__open-indicator {
  fill: var(--select-open-indicator-fill-disabled);
}

.select--open .select__open-indicator {
  transform: scale(1, -1);
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
}

.select--loading .select__open-indicator {
  display: none;
}

.select__spinner {
  width: 20px;
  height: 20px;
  border-top: var(--select-spinner-border-width) solid var(--select-spinner-border-color);
  border-bottom: var(--select-spinner-border-width) solid var(--select-spinner-border-color);
  border-left: var(--select-spinner-border-width) solid var(--select-spinner-border-color-active);
  border-right: var(--select-spinner-border-width) solid var(--select-spinner-border-color);
  border-radius: 50%;

  overflow: hidden;

  animation: roundSpinner 1.1s infinite linear;
}

@keyframes roundSpinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.select__dropdown-menu {
  position: absolute;
  top: calc(100% - var(--select-border-width));
  left: 0;
  z-index: var(--z-index-popup);

  width: 100%;
  max-height: var(--select-dropdown-max-height);
  margin: 0;
  padding-left: 0;
  border: var(--select-border-width) solid var(--select-border-color-active);
  border-top: none;
  border-radius: var(--select-dropdown-border-radius);

  list-style: none;
  background-color: var(--select-dropdown-background-color);
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb-background-color);
}

.select__dropdown-menu::-webkit-scrollbar {
  width: 16px;
  height: 16px;
  border-radius: var(--select-border-radius);

  background-color: var(--select-dropdown-background-color);
}

.select__dropdown-menu::-webkit-scrollbar-track {
  margin: 8px;
}

.select__dropdown-menu::-webkit-scrollbar-thumb {
  border: 4px solid var(--select-dropdown-background-color);
  border-radius: 8px;
  background-color: var(--select-dropdown-scrollbar-background-color);
}

/*@media (any-pointer: fine) {*/
/*  .select__dropdown-menu::-webkit-scrollbar-thumb:hover {*/
/*    background-color: var(--select-dropdown-scrollbar-background-color-hover);*/
/*  }*/
/*}*/

.select__dropdown-menu::-webkit-scrollbar-corner {
  background-color: var(--select-dropdown-background-color);
}

.open-enter-active,
.open-leave-active {
  transition-property: opacity;

  pointer-events: none;
}

.open-enter-active {
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
}

.open-leave-active {
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
}

.open-enter,
.open-leave-to {
  opacity: 0;
}

.select__no-options {
  padding: 4px 0;

  color: var(--select-color);
  text-align: center;
}

.select__dropdown-option {
  padding: var(--select-dropdown-option-padding);

  color: var(--select-color);
}

@media (hover: hover) and (any-pointer: fine) {
  .select__dropdown-option:hover {
    cursor: pointer;
  }
}

.select__dropdown-option--highlight {
  color: var(--select-dropdown-option-color-highlight);

  background-color: var(--select-dropdown-option-background-color-highlight);
}

.select__checkbox-wrapper {
  position: relative;

  padding-left: 30px;

  cursor: pointer;
  pointer-events: none;
}

.select__checkbox {
  position: absolute;

  width: 0;
  height: 0;

  opacity: 0;
}

.select__checkbox-custom {
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border: 1px solid var(--select-checkbox-border-color);
  border-radius: 4px;

  background-color: var(--select-checkbox-background-color);
  stroke: var(--select-checkbox-check-stroke);
  box-shadow: var(--select-checkbox-box-shadow);
}

@media (any-pointer: fine) {
  .select__checkbox-custom:hover,
  .select__dropdown-option:hover .select__checkbox-custom {
    border-color: var(--select-checkbox-background-color);

    background-color: var(--select-checkbox-background-color-hover);
  }
}

.select__checkbox:checked + .select__checkbox-custom {
  border-color: var(--select-checkbox-border-color-active);

  background-color: var(--select-checkbox-background-color-active);
  stroke: var(--select-checkbox-check-stroke-active);
}
</style>
