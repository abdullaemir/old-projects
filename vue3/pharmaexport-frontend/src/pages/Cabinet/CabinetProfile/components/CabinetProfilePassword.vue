<template>
  <form @submit.prevent="passwordUpdate">
    <CabinetProfileTitle>Change password</CabinetProfileTitle>

    <BaseFormRow>
      <BaseInput
        id="change_password_password"
        label="Old password"
        name="password"
        rules="required"
        type="password"
      />
    </BaseFormRow>
    <BaseFormRow>
      <BaseInput
        id="change_password_password_new"
        label="New password"
        name="password_new"
        rules="required"
        type="password"
      />
    </BaseFormRow>
    <BaseFormRow>
      <BaseInput
        id="change_password_password_confirmed"
        label="New password again"
        name="password_confirmed"
        rules="required|confirmed:@password_new"
        type="password"
      />
    </BaseFormRow>

    <CabinetProfileButton :disabled="passwordChangeLoading">
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

import passwordChangeSchema from "../api/graphql/mutations/passwordChange.graphql";

import CabinetProfileButton from "./CabinetProfileButton.vue";
import CabinetProfileTitle from "./CabinetProfileTitle.vue";

const { handleSubmit, setErrors, resetForm } = useForm();

const {
  loading: passwordChangeLoading,
  mutate: passwordChangeMutate,
  onDone: passwordChangeOnDone,
  onError: passwordChangeOnError,
} = useMutation(passwordChangeSchema);

const passwordUpdate = handleSubmit((data) => {
  passwordChangeMutate(data);
});

passwordChangeOnDone((result) => {
  useNotification.openNotification(result.extensions.passwordChange.message);
  resetForm();
});

SetErrorsFields.graphql(setErrors, passwordChangeOnError);
</script>
