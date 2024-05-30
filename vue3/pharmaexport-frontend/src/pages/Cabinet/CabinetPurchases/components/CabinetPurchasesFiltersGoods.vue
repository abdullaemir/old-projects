<template>
  <BaseFormRow class="purchases__form-filters-wrapper">
    <BaseSelect
      id="dosage-inn"
      ref="dosageInn"
      :filterable="false"
      label="Dosage"
      :loading="dosageLoading"
      multiple
      name="dosage_forms"
      :options="optionsDosage"
      remote
      :remote-method="remoteMethodDosage"
      show-clear-tag
      tag="dosage_form"
      value-key="dosage_form"
      @change-select="updateFilters"
    />
    <BaseSelect
      id="drug-form-inn"
      ref="drugFormInn"
      :filterable="false"
      label="Drug form"
      :loading="drugFormLoading"
      multiple
      name="drug_forms"
      :options="optionsDrugForm"
      remote
      :remote-method="remoteMethodDrugForm"
      show-clear-tag
      tag="drug_form"
      value-key="drug_form"
      @change-select="updateFilters"
    />
    <BaseInputCreateTag
      id="therapy-area-inn"
      ref="inputCreateTag"
      :disabled="!productName"
      label="Therapy area"
      name="therapy_areas"
      @change="updateFilters"
    />
  </BaseFormRow>
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import { watchDebounced } from "@vueuse/core";
import { useForm } from "vee-validate";
import { ref, computed } from "vue";

import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseInputCreateTag from "~/components/base/BaseInputCreateTag.vue";
import BaseSelect from "~/components/base/BaseSelectBox/BaseSelect.vue";

import goodDosageFormSchema from "../api/graphql/queries/goodDosageForm.graphql";
import goodDrugFormSchema from "../api/graphql/queries/goodDrugForm.graphql";

defineProps({
  productName: {
    default: "",
    type: String,
  },
});

const emits = defineEmits({
  filters: (value) => value,
});

const { values } = useForm();

const inputCreateTag = ref(null);
const dosageInn = ref(null);
const drugFormInn = ref(null);

const searchDosage = ref("");
const searchDrugForm = ref("");
const dosageEnabled = ref(false);
const drugFormEnabled = ref(false);

const updateFilters = () => {
  emits("filters", values);
};

const resetFilters = () => {
  inputCreateTag.value.clearTags();
  dosageInn.value.clearSelect();
  drugFormInn.value.clearSelect();
  updateFilters();
};

const {
  loading: dosageLoading,
  result: dosageResult,
  refetch: dosageRefetch,
} = useQuery(goodDosageFormSchema, {}, () => ({
  enabled: dosageEnabled.value,
}));

const optionsDosage = computed(() => dosageResult.value?.goodDosageForm ?? []);

const {
  loading: drugFormLoading,
  result: drugFormResult,
  refetch: drugFormRefetch,
} = useQuery(goodDrugFormSchema, {}, () => ({
  enabled: drugFormEnabled.value,
}));

const optionsDrugForm = computed(() => drugFormResult.value?.goodDrugForm ?? []);

watchDebounced(
  searchDosage,
  async () => {
    if (searchDosage.value) {
      await dosageRefetch({
        filter: {
          dosage_form: searchDosage.value,
        },
      });
    }

    dosageEnabled.value = false;
  },
  {
    debounce: 500,
  },
);

const remoteMethodDosage = (query) => {
  dosageEnabled.value = true;
  searchDosage.value = query;
};

watchDebounced(
  searchDrugForm,
  async () => {
    if (searchDrugForm.value) {
      await drugFormRefetch({
        filter: {
          drug_form: searchDrugForm.value,
        },
      });
    }

    drugFormEnabled.value = false;
  },
  {
    debounce: 500,
  },
);

const remoteMethodDrugForm = (query) => {
  drugFormEnabled.value = true;
  searchDrugForm.value = query;
};

defineExpose({
  resetFilters,
});
</script>
