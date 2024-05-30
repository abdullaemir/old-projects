<template>
  <span class="drag__overlay">
    <span class="drag">
      <svg
        class="drag__icon"
        width="38"
        height="30"
        fill="none"
      >
        <path
          fill="var(--input-file-drag-icon-background-color)"
          d="M20 1a1 1 0 1 0-2 0h2Zm-2 0v18.7h2V1h-2Z"
        />
        <path
          stroke="var(--input-file-drag-icon-background-color)"
          stroke-linecap="round"
          stroke-width="2"
          d="m9.9 12.3 9.1 6.8 9.1-6.8"
        />
        <path
          stroke="var(--input-file-drag-icon-background-color)"
          stroke-width="2"
          d="M1 18.8V22a7 7 0 0 0 7 7h22a7 7 0 0 0 7-7v-3.2"
        />
      </svg>

      <span>
        {{ dragText }}
      </span>
    </span>
  </span>
</template>

<script setup>
defineProps({
  dragText: {
    default: "",
    type: String,
  },
})
</script>

<style scoped>
.drag {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 12px 17px;
  background-color: var(--input-file-drag-block-background-color);
  opacity: 0.85;
  border-radius: var(--input-file-border-radius);
  text-align: center;
}

.drag__overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  display: flex;
  place-content: center;
  padding: 10px 24px;
  border-radius: var(--input-file-border-radius);
  background-color: var(--input-file-drag-background-color);
  border: var(--input-file-drag-border-width) solid var(--input-file-drag-border-color);
  color: var(--input-file-drag-color);
  transition-property: opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

.drag__icon {
  margin-bottom: 12px;
}
</style>
