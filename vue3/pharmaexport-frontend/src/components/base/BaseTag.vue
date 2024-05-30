<template>
  <p class="tag" :class="[classCustom, getModifiers, size]">
    {{ getOptionText(data)}}
    <button
      v-if="showClear"
      ref="removeTag"
      :aria-label="`Deselect ${getOptionText(data, true)}`"
      class="tag__deselect"
      :disabled="disabled"
      :title="!disabled ? `Deselect ${getOptionText(data, true)}` : ''"
      type="button"
      @click.stop.prevent="emits('deselect', data)"
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
import {computed, ref} from "vue";

const emits = defineEmits({ deselect: (data) => true });

const props = defineProps({
  data: {
    type: [String, Object, Number],
    default: '',
  },
  tag: {
    type: [String],
    default: '',
  },
  showClear: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  classCustom: {
    type: [String, Object, Array],
    default: '',
  },
  short: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  outline: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: "medium",
    description: "small/medium/large"
  }
});

const removeTag = ref('');

const getModifiers = computed(()=>({
  "tag--rounded": props.rounded,
  "tag--outline": props.outline,
  "tag--disabled": props.disabled,
}))

const maxLengthString = (value, max=13) => {
  return String(value).length < max ? String(value) : String(value).substring(0, max) + "..."
}

const getOptionText = (data, full = false) => {
  if (typeof data === 'object') {
    const isTag = Object.prototype.hasOwnProperty.call(data, props.tag);
    if (props.short && !full) return isTag ? maxLengthString(data[props.tag]) : maxLengthString(Object.values(data)[0]);
    return isTag ? data[props.tag] : Object.values(data)[0];
  }
  return !props.short && full ? data : maxLengthString(data);
}
</script>

<style scoped>
.tag {
  position: relative;
  display: flex;
  width: fit-content;
  align-items: center;
  color: var(--tag-color);
  white-space: nowrap;
  overflow: hidden;
  font-weight: var(--tag-font-weight);
  padding: 4px 12px;
  border-radius: 4px;
}

.tag.small {
  font-size: var(--tag-small-font-size);
}
.tag.medium {
  font-size: var(--tag-medium-font-size);
}
.tag.large {
  font-size: var(--tag-large-font-size);
}

.tag--outline {
  border: var(--tag-border-width) solid var(--tag-border-color)
}
.tag--rounded {
  border-radius: 100px;
}

@media (any-pointer: fine) {
  .tag:not(.tag--disabled):hover {
    background-color: var(--tag-background-color-hover);
  }
}

.tag--disabled {
  color: var(--tag-color-disabled);
  background-color: var(--select-multiple-background-color-disabled);
}
.tag--disabled.tag--outline {
  border: var(--tag-border-width) solid var(--tag-border-color)
}
.tag--disabled .tag__deselect {
  cursor: default;
}
.tag--disabled svg line {
  stroke: #cecece;
}

.tag__deselect {
  display: inline-flex;
  align-items: center;
  margin-left: var(--select-multiple-deselect-margin-left);
  border: 0;
  background-color: transparent;
  stroke: var(--select-clear-indicator-fill);
  cursor: pointer;
}

</style>
