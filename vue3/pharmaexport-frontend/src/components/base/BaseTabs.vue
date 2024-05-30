<template>
  <div class="tabs">
    <ul
      class="tabs__list scrollbar"
      role="tablist"
    >
      <li
        v-for="tab in tabs"
        :key="tab.id"
        class="tabs__item"
        role="tab"
      >
        <button
          :aria-controls="tab.props.name"
          :aria-selected="tab.props.name === selectedTab"
          class="tabs__button"
          :class="{
            active: tab.props.name === selectedTab,
            disabled: tab.props.disabled || tab.props.disabled === ''
          }"
          :disabled="tab.props.disabled || tab.props.disabled === ''"
          role="tab"
          type="button"
          @click="selectedTab = tab.props.name"
        >
          {{ tab.props.name }}
        </button>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script setup>
import {useSlots, ref, onBeforeMount, provide, onServerPrefetch, computed} from "vue";

const props = defineProps({
  default: {
    default: null,
    type: String,
  },
  modelValue: {
    default: '',
    type: String,
  }
});

const emit = defineEmits({
  switch: (selectedTab) => selectedTab,
  "update:modelValue": (value)=>value,
});

const tabs = ref([]);
const isSelectedTab = ref(null);

const selectedTab = computed({
  get() {
    return props.modelValue || isSelectedTab.value
  },
  set(value) {
    isSelectedTab.value = value;
    emit("switch", isSelectedTab.value)
    emit("update:modelValue", isSelectedTab.value)
  }
})

provide("selectedTab", selectedTab);

const initializationTabs = () => {
  const slots = useSlots();
  const tabsSlots = slots.default();

  tabsSlots.forEach((tab) => {
    tabs.value = Array.isArray(tab.children) ? [...tabs.value, ...tab.children] : [...tabs.value, tab]
  });

  selectedTab.value = props.modelValue || props.default || tabs.value[0].props.name;
};

onServerPrefetch(() => {
  initializationTabs();
});

onBeforeMount(() => {
  initializationTabs();
});
</script>

<style scoped>
.tabs__list {
  display: inline-grid;
  grid-auto-flow: column;
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.tabs__button {
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  transition-property: color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  cursor: pointer;
}

.tabs__button.disabled {
  opacity: 0.6;
  cursor: default;
}
</style>
