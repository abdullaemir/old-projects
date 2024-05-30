<template>
  <TheAuthHeader
    action="registration"
    :type="type"
  />
  <form
    class="auth__form"
    novalidate
    @submit.prevent="registration"
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
      <BaseInputTel
        id="phone"
        label="Phone"
        name="phone"
        placeholder="Phone"
        rules="required"
      />
    </BaseFormRow>

    <BaseFormRow>
      <BaseInput
        id="password"
        label="Enter password"
        name="password"
        placeholder="Enter password"
        rules="required"
        type="password"
      />
    </BaseFormRow>

    <BaseFormRow class="auth__row-agreement">
      <BaseCheckbox
        id="agreement"
        name="agreement"
        rules="required"
      >
        By registering on our website, you agree to
        <a
          class="auth__link"
          href="/about/doc1"
          rel="noopener norefferer"
          @click.stop
        >
          the Terms and Conditions of Use
        </a>
      </BaseCheckbox>
    </BaseFormRow>

    <BaseFormRow>
      <BaseButton
        class="auth__submit"
        :disabled="isLoading"
        :modifiers="['large', 'round', 'blue']"
        type="submit"
      >
        Sign up
      </BaseButton>
    </BaseFormRow>
  </form>

  <TheAuthSocial scope="registration" />
</template>

<script setup>
import { SetErrorsFields } from "@pg/helpers";
import { storeToRefs } from "pinia";
import { useForm } from "vee-validate";
import { ref } from "vue";

import Auth from "~/api/rest/Auth.js";
import TheAuthHeader from "~/components/Auth/components/AuthHeader.vue";
import TheAuthSocial from "~/components/Auth/components/AuthSocial.vue";
import BaseButton from "~/components/base/BaseButton.vue";
import BaseCheckbox from "~/components/base/BaseCheckbox.vue";
import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseInputTel from "~/components/base/BaseInputTel/BaseInputTel.vue";
import { useModal } from "~/components/base/BaseModal.vue";
import { useNotification } from "~/components/base/BaseNotification.vue";
import useUserStore from "~/stores/user.js";

const props = defineProps({
  type: {
    default: "modal",
    type: String,
  },
});

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const { handleSubmit, resetForm, setErrors } = useForm();
const isLoading = ref(false);

const registration = handleSubmit(async (data) => {
  isLoading.value = true;

  const dataRegistration = {
    ...data,
    currentUrl: window.location.href,
    mainRegionId: user.value.main_region.id,
  };
  const result = await Auth.registration(dataRegistration);

  isLoading.value = false;

  if (!result.errors) {
    resetForm();
    useNotification.openNotification(result.extensions.message);

    if (props.type === "modal") {
      useModal.closeModal();
    } else {
      window.location.href = "/cabinet/profile";
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

.auth__row-agreement {
  margin-top: -4px;
}

.auth__row-agreement :deep(.checkbox__label) {
  color: #8292a1;
}

.auth__link {
  color: #0066ff;
}
</style>
