<template>
  <Transition v-if="!name" name="show">
    <p
      v-if="!isFocus && (errorMessage || !meta.valid && meta.dirty && meta.touched)"
      class="error"
    >
      {{ errorMessage }}
    </p>
  </Transition>

  <Transition v-else name="show">
    <ErrorMessage
      :name="name"
      as="div"
      class="error-box"
      #default="{ message }"
    >
      <p class="error">{{ message }}</p>
    </ErrorMessage>
  </Transition>
</template>

<script setup>
import {ErrorMessage} from 'vee-validate';

defineProps({
  errorMessage: {
    type: String,
  },
  isFocus: {
    type: Boolean,
  },
  meta: {
    type: Object,
  },
  name: {
    type: String,
  },
});

</script>

<style scoped>
.error {
  color: var(--red);
  font-size: 10px;
  font-weight: 500;
  margin-top: 4px;
}

.show-enter-active,
.show-leave-active {
  animation-name: show-errors;
  animation-duration: 0.2s;
  animation-timing-function: ease-in-out;
}

.show-leave-active {
  animation-direction: reverse;
}

@keyframes show-errors {
  0% {
    transform: translateY(-8px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
