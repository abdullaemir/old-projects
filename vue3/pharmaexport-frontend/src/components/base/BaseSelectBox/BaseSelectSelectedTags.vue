<template>
  <div class="select__box-selected-tags">
    <span ref="visibleTags" class="select__selected-visible">
      <BaseSelectTag
        v-for="(option, index) in selectedOptionVisible"
        :option="option"
        :key="`select-${useProps.id}-option-${index}-selected`"
        @deselect="emits('deselect', $event)"
      ></BaseSelectTag>
    </span>
    <p ref="notVisibleTags" class="select__selected-notvisible" v-if="selectedOptionNotVisible">+{{selectedOptionNotVisible}}</p>
  </div>
</template>

<script setup>
import {inject, nextTick, ref, toRef, watch} from "vue";
import BaseSelectTag from "./BaseSelectTag.vue"

const visibleTags = ref('');
const useProps = inject("useProps");
const selectContainerWidth = inject("selectContainerWidth", 0);

const emits = defineEmits({ deselect: (option) => true });

const props = defineProps({
  selectedOptions: {
    default: null,
    type: Array
  },
})

const selectedOptions = toRef(props, 'selectedOptions');
const selectedOptionVisible = ref([]);
const selectedOptionNotVisible = ref(0);
const notVisibleTags = ref('');

const getSelectedOptions = () => {
  selectedOptionVisible.value = [...selectedOptions.value]
  if (useProps.multiple) {
    nextTick(()=>{
      let countChildrenVisible = 0;
      const notVisibleTagsWidth = notVisibleTags.value ? notVisibleTags.value.getBoundingClientRect().width : 0;
      let widthSelectedOption = 70 + notVisibleTagsWidth;
      [...visibleTags.value.children].map(item => {
        const widthItemTags = item.getBoundingClientRect().width + widthSelectedOption
        if (widthItemTags < selectContainerWidth.value) {
          countChildrenVisible++;
          widthSelectedOption = widthItemTags;
        }
        return item
      })
      selectedOptionVisible.value = [...selectedOptions.value.slice(0, countChildrenVisible)]
      selectedOptionNotVisible.value = selectedOptions.value.length - selectedOptionVisible.value.length
    })
  }
}

watch(selectedOptions, () => {
  getSelectedOptions()
}, {deep: true})
</script>


<style scoped>
.select__box-selected-tags {
  display: flex;
  align-items: center;
}

.select__selected-visible {
  display: flex;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
}

.select__selected-notvisible {
  display: flex;
  align-items: center;
  height: 18px;
  border: var(--select-border-width) solid var(--select-color-disabled);
  background-color: var(--select-border-color-disabled);
  border-radius: 4px;
  padding: 0 5px;
  font-size: var(--select-large-font-size);
  font-weight: var(--select-font-weight);
  word-break: initial;
}

/*.select--multiple.select--open.select--filterable .select__selected-notvisible {*/
/*  opacity: 0.1;*/
/*}*/

/*.select--open .select__selected-notvisible {*/
/*  opacity: 0.5;*/
/*}*/

/*.select--searching .select__selected-notvisible {*/
/*  display: none;*/
/*}*/

</style>
