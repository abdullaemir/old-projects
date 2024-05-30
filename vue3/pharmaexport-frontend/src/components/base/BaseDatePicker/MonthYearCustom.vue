<template>
  <div class="monthYearCustom">
    <div class="select-group">
      <div class="select__wrapper">
        <select
          v-model="yearModel"
          id="1"
          class="select-item"
        >
          <option v-for="yearItem in years" :key="yearItem.text" :value="yearItem.value">{{
              yearItem.text
            }}
          </option>
        </select>
      </div>
      <div class="select__wrapper">
        <select
          v-model="monthModel"
          id="2"
          class="select-item"
        >
          <option v-for="monthItem in months" :key="monthItem.text" :value="monthItem.value">{{
              monthItem.text
            }}
          </option>
        </select>
      </div>
    </div>
    <!--    <div class="arrow-group">-->
    <!--      <div class="arrow__wrapper" @click="monthPrev">-->
    <!--        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">-->
    <!--          <path d="M8.93359 16.333L1.60026 8.99967L8.93359 1.66634" stroke="#04202F" stroke-width="2"-->
    <!--                stroke-linecap="round" stroke-linejoin="round"/>-->
    <!--        </svg>-->
    <!--      </div>-->
    <!--      <div class="arrow__wrapper" @click="monthNext">-->
    <!--        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">-->
    <!--          <path d="M1.06641 16.333L8.39974 8.99967L1.06641 1.66634" stroke="#04202F" stroke-width="2"-->
    <!--                stroke-linecap="round" stroke-linejoin="round"/>-->
    <!--        </svg>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import {computed} from "vue";

// eslint-disable-next-line vue/require-emit-validator
const emit = defineEmits(["update:month", "update:year"])

const props = defineProps({
  month: {
    default: null,
    type: Number,
  },
  months: {
    default: () => [],
    type: Array,
  },
  year: {
    default: null,
    type: Number,
  },
  years: {
    default: () => [],
    type: Array,
  },
})

const monthModel = computed({
  get() {
    return props.month
  },
  set(v) {
    emit('update:month', v)
  }
})
const yearModel = computed({
  get() {
    return props.year
  },
  set(v) {
    emit('update:year', v)
  }
})
//
// const monthPrev = () => {
//   if (monthModel.value === 0) {
//     monthModel.value = 11;
//     yearModel.value--;
//     return
//   }
//   monthModel.value--
// }
//
// const monthNext = () => {
//   if (monthModel.value === 11) {
//     monthModel.value = 0;
//     yearModel.value++;
//     return
//   }
//   monthModel.value++
// }
</script>


<style scoped>
.monthYearCustom {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.select-group {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 65%;
}

.select__wrapper {
  width: 100%;
  height: 37px;
}

.select-item {
  width: 100%;
  height: 100%;
  border-radius: 0;
  border: 1px solid #DDDFE0;
  background-color: white;
  padding: 0 8px;
}

.select__wrapper:first-child .select-item {
  border-radius: 8px 0 0 8px;
}

.select__wrapper:last-child .select-item {
  border-radius: 0 8px 8px 0;
}

.arrow-group {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.arrow__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  transition: 0.2s ease-in-out all;
}

.arrow__wrapper:hover {
  background-color: #f6f6f6;
}
</style>
