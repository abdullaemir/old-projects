<template>
  <Transition name="show">
    <p
      v-if="!isFocus && (errorMessage || !meta.valid && meta.dirty && meta.touched)"
      class="error"
    >
      {{ errorMessage }}
    </p>
  </Transition>
</template>

<script setup>
defineProps({
  errorMessage: {
    required: true,
    type: String,
  },
  isFocus: {
    required: true,
    type: Boolean,
  },
  meta: {
    required: true,
    type: Object,
  },
});
</script>

<style scoped>
.error {
  color: var(--border-color-error);
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
