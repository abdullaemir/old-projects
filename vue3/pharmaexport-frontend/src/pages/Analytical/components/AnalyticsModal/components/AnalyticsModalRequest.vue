<template>
  <BaseModal id="analytics-request">
    <form
      class="request__form"
      novalidate
      @submit.prevent="submitForm"
    >
      <h2 class="request__title">
        Submit a request, and get a report sample
      </h2>

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
          id="email"
          label="E-mail"
          name="email"
          rules="required|email"
          type="email"
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

      <hr class="request__divider" />

      <BaseFormRow>
        <BaseInput
          id="company_name"
          label="Company name"
          name="company_name"
          rules="required"
        />
      </BaseFormRow>

      <BaseFormRow>
        <BaseInput
          id="company_country"
          label="Country of company"
          name="company_country"
          rules="required"
        />
      </BaseFormRow>

      <BaseFormRow>
        <BaseInput
          id="job_title"
          label="Job title"
          name="job_title"
          rules="required"
        />
      </BaseFormRow>

      <BaseFormRow class="request__row-agreement">
        <BaseCheckbox
          id="agreement"
          name="agreement"
          rules="required"
        >
          By registering on our website, you agree to
          <a
            class="request__link"
            download
            href="/docs/terms-of-service.pdf"
            rel="noopener norefferer"
            @click.stop
          >
            the Terms and Conditions of Use
          </a>
        </BaseCheckbox>
      </BaseFormRow>

      <BaseFormRow>
        <BaseButton
          :disabled="analyticsRequestFormLoading"
          :modifiers="['large', 'round', 'purple']"
          type="submit"
        >
          Send a request
        </BaseButton>
      </BaseFormRow>
    </form>
  </BaseModal>

</template>

<script setup>
import { SetErrorsFields } from "@pg/helpers";
import { useMutation } from "@vue/apollo-composable";
import { useForm } from "vee-validate";

import UseMetric from "~/assets/scripts/functions/UseMetric.js";

import BaseButton from "~/components/base/BaseButton.vue";
import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseCheckbox from "~/components/base/BaseCheckbox.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseInputTel from "~/components/base/BaseInputTel/BaseInputTel.vue";
import BaseModal, {useModal} from "~/components/base/BaseModal.vue";

import analyticsRequestForm from "../api/graphql/mutations/analyticsRequestForm.graphql";

const { handleSubmit, resetForm, setErrors } = useForm();

const {
  loading: analyticsRequestFormLoading,
  mutate: analyticsRequestFormMutate,
  onDone: analyticsRequestFormOnDone,
  onError: analyticsRequestFormOnError,
} = useMutation(analyticsRequestForm);

const submitForm = handleSubmit((data) => {
  analyticsRequestFormMutate(data);
});

analyticsRequestFormOnDone(() => {
  UseMetric.sendGoogle("analytics_landing");
  UseMetric.sendYandex("analytics_landing");

  resetForm();
  useModal.openModal("analytics-success");
});

SetErrorsFields.graphql(setErrors, analyticsRequestFormOnError);
</script>

<style scoped>
.request__title {
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 20px;
}

@media (min-width: 768px) {
  .request__title {
    margin-bottom: 32px;
    font-weight: 500;
    font-size: 24px;
  }
}

.request__form {
  max-width: 368px;
  width: 100%;
  margin: -8px auto 0;
}

@media (min-width: 768px) {
  .request__form {
    margin-top: 16px;
  }
}

:deep(.form__row:not(:last-of-type)) {
  margin-bottom: 16px;
}

@media (min-width: 768px) {
  :deep(.form__row:not(:last-of-type)) {
    margin-bottom: 20px;
  }
}

.request__divider {
  height: 1px;
  margin: 0 0 16px;
  border: none;
  background-color: var(--border-color-primary);
}

@media (min-width: 768px) {
  .request__divider {
    margin-bottom: 20px;
  }
}

.request__row-agreement {
  margin: 4px 0 32px;
}

@media (min-width: 768px) {
  .request__row-agreement {
    margin-top: 0;
  }
}

.request__form :deep(.checkbox__label) {
  color: var(--text-color-two);
}

.request__link {
  color: var(--text-color-four);
}
</style>
