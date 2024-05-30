<template>
  <CabinetTitle>My companies</CabinetTitle>

  <BaseBreadcrumbs :breadcrumbs="breadcrumbs" />

  <CabinetForm
    :button-submit-disabled="companyCreateLoading || companyUpdateLoading || companiesLoading"
    button-submit-text="Yalla!"
    :comeback-link="routerLink"
    :title="route.params.id ? 'Edit company' : 'Add company'"
    @submit.prevent="createUpdateCompany"
  >
    <BaseFormRow>
      <BaseInput
        id="name"
        label="Company name"
        name="name"
        rules="required"
      />
    </BaseFormRow>

    <BaseFormRow>
      <BaseInput
        id="registration_number"
        label="Registration number"
        name="registration_number"
        rules="required"
      />

      <BaseSelect
        id="country_id"
        label="Country of registration"
        name="country_id"
        :options="countries"
        rules="required"
        tag="name"
        value-key="id"
      />
    </BaseFormRow>

    <BaseFormRow>
      <BaseInput
        id="site"
        label="Site"
        name="site"
        :rules="{ regex: /\w+\.\w+/ }"
        type="url"
      />
    </BaseFormRow>

    <ClientOnly v-if="documents.length">
      <CabinetDivider />

      <p class="company__description">
        Attached files
      </p>

      <ul class="company__files">
        <li
          v-for="(file, index) in documents"
          :key="index"
          class="company__file"
        >
          <BaseButton
            class="company__file-delete"
            type="button"
            @click="hiddenDocument(index)"
          >
            <svg
              fill="none"
              height="18"
              width="18"
            >
              <circle
                cx="9"
                cy="9"
                fill="#aebed6"
                opacity="0.6"
                r="9"
              />
              <path
                d="M11.293 5.293a1 1 0 1 1 1.414 1.414l-1.414-1.414Zm-6 1.414a1 1 0 0 1 1.414-1.414L5.293 6.707ZM9
                  9l.707.707a1 1 0 0 1-1.414 0L9 9Zm3.707-2.293-3 3-1.414-1.414 3-3 1.414 1.414Zm-4.414 3-3-3
                  1.414-1.414 3 3-1.414 1.414Z"
                fill="#f6f7fb"
              />
              <path
                d="M11.293 12.707a1 1 0 0 0 1.414-1.414l-1.414 1.414Zm-6-1.414a1 1 0 1 0 1.414 1.414l-1.414-1.414ZM9
                  9l.707-0.707a1 1 0 0 0-1.414 0L9 9Zm3.707 2.293-3-3-1.414 1.414 3 3 1.414-1.414Zm-4.414-3-3 3 1.414
                  1.414 3-3-1.414-1.414Z"
                fill="#f6f7fb"
              />
            </svg>
          </BaseButton>

          <BaseLink
            class="company__file-name"
            download
            :href="file.url"
          >
            {{ file.name }}
          </BaseLink>
        </li>
      </ul>
    </ClientOnly>

    <CabinetDivider />

    <p class="company__description">
      Please provide verification documents for your company. You will get full access to the services after company
      verification
    </p>

    <BaseFormRow>
      <BaseInputFile
        id="files"
        accept=".csv,.doc,.docx,.jpg,.jpeg,.pdf,.png,.xlsx"
        button-text="Choose a file"
        label="Upload file, drag it here"
        label-separator="or"
        multiple
        name="files_new"
        rules="ext:csv,doc,docx,jpg,jpeg,pdf,png,xlsx|max_length:10"
      />
    </BaseFormRow>
  </CabinetForm>
</template>

<script setup>
import { SetErrorsFields, UseFile } from "@pg/helpers";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useForm } from "vee-validate";
import { ClientOnly } from "vite-ssr";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import BaseBreadcrumbs from "~/components/base/BaseBreadcrumbs.vue";
import BaseButton from "~/components/base/BaseButton.vue";
import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseInputFile from "~/components/base/BaseInputFile/BaseInputFile.vue";
import BaseLink from "~/components/base/BaseLink.vue";
import { useNotification } from "~/components/base/BaseNotification.vue";
import BaseSelect from "~/components/base/BaseSelectBox/BaseSelect.vue";

