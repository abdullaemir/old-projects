<template>
  <div class="tabs">
    <div class="tabs__panel">
      <app-button
        v-for="tab in tabs"
        :class="['text-M tabs__button', { selected: tab === selectedTab }]"
        @click="selectedTab = tab"
      >
        {{ tab }}
      </app-button>
    </div>

    <slot />
  </div>
</template>

<script setup>
const slots = useSlots();
const tabs = ref(slots.default().map(tab => tab.props.name));
const selectedTab = ref(tabs.value[0]);

provide("selectedTab", selectedTab);
</script>

<style lang="scss" scoped>
.tabs {
  &__panel {
    display: grid;
    justify-content: start;
    grid-auto-flow: column;
    grid-column-gap: 10px;
  }

  &__button {
    padding: 14px 16px;
    border-radius: 12px;

    @include text-xxsmall($font-weight: 500);

    @include tablet() {
      @include text-medium();
    }

    &.selected {
      background-color: rgba(1, 84, 226, 0.1);
      color: $blue;
    }
  }
}
</style>
