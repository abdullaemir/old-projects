<template>
  <div class="invite__container">
    <BaseBreadcrumbs :breadcrumbs="breadcrumbs" />

    <CabinetForm
      :button-submit-disabled="userInviteCreateLoading"
      button-submit-text="Yalla!"
      class="invite__form"
      :comeback-link="routerParams"
      method="POST"
      title="Add users"
      @submit.stop.prevent="submitForm"
    >
      <p class="invite__description">
        Please add emails of users you would like to add to your Account. After registration they will be added to your
        account. Please be careful with access rights. You can set permissions before user is added to your Account
      </p>

      <BaseFormRow>
        <BaseInput
          id="email"
          label="Email"
          name="email"
          rules="required|email"
          type="email"
        />
      </BaseFormRow>
    </CabinetForm>
  </div>
</template>

<script setup>
import { SetErrorsFields } from "@pg/helpers";
import { useMutation } from "@vue/apollo-composable";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";

import BaseBreadcrumbs from "~/components/base/BaseBreadcrumbs.vue";
import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import { useNotification } from "~/components/base/BaseNotification.vue";

import CabinetForm from "../../components/CabinetForm.vue";
import userInviteCreateSchema from "../api/graphql/mutations/userInviteCreate.graphql";

const router = useRouter();

const routerParams = {
  name: "cabinetMyUsers",
};

const breadcrumbs = [
  {
    name: "My users",
    to: routerParams,
  },
];

const { handleSubmit, setErrors } = useForm();

const {
  loading: userInviteCreateLoading,
  mutate: userInviteCreateMutate,
  onDone: userInviteCreateOnDone,
  onError: userInviteCreateOnError,
} = useMutation(userInviteCreateSchema);

const submitForm = handleSubmit(async (data) => {
  await userInviteCreateMutate(data);
});

userInviteCreateOnDone((result) => {
  useNotification.openNotification(result.extensions.userInviteCreate.message);

  router.push(routerParams);
});

SetErrorsFields.graphql(setErrors, userInviteCreateOnError);
</script>

<style scoped>
@media (min-width: 768px) {
  .invite__container {
    max-width: 692px;
    width: 100%;
  }
}

.invite__form {
  margin-top: 20px;
}

.invite__description {
  margin-bottom: 16px;
  color: var(--text-color-five);
}
</style>
