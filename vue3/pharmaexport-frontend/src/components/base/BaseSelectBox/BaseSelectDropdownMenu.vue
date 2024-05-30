<template>
  <BaseDropdown
    :id="`select-${useProps.id}-listboxD`"
    @closeDropdown="emits('close-dropdown')"
  >
    <Transition name="open">
      <ul
        :id="`select-${useProps.id}-listbox`"
        :key="`select-${useProps.id}-listbox`"
        ref="dropdownMenu"
        class="select__dropdown-menu"
        role="listbox"
        tabindex="-1"
      >
        <slot></slot>
      </ul>
    </Transition>
  </BaseDropdown>
</template>

<script setup>
import {inject, ref, watch} from "vue";

import BaseDropdown from "~/components/base/BaseDropdown/BaseDropdown.vue";

const emits = defineEmits({
  "close-dropdown": ()=>true
})
const useProps = inject("useProps");

const props = defineProps({
  dropdownOpen: {
    type: Boolean,
    default: false,
  },
  typeAheadPointer: {
    type: [Number, Object],
    default: null,
  }
})

const dropdownMenu = ref(null);

watch(()=>props.typeAheadPointer,(newVal) => {
  let currentOption = newVal
  useProps.filterable ? currentOption++ : currentOption
  const option = dropdownMenu.value.children[currentOption];
  const bounds = dropdownMenu.value.getBoundingClientRect();
  const { top, bottom, height } = option.getBoundingClientRect();

  if (top < bounds.top) {
    dropdownMenu.value.scrollTop = option.offsetTop;
  } else if (bottom > bounds.bottom) {
    dropdownMenu.value.scrollTop = option.offsetTop - (bounds.height - height);
  }
  return option;
})
</script>

<style scoped>
*:focus-visible {
  outline: 0;
  outline-offset: 0;
}

.select__dropdown-menu {
  position: absolute;
  top: calc(100% - var(--select-border-width));
  left: calc(-1*var(--select-border-width));
  z-index: 2;

  width: calc(100% + 2*var(--select-border-width));
  max-height: var(--select-dropdown-max-height);
  margin: 0;
  padding-left: 0;
  border: var(--select-border-width) solid var(--select-border-color-active);
  border-top: none;
  border-radius: var(--select-dropdown-border-radius);

  list-style: none;
  background-color: var(--select-dropdown-background-color);
  overflow-x: hidden;
  overflow-y: scroll;
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
</style>
