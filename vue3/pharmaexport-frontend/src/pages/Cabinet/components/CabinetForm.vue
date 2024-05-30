<template>
  <form
    class="form"
    v-bind="$attrs"
    novalidate
  >
    <div class="form__container">
      <h3
        v-if="title"
        class="form__title"
      >
        {{ title }}
      </h3>

      <slot />

      <div class="form__buttons">
        <RouterLink
          v-if="comebackLink"
          class="form__button--cancel"
          :to="comebackLink"
        >
          Cancel
        </RouterLink>

        <BaseButton
          v-if="isCancelAction"
          class="form__button--cancel"
          :modifiers="['round']"
          type="reset"
          @click="$emit('cancelAction')"
        >
          Cancel
        </BaseButton>

        <BaseButton
          class="form__button--submit"
          :disabled="buttonSubmitDisabled"
          :modifiers="['round', 'blue']"
          type="submit"
        >
          {{ buttonSubmitText }}
        </BaseButton>
      </div>
    </div>
  </form>
</template>

<script setup>
import { RouterLink } from "vue-router";

import BaseButton from "~/components/base/BaseButton.vue";

defineProps({
  buttonSubmitDisabled: {
    type: Boolean,
  },
  buttonSubmitText: {
    required: true,
    type: String,
  },
  comebackLink: {
    default: null,
    type: Object,
  },
  isCancelAction: {
    type: Boolean,
  },
  title: {
    default: null,
    type: String,
  },
});

defineEmits({
  cancelAction: () => true,
});
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<style scoped>
.form {
  position: relative;
  margin: 0 -16px;
  padding: 28px 16px 16px;
  border: 1px solid var(--border-color-primary);
  background-color: #ffffff;
  box-shadow: 0 1px 16px rgb(0 42 81 / 0.06);
}

@media (min-width: 450px) {
  .form {
    padding-bottom: 32px;
  }
}

@media (min-width: 768px) {
  .form {
    margin: 0;
    padding: 32px;
    border-radius: 8px;
  }
}

.form__container {
  max-width: 504px;
  margin: 0 auto;
}

.form__title {
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
}

.form__buttons {
  display: grid;
  grid-row-gap: 12px;
  margin-top: 32px;
}

@media (min-width: 450px) {
  .form__buttons {
    grid-auto-flow: column;
    grid-column-gap: 28px;
    justify-content: flex-end;
    align-items: center;
  }
}

@media (min-width: 450px) {
  .form__button--cancel,
  .form__button--submit {
    width: auto;
  }
}

.form__button--cancel {
  order: 1;
  padding: 16px 0;
  color: var(--text-color-two);
  text-align: center;
}

@media (min-width: 450px) {
  .form__button--cancel {
    order: -1;
  }
}
</style>
