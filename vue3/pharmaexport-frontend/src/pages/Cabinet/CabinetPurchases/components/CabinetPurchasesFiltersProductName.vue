<template>
  <BaseFormRow class="purchases__form-filters-products">
    <BaseSelect
      id="product_name"
      ref="inputProductName"
      :filterable="false"
      label="Product name"
      :loading="productsGoodLoading || productsApiLoading || productsCtdLoading"
      name="product_name"
      :options="optionsProductName"
      prepend
      remote
      :remote-method="remoteMethodProducts"
      :show-arrow-indicator="false"
      show-clear-tag
      tag="product_name"
      value-key="product_name"
      @change-select="updateFilters"
    />
  </BaseFormRow>
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import { watchDebounced } from "@vueuse/core";
import { useForm } from "vee-validate";
import { ref, watch } from "vue";

import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseSelect from "~/components/base/BaseSelectBox/BaseSelect.vue";

import apiProductsNameSchema from "../api/graphql/queries/apriProductsName.graphql";
import ctdDossierProductsNameSchema from "../api/graphql/queries/ctdDossierProductsName.graphql";
import goodProductsNameSchema from "../api/graphql/queries/goodProductsName.graphql";

const props = defineProps({
  currentTab: {
    default: "",
    type: String,
  },
});

const emits = defineEmits({
  filters: (value) => value,
});

const { values } = useForm();

const inputProductName = ref(null);
const searchProducts = ref("");
const optionsProductName = ref([]);
const productsInnEnabled = ref(false);
const productsCtdEnabled = ref(false);
const productsApiEnabled = ref(false);

watch(
  () => props.currentTab,
  () => {
    inputProductName.value.clearSelect();
    optionsProductName.value = [];
  },
  {
    deep: true,
  },
);

const updateFilters = () => {
  emits("filters", values);
};

const {
  loading: productsGoodLoading,
  result: productsGoodResult,
  refetch: productsGoodRefetch,
} = useQuery(goodProductsNameSchema, {}, () => ({
  enabled: productsInnEnabled.value,
  fetchPolicy: "no-cache",
}));

const {
  loading: productsCtdLoading,
  result: productsCtdResult,
  refetch: productsCtdRefetch,
} = useQuery(ctdDossierProductsNameSchema, {}, () => ({
  enabled: productsCtdEnabled.value,
  fetchPolicy: "no-cache",
}));

const {
  loading: productsApiLoading,
  result: productsApiResult,
  refetch: productsApiRefetch,
} = useQuery(apiProductsNameSchema, {}, () => ({
  enabled: productsApiEnabled.value,
  fetchPolicy: "no-cache",
}));

watchDebounced(
  searchProducts,
  async () => {
    if (!searchProducts.value) {
      optionsProductName.value = [];

      return;
    }

    switch (props.currentTab) {
      case "CTD-Dossier": {
        await productsCtdRefetch({
          product_name: searchProducts.value,
        });

        optionsProductName.value = productsCtdResult.value?.ctdDossierProductName ?? [];
        productsCtdEnabled.value = false;

        break;
      }

      case "API": {
        await productsApiRefetch({
          product_name: searchProducts.value,
        });

        optionsProductName.value = productsApiResult.value?.apriProductName ?? [];
        productsApiEnabled.value = false;

        break;
      }

      default: {
        await productsGoodRefetch({
          product_name: searchProducts.value,
        });

        optionsProductName.value = productsGoodResult.value?.goodProductName ?? [];
        productsInnEnabled.value = false;

        break;
      }
    }
  },
  {
    debounce: 500,
  },
);

const remoteMethodProducts = (query) => {
  switch (props.currentTab) {
    case "CTD-Dossier": {
      productsCtdEnabled.value = true;

      break;
    }

    case "API": {
      productsApiEnabled.value = true;

      break;
    }

    default: {
      productsInnEnabled.value = true;

      break;
    }
  }

  searchProducts.value = query;
};
</script>

<style scoped>
.purchases__form-filters-products {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-flow: row;
  grid-gap: 20px;
}
</style>
