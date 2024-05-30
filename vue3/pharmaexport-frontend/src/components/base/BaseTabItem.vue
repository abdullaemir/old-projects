<template>
  <div
    v-show="active"
    :aria-hidden="!active || disabled"
    :aria-lebelledby="`${name}-tab`"
    class="tab"
    role="tabpanel"
  >
    <slot/>
  </div>
</template>

<script setup>
import { inject, ref, watchEffect } from "vue";

const props = defineProps({
  disabled: {
    default: false,
    type: Boolean,
  },
  name: {
    default: null,
    required: true,
    type: String,
  }
});

const selectedTab = inject("selectedTab");
const active = ref(false);

watchEffect(() => {
  active.value = props.name === selectedTab.value;
});
</script>