import CabinetDivider from "../../components/CabinetDivider.vue";
import CabinetForm from "../../components/CabinetForm.vue";
import CabinetTitle from "../../components/CabinetTitle.vue";

import companyCreateSchema from "../api/graphql/mutations/companyCreate.graphql";
import companyUpdateSchema from "../api/graphql/mutations/companyUpdate.graphql";
import companiesSchema from "../api/graphql/queries/companies.graphql";
import myCompaniesSchema from "../api/graphql/queries/myCompanies.graphql";

const route = useRoute();
const router = useRouter();
const { handleSubmit, setErrors, setValues } = useForm();

const routerLink = ref({
  name: "cabinetCompanies",
});

const breadcrumbs = [
  {
    name: "My companies",
    to: {
      name: "cabinetCompanies",
    },
  },
];

const routerId = route.params.id;

const { result: myCompaniesResult } = useQuery(myCompaniesSchema);
const { loading: companiesLoading } = useQuery(companiesSchema);

const companies = computed(() => myCompaniesResult.value?.companies ?? []);
const countries = computed(() => myCompaniesResult.value?.countries ?? []);

const currentCompany = computed(() => {
  if (route.params.id) {
    return companies.value?.find((company) => String(company.id) === route.params.id);
  }

  return null;
});

const documents = ref(currentCompany.value?.documents_verification.slice() ?? []);

if (routerId) {
  routerLink.value = {
    name: "cabinetCompany",
    params: {
      id: routerId,
    },
  };

  setValues({
    country_id: countries.value?.find((country) => country.id === currentCompany.value?.country_id)?.id,
    name: currentCompany.value?.name,
    registration_number: currentCompany.value?.registration_number,
    site: currentCompany.value?.site,
  });
}

const {
  loading: companyCreateLoading,
  mutate: companyCreateMutate,
  onDone: companyCreateOnDone,
  onError: companyCreateOnError,
} = useMutation(companyCreateSchema, {
  awaitRefetchQueries: true,
  refetchQueries: [
    {
      query: companiesSchema,
    },
  ],
});

const {
  loading: companyUpdateLoading,
  mutate: companyUpdateMutate,
  onDone: companyUpdateOnDone,
  onError: companyUpdateOnError,
} = useMutation(companyUpdateSchema);

const hiddenDocument = (index) => documents.value.splice(index, 1);

const createUpdateCompany = handleSubmit(async (data) => {
  data.files_new = await UseFile.upload(data.files_new);

  data.files_old = documents.value.reduce((files, document) => {
    files.push(document.hash);

    return files;
  }, []);

  if (routerId) {
    data.id = Number(routerId);

    await companyUpdateMutate(data);
  } else {
    await companyCreateMutate(data);
  }
});

companyCreateOnDone(async (result) => {
  routerLink.value = {
    name: "cabinetCompany",
    params: {
      id: result.data.companyCreate.company.id,
    },
  };

  await router.push(routerLink.value);
  useNotification.openNotification(result.extensions.companyCreate.message);
});

companyUpdateOnDone((result) => {
  useNotification.openNotification(result.extensions.companyUpdate.message);

  router.push(routerLink.value);
});

SetErrorsFields.graphql(setErrors, companyCreateOnError);
SetErrorsFields.graphql(setErrors, companyUpdateOnError);
</script>

<style scoped>
.company__description {
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  color: #647c9f;
}

.company__files {
  margin-bottom: 24px;
  margin-left: -8px;
  padding: 0;
}

.company__file {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.company__file-delete {
  max-width: 40px;
  padding: 11px;
}

.company__file-name {
  color: #168acd;
  white-space: nowrap;
  text-decoration: underline;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
