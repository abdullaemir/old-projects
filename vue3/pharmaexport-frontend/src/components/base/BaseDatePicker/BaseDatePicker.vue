<template>
  <Datepicker
    ref="datepicker"
    v-model="changeDatePicker"
    v-bind="$attrs"
    inputClassName="dp-custom-input"
    menuClassName="dp-custom-menu"
    calendarClassName="dp-custom-calendar"
    :month-year-component="monthYear"
    autoApply
    hideInputIcon
    :enableTimePicker="enableTimePicker"
    utc
    locale="ru-RU"
    :format="format"
    @open="openMenu=!openMenu"
    @closed="openMenu=!openMenu"
    :range="range"
  >
    <template #dp-input="{ value, onClear }">
      <DataPickerInputCustom
        v-bind="$attrs"
        readonly
        :value="value"
        :clearable="clearable"
        @clearDate="onClear"
        :openMenu="openMenu"
      />
    </template>
  </Datepicker>
</template>

<script setup>
import Datepicker from '@vuepic/vue-datepicker';
// eslint-disable-next-line import/no-unassigned-import
import '@vuepic/vue-datepicker/dist/main.css';
import {computed, ref, defineAsyncComponent} from "vue";

const MonthYear = defineAsyncComponent(() => import('./MonthYearCustom.vue'));
const DataPickerInputCustom = defineAsyncComponent(() => import('./DataPickerInputCustom.vue'));

const props = defineProps({
  clearable: {
    default: true,
    type: Boolean
  },
  enableTimePicker: {
    default: false,
    type: Boolean
  },
  modelValue: {
    default: '',
    type: [Date, Array, String, Number]
  },
  range: {
    default: true,
    type: Boolean
  }
})
const datepicker = ref("")
const openMenu = ref(false)
// eslint-disable-next-line vue/require-emit-validator
const emit = defineEmits(["update:modelValue"])
const monthYear = computed(() => MonthYear);


const changeDatePicker = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emit('update:modelValue', v)
  }
})

const format = computed(() => {
  if (!props.enableTimePicker) return "dd.MM.yyyy"
  return "dd.MM.yyyy HH:mm"
})
</script>

<script>
export default {
  name: "BaseDatePicker",
  inheritAttrs: false,
}
</script>

<style>
.dp-custom-menu {
  box-shadow: 0 0 40px rgba(5, 12, 20, 0.09);
  border-radius: 8px;
  border: none;
  padding: 20px;
  min-width: 280px;
}

.datepicker__trigger-box {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;

}

.dp-custom-menu .dp__arrow_top {
  display: none;
}

.dp-custom-menu .dp__calendar_wrap {
  margin-top: 16px;
}

.dp-custom-menu .dp__action_buttons {
  display: flex;
  flex-direction: row;
}

.dp-custom-menu.dp__menu:focus {
  border: none
}

.dp-custom-calendar .dp__cell_inner {
  border-radius: 50%;
}

.dp-custom-calendar .dp__cell_inner:not(.dp__active_date,.dp__range_end, .dp__range_start):hover {
  background-color: #F8F9FA;
}

.dp-custom-calendar .dp__active_date, .dp__range_end, .dp__range_start {
  background-color: #009FE3;
}

.dp-custom-calendar .dp__today {
  border: 1px solid #009FE3;
}

.dp-custom-calendar .dp__calendar_header_item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 400;
  color: #676E7A;
}

.dp-custom-calendar .dp__cell_inner {
  font-size: 12px;
  font-weight: 400;
}

.dp-custom-calendar .dp__calendar_header_separator {
  background-color: #E4E4E4;
}

.dp__input_wrap .dp__clear_icon {
  display: none;
}
</style>
