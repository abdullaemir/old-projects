<template>
  <form
    v-if="user"
    @submit.prevent="profileUpdate"
  >
    <CabinetProfileTitle>Personal information</CabinetProfileTitle>

    <BaseFormRow>
      <BaseInput
        id="name"
        label="Name"
        name="name"
        rules="required"
      />
    </BaseFormRow>
    <BaseFormRow>
      <BaseInput
        id="surname"
        label="Surname"
        name="surname"
        rules="required"
      />
    </BaseFormRow>
    <BaseFormRow>
      <BaseInput
        id="designation"
        :label="designationLabel"
        name="designation"
      />
    </BaseFormRow>
    <BaseFormRow>
      <BaseInputTel
        id="phone"
        label="Phone"
        name="phone"
        rules="required"
      />
    </BaseFormRow>
    <BaseFormRow>
      <BaseInput
        id="mail"
        disabled
        label="Email"
        name="email"
      />
    </BaseFormRow>
    <BaseFormRow>
      <BaseInput
        id="companyName"
        disabled
        label="Company"
        name="company_name"
        rules="required"
      />
    </BaseFormRow>
    <BaseFormRow>
      <BaseInput
        id="companyPosition"
        label="Position in the company"
        name="company_position"
        rules="required"
      />
    </BaseFormRow>

    <CabinetProfileButton :disabled="profileUpdateLoading">
      Save
    </CabinetProfileButton>
  </form>
</template>

<script setup>
import { SetErrorsFields, useTokenStore } from "@pg/helpers";
import { useMutation } from "@vue/apollo-composable";
import { storeToRefs } from "pinia";
import { useFieldValue, useForm } from "vee-validate";
import { computed } from "vue";

import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseInputTel from "~/components/base/BaseInputTel/BaseInputTel.vue";
import { useNotification } from "~/components/base/BaseNotification.vue";
import useUserStore from "~/stores/user.js";

import profileUpdateSchema from "../api/graphql/mutations/profileUpdate.graphql";

import CabinetProfileButton from "./CabinetProfileButton.vue";
import CabinetProfileTitle from "./CabinetProfileTitle.vue";

const { handleSubmit, setErrors, setValues } = useForm();

const tokenStore = useTokenStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const designationLabel = computed(() => {
  if (useFieldValue("designation").value) {
    return "Designation";
  }

  return "Designation Dr. or Mr. e.x.";
});

setValues({
  company_name: user.value?.company_name,
  company_position: user.value?.company_position,
  designation: user.value?.designation,
  email: user.value?.email,
  name: user.value?.name,
  phone: user.value?.phone,
  surname: user.value?.surname,
});

const {
  loading: profileUpdateLoading,
  mutate: profileUpdateMutate,
  onDone: profileUpdateOnDone,
  onError: profileUpdateOnError,
} = useMutation(profileUpdateSchema);

/** TODO требуется выводить пустую строку в случае отсутсвия значение у инпута **/

const profileUpdate = handleSubmit((data) => {
  if (typeof data.designation === "undefined" || !data.designation) {
    data.designation = "";
  }

  profileUpdateMutate(data);
});

profileUpdateOnDone(async (result) => {
  useNotification.openNotification(result.extensions.profileUpdate.message);
  await tokenStore.refreshToken();
  await userStore.setUser();
});

SetErrorsFields.graphql(setErrors, profileUpdateOnError);
</script>
