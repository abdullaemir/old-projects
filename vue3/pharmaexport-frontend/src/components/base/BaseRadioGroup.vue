<template>
  <div class="radio-group">
    <div v-bind="$attrs" class="radio-group__box-items">
      <slot></slot>
    </div>

    <Transition name="show-errors">
      <ErrorMessage
        :name="name"
        as="div"
        class="radio-group__box-errors"
        #default="{ message }"
      >
        <p class="radio-group__error-message">
          {{ message }}
        </p>
      </ErrorMessage>
    </Transition>
  </div>
</template>

<script setup>
import {ErrorMessage} from 'vee-validate';
import {provide} from "vue";

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

.radio-group__error-message {
  color: var(--text-color-error);
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
</style>
