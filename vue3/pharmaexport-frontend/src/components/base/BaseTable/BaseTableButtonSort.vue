<template>
  <button
    class="button-sort"
    type="button"
    @click="updateSort"
  >
    <svg
      :class="['button-sort__item', {'button-sort__item--active': asSort==='ASC'}]"
      width="7" height="7" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 4.33 3.5.45 0 4.33h7Z"/>
    </svg>

    <svg
      :class="['button-sort__item', {'button-sort__item--active': asSort ==='DESC'}]"
      width="7" height="7" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m0 .67 3.5 3.89L7 .66H0Z"/>
    </svg>
  </button>
</template>

<script setup>
import {ref} from "vue";

const asSort = ref("")
const emits = defineEmits({
  "sortBy": () => true
})

const updateSort = () => {
  switch (asSort.value) {
    case "ASC": {
      asSort.value = "DESC"
      break
    }
    case "DESC": {
      asSort.value = ""
      break
    }
    case "": {
      asSort.value = "ASC"
      break
    }
  }
  emits("sortBy", asSort.value)
}
</script>

<style scoped>
.button-sort {
  height: 40px;
  width: 40px;
  display: flex;
  margin: -13px 0 -13px -16px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.button-sort__item path {
  fill: var(--blue-light);
}

.button-sort__item--active path {
  fill: var(--blue-darkest);
}
</style>
