<template>
  <div class="checkbox-group">
    <div v-bind="$attrs" class="checkbox-group__box-items">
      <slot></slot>
    </div>

    <Transition name="show-errors">
<!--      <ErrorMessage-->
<!--        v-for="item in names"-->
<!--        :key="item" :name="item"-->
<!--        as="div"-->
<!--        class="checkbox-group__box-errors"-->
<!--        #default="{ message }"-->
<!--      >-->
<!--        <p class="checkbox-group__error-message">-->
<!--          {{ message }}-->
<!--        </p>-->
<!--      </ErrorMessage>-->
      <ErrorMessage
        :name="name"
        as="div"
        class="checkbox-group__box-errors"
        #default="{ message }"
      >
        <p class="checkbox-group__error-message">
          {{ message }}
        </p>
      </ErrorMessage>
    </Transition>
  </div>
</template>

<script setup>
import {ErrorMessage, useFieldValue} from 'vee-validate';
import {onBeforeMount, onServerPrefetch, ref, useSlots, provide, watch} from "vue";

const group = ref([]);
const names = ref([]);

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

// const initializationGroup = () => {
//   const slots = useSlots();
//   group.value = slots.default();
//   group.value.forEach((item) => {
//     if (!names.value.includes(item.props.name)) {
//       names.value.push(item.props.name)
//     }
//   });
// };
//
// onServerPrefetch(() => {
//   initializationGroup();
// });
//
// onBeforeMount(() => {
//   initializationGroup();
// });
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<style scoped>
:deep(.checkbox-group__box-items > *) {
  margin-right: 15px;
}

:deep(.checkbox-group__box-items > *:not(:last-child)) {
  margin-bottom: 12px;
}

.checkbox-group__error-message {
  color: var(--input-border-color-error);
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
