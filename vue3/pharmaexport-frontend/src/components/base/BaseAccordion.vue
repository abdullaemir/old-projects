<template>
  <div :class="['accordion', { 'accordion--active': isContentVisible }]">
    <div
      class="accordion__header"
      :class="{ 'accordion--blocked': isBlocked }"
      @click.capture="toggleContent"
    >
      <div :class="['accordion__title', classNameTitle]">
        <slot></slot>
      </div>
      <img
        v-if="isButtonAccordion"
        class="accordion__button"
        src="/src/assets/icons/caret.svg"
        alt=""
        width="8"
        height="13"
        loading="lazy"
      />
    </div>
    <transition v-show="isContentVisible">
      <slot name="content"></slot>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  id: {
    type: String,
  },
  classNameTitle: {
    type: String,
  },
  classNameContent: {
    type: String,
  },
  isOpened: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isButtonAccordion: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits({
  opened: () => true,
});

let isContentVisible = ref(props.isOpened);

const toggleContent = () => {
  if (!props.isBlocked) {
    isContentVisible.value = !isContentVisible.value;
    emit("opened");
  }
};

watch(
  () => props.isOpened,
  () => (isContentVisible.value = props.isOpened)
);
</script>

<style>
.accordion {
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.accordion__header {
  align-items: center;
  cursor: pointer;
}

.accordion--blocked {
  pointer-events: none;
}

.accordion__title {
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: linear;
  pointer-events: none;
}

.accordion__button {
  width: 8px;
  height: 16px;
  margin-left: auto;
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: linear;
  pointer-events: none;
}

.accordion--active .accordion__button {
  transform: rotate(90deg);
}
</style>
