<template>
  <p :class="['select__selected', { 'select__selected--multiple': useProps.multiple }]">
    {{ useProps.multiple ? getOptionText(option) : getOptionText(option, true) }}
    <button
      v-if="useProps.multiple && useProps.showClearTag"
      ref="removeButtons"
      :aria-label="`Deselect ${getOptionText(option, true)}`"
      class="select__deselect"
      :disabled="useProps.disabled"
      :title="`Deselect ${getOptionText(option, true)}`"
      type="button"
      @click.stop.prevent="emits('deselect', option)"
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
  </p>
</template>

<script setup>
import {ref,inject} from "vue";

const useProps = inject("useProps");
const emits = defineEmits({ deselect: (option) => true });

const props = defineProps({
  option: {
    type: [String, Object, Number],
    default: '',
  },
});

const removeButtons = ref('');

const maxLengthString = (value, max=13) => {
  return String(value).length < max ? String(value) : String(value).substring(0, max) + "..."
}

/**
 * Генерирует текст для опции селекта. Он используется для отображения и фильтрации опций.
 * @param {string||object} option - Опция селекта.
 * @param {boolean} full - Значение типа вывода тега (полный/сокращенный).
 * @returns {string||object} - Если опция селекта {object} указан tag, то возвращает option[this.tag], если не
 * указан tag, то возвращается значение первого ключа. Если опция селекта {string} - возвращает саму опцию.
 */
const getOptionText = (option, full = false) => {
  if (typeof option === 'object') {
    const isTag = Object.prototype.hasOwnProperty.call(option, useProps.tag);
    if (!full) return isTag ? maxLengthString(option[useProps.tag]) : maxLengthString(Object.values(option)[0]);
    return isTag ? option[useProps.tag] : Object.values(option)[0];
  }
  return full ? option : maxLengthString(option);
}
</script>

<style scoped>
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

/*.select--open .select__selected {*/
/*  opacity: 0.5;*/
/*}*/

/*.select--multiple.select--open .select__selected {*/
/*  opacity: 1;*/
/*}*/

/*.select--multiple.select--open.select--filterable .select__selected {*/
/*  opacity: 0.1;*/
/*}*/

/*.select--multiple.select--filterable .select__selected {*/
/*  display: flex;*/
/*}*/

.select__selected--multiple {
  flex-shrink: 0;
  padding-right: var(--select-multiple-selected-margin-right);
  border-radius: var(--select-multiple-selected-border-radius);
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
  align-items: center;
  margin-left: var(--select-multiple-deselect-margin-left);
  padding: 0 0 2px 0;
  border: 0;
  background-color: transparent;
  stroke: var(--select-clear-indicator-fill);
  cursor: pointer;
}

</style>
