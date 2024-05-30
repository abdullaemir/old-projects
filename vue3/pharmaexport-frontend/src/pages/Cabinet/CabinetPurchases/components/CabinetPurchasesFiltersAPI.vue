<template>
  <BaseFormRow class="purchases__form-filters-wrapper">
    <BaseSelect
      id="therapeutic-category-api"
      ref="therapeuticCategoryApi"
      :filterable="false"
      label="Type of usage"
      :loading="typeOfUsageLoading"
      multiple
      name="type_of_usages"
      :options="optionsTypeOfUsage"
      remote
      :remote-method="remoteMethodTypeOfUsage"
      show-clear-tag
      tag="type_of_usage"
      value-key="type_of_usage"
      @change-select="updateFilters"
    />
    <BaseSelect
      id="type-usage-api"
      ref="typeUsageApi"
      :filterable="false"
      label="Therapeutic category"
      :loading="categoryLoading"
      multiple
      name="therapeutic_categories"
      :options="optionsCategory"
      remote
      :remote-method="remoteMethodCategory"
      show-clear-tag
      tag="therapeutic_category"
      value-key="therapeutic_category"
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

import apriTherapeuticCategorySchema from "../api/graphql/queries/apriTherapeuticCategory.graphql";
import apriTypeOfUsageSchema from "../api/graphql/queries/apriTypeOfUsage.graphql";

const emits = defineEmits({
  filters: () => true,
});

const { values } = useForm();

const therapeuticCategoryApi = ref(null);
const typeUsageApi = ref(null);

const searchTypeOfUsage = ref("");
const searchCategory = ref("");
const typeOfUsageEnabled = ref(false);
const categoryEnabled = ref(false);

const updateFilters = () => {
  emits("filters", values);
};

const resetFilters = () => {
  therapeuticCategoryApi.value.clearSelect();
  typeUsageApi.value.clearSelect();
  updateFilters();
};

const {
  loading: typeOfUsageLoading,
  result: typeOfUsageResult,
  refetch: typeOfUsageRefetch,
} = useQuery(apriTypeOfUsageSchema, {}, () => ({
  enabled: typeOfUsageEnabled.value,
}));

const optionsTypeOfUsage = computed(() => typeOfUsageResult.value?.apriTypeOfUsage ?? []);

const {
  loading: categoryLoading,
  result: categoryResult,
  refetch: categoryRefetch,
} = useQuery(apriTherapeuticCategorySchema, {}, () => ({
  enabled: categoryEnabled.value,
}));

const optionsCategory = computed(() => categoryResult.value?.apriTherapeuticCategory ?? []);

watchDebounced(
  searchTypeOfUsage,
  async () => {
    if (searchTypeOfUsage.value) {
      await typeOfUsageRefetch({
        filter: {
          type_of_usage: searchTypeOfUsage.value,
        },
      });
    }
  },
  {
    debounce: 500,
  },
);

const remoteMethodTypeOfUsage = (query) => {
  typeOfUsageEnabled.value = true;
  searchTypeOfUsage.value = query;
};

watchDebounced(
  searchCategory,
  async () => {
    if (searchCategory.value) {
      await categoryRefetch({
        filter: {
          therapeutic_category: searchCategory.value,
        },
      });
    }
  },
  {
    debounce: 500,
  },
);

const remoteMethodCategory = (query) => {
  categoryEnabled.value = true;
  searchCategory.value = query;
};

defineExpose({
  resetFilters,
});
</script>
