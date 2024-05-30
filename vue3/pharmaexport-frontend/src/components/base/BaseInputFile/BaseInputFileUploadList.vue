<template>
  <ul class="list">
    <li
      v-for="(file,index) in files"
      :key="index"
      class="list__item"
    >
      <span
        :title="file.name"
        class="list__text">
         {{ file.name}}
      </span>

      <button
        type="button"
        class="list__button"
        @click="$emit('file-delete', file.name)"
      >
        <svg
          class="list__icon"
          fill="none"
          width="18"
          height="18"
        >
          <circle
            cx="9"
            cy="9"
            r="9"
            fill="var(--input-file-list-icon-background-color)"
            opacity="0.6"
          />
          <path
            fill="var(--input-file-list-icon-cross-background-color)"
            d="M11.293 5.293a1 1 0 1 1 1.414 1.414l-1.414-1.414Zm-6 1.414a1 1 0 0 1 1.414-1.414L5.293 6.707ZM9
              9l.707.707a1 1 0 0 1-1.414 0L9 9Zm3.707-2.293-3 3-1.414-1.414 3-3 1.414 1.414Zm-4.414 3-3-3 1.414-1.414
              3 3-1.414 1.414Z"
          />
          <path
            fill="var(--input-file-list-icon-cross-background-color)"
            d="M11.293 12.707a1 1 0 0 0 1.414-1.414l-1.414 1.414Zm-6-1.414a1 1 0 1 0 1.414 1.414l-1.414-1.414ZM9
              9l.707-0.707a1 1 0 0 0-1.414 0L9 9Zm3.707 2.293-3-3-1.414 1.414 3 3 1.414-1.414Zm-4.414-3-3 3 1.414 1.414
              3-3-1.414-1.414Z"
          />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script setup>
defineEmits({
  "file-delete": () => true,
});

defineProps({
  files: {
    default: Array,
    required: true,
    type: Array,
  },
});
</script>

<style scoped>
.list {
  max-height: 150px;
  margin: 0;
  padding-left: 0;
  list-style: none;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--input-file-list-scrollbar-thumb-background-color) transparent;
}

.list::-webkit-scrollbar {
  width: 16px;
  height: 16px;
  background-color: transparent;
}

.list::-webkit-scrollbar-track {
  margin: 8px;
}

.list::-webkit-scrollbar-thumb {
  border: 4px solid transparent;
  border-radius: 8px;
  background-color: var(--input-file-list-scrollbar-thumb-background-color);
  background-clip: content-box;
}

@media (any-pointer: fine) {
  .list::-webkit-scrollbar-thumb:hover {
    background-color: var(--input-file-list-scrollbar-thumb-background-color-hover);
  }
}

.list::-webkit-scrollbar-corner {
  background-color: transparent;
}

.list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1px 5px 1px 16px;
  border-bottom: var(--input-file-border-width) solid var(--input-file-border-color);
}
/*TODO: сделать динамическую ширину*/
.list__text {
  max-width:  220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .list__text {
    max-width:  300px;
  }
}

.list__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 5px;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.list__icon circle {
  transition-property: fill;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

@media (any-pointer: fine) {
  .list__button:hover .list__icon circle,
  .list__button:focus .list__icon circle {
    fill: var(--input-file-button-background-color-hover);
  }
}
</style>

