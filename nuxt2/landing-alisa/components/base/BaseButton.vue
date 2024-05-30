<template>
  <button
    :class="['button', bordered ? 'button--bordered' : 'button--filled']"
    :type="type"
    v-on="listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    bordered: {
      default: false,
      type: Boolean,
    },
    type: {
      default: "button",
      type: String,
    },
  },
  computed: {
    listeners() {
      return Object.assign({}, this.$listeners)
    },
  },
};
</script>

<style scoped>
.button {
  width: 100%;
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
}

.button--filled {
  min-height: 50px;
  background-image: var(--button-background-primary);
  font-size: 14px;
  font-weight: 500;
}

@media (min-width: 1920px) {
  .button--filled {
    min-height: 80px;
    font-size: 24px;
  }
}

@media (any-pointer: fine) {
  .button--filled:hover,
  .button--filled:focus {
    background-image: var(--button-background-primary-hover);
  }
}

.button--bordered {
  min-height: 40px;
  border: 1px solid var(--button-border-primary);
  background-image: none;
  font-size: 12px;
  font-weight: 300;
  color: var(--text-color-secondary);
}

@media (min-width: 1920px) {
 .button--bordered {
   min-height: 50px;
   font-size: 16px;
  }
}

@media (any-pointer: fine) {
  .button--bordered:hover,
  .button--bordered:focus {
    border-color: transparent;
    background-image: var(--button-background-primary);
    color: var(--text-color-primary);
  }
}
</style>
