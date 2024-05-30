<template>
  <div class="radio-group">
    <div v-bind="$attrs" class="radio-group__box-items">
      <slot></slot>
    </div>

    <BaseError :name="name" />
  </div>
</template>

<script setup>
import {provide} from "vue";
import BaseError from "~/components/base/BaseError.vue";

const props = defineProps({
  name: {
    required: true,
    type: String,
  },
  rules: {
    default: null,
    type: [String, Object],
  }
});

provide("useGroup", true);
provide("useRules", props.rules);
provide("useName", props.name);
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<style scoped>
.radio-group__box-items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

:deep(.radio-group__box-items > *) {
  margin-right: 15px;
  margin-top: 4px;
  margin-bottom: 4px;
}
</style>
