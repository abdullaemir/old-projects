<template>
  <div :class="['accordion', { 'active': !isContentHidden }]">
    <div
      class="accordion__header"
      @click="toggleContent"
    >
      <span class="accordion__title">
        <slot />
      </span>
    </div>
    <div
      class="accordion__content"
      ref="content"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseAccordion",
  data() {
    return {
      isContentHidden: !this.opened
    }
  },
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleContent() {
      const content = this.$refs.content;

      this.isContentHidden = !this.isContentHidden;
      content.style.maxHeight = content.style.maxHeight ? null : `${content.scrollHeight}px`;

      if (!this.isContentHidden) {
        this.$emit("toggle");
      }
    }
  }
}
</script>

<style>
.accordion {
  border-bottom: 1px solid var(--border-color-primary);
  background-color: var(--background-color-primary);
  transition-property: height, padding-bottom, border-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.accordion.active {
  padding-bottom: 20px;
  border-color: transparent;
}

.accordion__header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  cursor: pointer;
  transition-property: margin-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.accordion.active .accordion__header {
  margin-bottom: 20px;
  background-image: var(--background-color-septenary);
}

.accordion__title {
  display: flex;
  align-items: center;
  text-align: center;
  font-weight: 500;
}

@media (min-width: 1920px) {
  .accordion__title {
    font-size: 20px;
  }
}

.accordion__content {
  max-height: 0;
  padding: 0 20px;
  font-weight: 300;
  overflow: hidden;
  transition-property: max-height;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 1920px) {
  .accordion__content {
    font-size: 16px;
  }
}
</style>
