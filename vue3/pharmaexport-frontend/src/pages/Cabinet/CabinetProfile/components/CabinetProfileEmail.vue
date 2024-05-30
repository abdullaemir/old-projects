<template>
  <form
    novalidate
    @submit.prevent="emailUpdate"
  >
    <CabinetProfileTitle>Change email</CabinetProfileTitle>

    <BaseFormRow>
      <BaseInput
        id="change_email_email"
        label="New email"
        name="email"
        onblur="this.setAttribute('readonly', true);"
        onfocus="this.removeAttribute('readonly');"
        readonly="true"
        rules="required|email"
        type="email"
      />
    </BaseFormRow>
    <BaseFormRow>
      <BaseInput
        id="change_email_password"
        label="Password"
        name="password"
        onblur="this.setAttribute('readonly', true);"
        onfocus="this.removeAttribute('readonly');"
        readonly="true"
        rules="required"
        type="password"
      />
    </BaseFormRow>

    <CabinetProfileButton :disabled="userEmailChangeLoading">
      Change
    </CabinetProfileButton>
  </form>
</template>

<script setup>
import { SetErrorsFields } from "@pg/helpers";
import { useMutation } from "@vue/apollo-composable";
import { useForm } from "vee-validate";

import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import { useNotification } from "~/components/base/BaseNotification.vue";

import userEmailChangeSchema from "../api/graphql/mutations/userEmailChange.graphql";

import CabinetProfileButton from "./CabinetProfileButton.vue";
import CabinetProfileTitle from "./CabinetProfileTitle.vue";

const { handleSubmit, resetForm, setErrors } = useForm();

const {
  loading: userEmailChangeLoading,
  mutate: userEmailChangeMutate,
  onError: userEmailChangeOnError,
  onDone: userEmailChangeOnDone,
} = useMutation(userEmailChangeSchema);

const emailUpdate = handleSubmit((data) => {
  userEmailChangeMutate(data);
});

userEmailChangeOnDone((result) => {
  useNotification.openNotification(result.extensions.userEmailChange.message);
  resetForm();
});

SetErrorsFields.graphql(setErrors, userEmailChangeOnError);
</script>
