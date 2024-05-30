<template>
  <BaseFormRow class="purchases__form-filters-wrapper">
    <BaseSelect
      id="dosage-ctd"
      ref="dosageCtd"
      :filterable="false"
      label="Dosage form"
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
      id="therapy-area-ctd"
      ref="therapyAreaCtd"
      :filterable="false"
      label="Therapy area"
      :loading="therapyAreaLoading"
      name="therapy_areas"
      :options="optionsTherapyArea"
      remote
      :remote-method="remoteMethodTherapyArea"
      show-clear-tag
      tag="therapy_area"
      value-key="therapy_area"
      @change-select="updateFilters"
    />
  </BaseFormRow>
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import { watchDebounced } from "@vueuse/core";
import { useForm } from "vee-validate";
import { ref, computed } from "vue";

import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseSelect from "~/components/base/BaseSelectBox/BaseSelect.vue";

import ctdDossierDosageFormSchema from "../api/graphql/queries/ctdDossierDosageForm.graphql";
import ctdDossierTherapyAreaSchema from "../api/graphql/queries/ctdDossierTherapyArea.graphql";

const emits = defineEmits({
  filters: (value) => value,
});

const { values } = useForm();

const dosageCtd = ref(null);
const therapyAreaCtd = ref(null);

const searchDosage = ref("");
const searchTherapyArea = ref("");
const dosageEnabled = ref(false);
const therapyAreaEnabled = ref(false);

const updateFilters = () => {
  emits("filters", values);
};

const resetFilters = () => {
  dosageCtd.value.clearSelect();
  therapyAreaCtd.value.clearSelect();
  updateFilters();
};

const {
  loading: dosageLoading,
  result: dosageResult,
  refetch: dosageRefetch,
} = useQuery(ctdDossierDosageFormSchema, {}, () => ({
  enabled: dosageEnabled.value,
}));

const optionsDosage = computed(() => dosageResult.value?.ctdDossierDosageForm ?? []);

const {
  loading: therapyAreaLoading,
  result: therapyAreaResult,
  refetch: therapyAreaRefetch,
} = useQuery(ctdDossierTherapyAreaSchema, {}, () => ({
  enabled: therapyAreaEnabled.value,
}));

const optionsTherapyArea = computed(() => therapyAreaResult.value?.ctdDossierTherapyArea ?? []);

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
  searchTherapyArea,
  async () => {
    if (searchTherapyArea.value) {
      await therapyAreaRefetch({
        filter: {
          therapy_area: searchTherapyArea.value,
        },
      });
    }

    therapyAreaEnabled.value = false;
  },
  {
    debounce: 500,
  },
);

const remoteMethodTherapyArea = (query) => {
  therapyAreaEnabled.value = true;
  searchTherapyArea.value = query;
};

defineExpose({
  resetFilters,
});
</script>
