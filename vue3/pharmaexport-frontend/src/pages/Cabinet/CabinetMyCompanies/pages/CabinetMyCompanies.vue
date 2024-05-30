<!-- TODO: Добавить лоадинг -->

<template>
  <template v-if="!route.params.id || (route.params.id && currentCompany)">
    <CabinetTitle>My companies</CabinetTitle>

    <CabinetMyCompaniesList
      v-if="!myCompaniesLoading"
      :companies="companies"
      :current-company="currentCompany"
    />

    <CabinetMyCompaniesCompany
      v-if="!myCompaniesLoading"
      :current-company="currentCompany"
      :current-country="currentCountry"
    />
  </template>

  <NotFound v-else />
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import NotFound from "~/pages/404NotFound.vue";

import CabinetTitle from "../../components/CabinetTitle.vue";
import CabinetMyCompaniesCompany from "../components/CabinetMyCompaniesCompany.vue";
import CabinetMyCompaniesList from "../components/CabinetMyCompaniesList.vue";

import myCompaniesSchema from "../api/graphql/queries/myCompanies.graphql";

const route = useRoute();
const router = useRouter();

const { loading: myCompaniesLoading, result: myCompaniesResult } = useQuery(myCompaniesSchema);
const companies = computed(() => myCompaniesResult.value?.companies ?? []);
const countries = computed(() => myCompaniesResult.value?.countries ?? []);

const currentCompany = computed(() => {
  if (route.params.id) {
    return companies.value?.find((company) => String(company.id) === route.params.id);
  } else if (companies.value?.[0]) {
    router.replace({
      name: "cabinetCompany",
      params: {
        id: companies.value?.[0].id,
      },
    });

    return companies.value?.[0];
  }

  return null;
});

const currentCountry = computed(() => {
  if (currentCompany.value) {
    return countries.value?.find((country) => String(country.id) === String(currentCompany.value.country_id));
  }

  return null;
});
</script>
