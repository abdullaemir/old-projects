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
import {toRef, computed} from "vue";

const props = defineProps({
  dataSort: {
    type: Object,
    default() {
      return {}
    }
  },
  currSorts: {
    type: [Object, String],
    default() {
      return {}
    }
  }
})

const emits = defineEmits({
  "update-sorts": (value) => value
})

const dataSort = toRef(props, "dataSort")
const currSorts = toRef(props, "currSorts")

const asSort = computed(() => {
  const currSort = currSorts.value?.orderBy?.find(item => {
    return item.field === dataSort.value.field
  }) ?? ""
  if (!currSort) return ""
  return currSort.sort
})

const getSorts = (sorts) => {
  const filteredSorts = sorts.filter(item => item.sort)
  emits("update-sorts", filteredSorts.length ? {orderBy: filteredSorts} : {orderBy: []})
}

const updateSort = () => {
  let currSort = currSorts.value?.orderBy?.find(item => {
    return item.field === dataSort.value.field
  }) ?? ""
  if (!currSort) {
    const newCurrSorts = [{field: dataSort.value.field , sort: dataSort.value.sorts[0]}]
    getSorts(newCurrSorts)
    return
  }
  const indexCurrSort = dataSort.value.sorts.findIndex(item => item === currSort.sort)
  currSort.sort = indexCurrSort >= dataSort.value.sorts.length - 1 ? dataSort.value.sorts[0] : dataSort.value.sorts[indexCurrSort+1]
  getSorts([currSort])
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
