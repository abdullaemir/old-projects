<template>
  <TheAuthHeader
    action="remind"
    :type="type"
  />

  <form
    novalidate
    @submit.prevent="forgotPasswordSendEmail"
  >
    <BaseFormRow>
      <BaseInput
        id="email"
        label="E-mail"
        name="email"
        placeholder="E-mail"
        rules="required"
      />
    </BaseFormRow>

    <BaseFormRow>
      <BaseButton
        class="auth__submit"
        :disabled="isLoading"
        :modifiers="['large', 'round', 'blue']"
        type="submit"
      >
        Generate password
      </BaseButton>
    </BaseFormRow>
  </form>
</template>

<script setup>
import { SetErrorsFields } from "@pg/helpers";
import { useForm } from "vee-validate";
import { ref } from "vue";

import Auth from "~/api/rest/Auth.js";
import TheAuthHeader from "~/components/Auth/components/AuthHeader.vue";
import BaseButton from "~/components/base/BaseButton.vue";
import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import { useModal } from "~/components/base/BaseModal.vue";
import { useNotification } from "~/components/base/BaseNotification.vue";

const props = defineProps({
  type: {
    default: "modal",
    type: String,
  },
});

const { handleSubmit, resetForm, setErrors } = useForm();
const isLoading = ref(false);

const forgotPasswordSendEmail = handleSubmit(async (data) => {
  isLoading.value = true;

  const result = await Auth.forgotPasswordSendEmail(data);

  isLoading.value = false;

  if (!result.errors) {
    resetForm();

    if (props.type === "modal") {
      useModal.closeModal();
    }
  } else if (result.errors?.extensions?.fields) {
    SetErrorsFields.rest(setErrors, result);
  } else {
    useNotification.openNotification(result.errors.message);
  }
});
</script>

<style scoped>
.auth__submit {
  width: fit-content;
  margin: 0 auto;
  font-size: 16px;
  text-transform: uppercase;
}
</style>
