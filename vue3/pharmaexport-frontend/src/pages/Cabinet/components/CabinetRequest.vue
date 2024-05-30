<template>
  <CabinetForm
    :button-submit-disabled="requestLoading"
    button-submit-text="Yalla!"
    :comeback-link="comebackLink"
    :is-cancel-action="isCancelAction"
    method="POST"
    @cancel-action="resetFormAction"
    @submit.prevent="submitForm"
  >
    <BaseFormRow>
      <BaseTextarea
        id="comment"
        label="Add text for your request"
        name="comment"
        rules="required|max:1000"
        type="textarea"
      />
    </BaseFormRow>

    <CabinetDivider />

    <p class="request__description">
      You can add additional information to your request. This field is not obligatory
    </p>

    <BaseFormRow>
      <BaseInputFile
        id="files"
        accept=".csv,.doc,.docx,.jpg,.jpeg,.pdf,.png,.xlsx"
        button-text="Choose a file"
        label="Upload file, drag it here"
        label-separator="or"
        multiple
        name="files"
        rules="ext:csv,doc,docx,jpg,jpeg,pdf,png,xlsx|max_length:10"
      />
    </BaseFormRow>

    <template v-if="isExample">
      <CabinetDivider />

      <p class="request__description">
        You can use example to form your price
      </p>

      <div class="request__example">
        <BaseLink
          class="request__link"
          download
          href="/docs/request-example.xlsx"
        >
          Download example in Excel
        </BaseLink>
      </div>
    </template>
  </CabinetForm>

  <TheModalRequestSendSuccess />
</template>

<script setup>
import { SetErrorsFields, UseFile } from "@pg/helpers";
import { useMutation } from "@vue/apollo-composable";
import { useForm } from "vee-validate";

import UseMetric from "~/assets/scripts/functions/UseMetric.js";
import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseInputFile from "~/components/base/BaseInputFile/BaseInputFile.vue";
import BaseLink from "~/components/base/BaseLink.vue";
import { useModal } from "~/components/base/BaseModal.vue";
import BaseTextarea from "~/components/base/BaseTextarea.vue";
import TheModalRequestSendSuccess from "~/components/common/TheModalRequestSendSuccess.vue";
import CabinetDivider from "~/pages/Cabinet/components/CabinetDivider.vue";

import requestAnalyticsSchema from "../api/graphql/mutations/requestAnalyticsCreate.graphql";
import requestHrSchema from "../api/graphql/mutations/requestHrCreate.graphql";
import requestPromotionsSchema from "../api/graphql/mutations/requestPromotionsCreate.graphql";
import requestPurchasesSchema from "../api/graphql/mutations/requestPurchasesCreate.graphql";
import requestTendersSchema from "../api/graphql/mutations/requestTendersCreate.graphql";

import CabinetForm from "./CabinetForm.vue";

const props = defineProps({
  comebackLink: {
    default: null,
    type: Object,
  },
  isCancelAction: {
    type: Boolean,
  },
  isExample: {
    type: Boolean,
  },
  page: {
    required: true,
    type: String,
  },
});

const { handleSubmit, setErrors, resetForm } = useForm();

let requestSchema = null;
let currentTargetMetric = null;

switch (props.page) {
  case "analytics": {
    requestSchema = requestAnalyticsSchema;

    break;
  }

  case "hr": {
    requestSchema = requestHrSchema;
    currentTargetMetric = "hr";

    break;
  }

  case "promotions": {
    requestSchema = requestPromotionsSchema;

    break;
  }

  case "purchases": {
    requestSchema = requestPurchasesSchema;
    currentTargetMetric = "upload_price";

    break;
  }

  case "tenders": {
    requestSchema = requestTendersSchema;
    currentTargetMetric = "start_new_tender";

    break;
  }

  default: {
    break;
  }
}

const {
  loading: requestLoading,
  mutate: requestMutate,
  onDone: requestOnDone,
  onError: requestOnError,
} = useMutation(requestSchema);

const resetFormAction = () => resetForm();

const submitForm = handleSubmit(async (data) => {
  data.files = await UseFile.upload(data.files);

  await requestMutate(data);
});

requestOnDone(() => {
  if (currentTargetMetric) {
    UseMetric.sendGoogle(currentTargetMetric);
    UseMetric.sendYandex(currentTargetMetric);
  }

  resetFormAction();
  useModal.openModal("request-send-success");
});

SetErrorsFields.graphql(setErrors, requestOnError);
</script>

<style scoped>
.request__description {
  margin-bottom: 16px;
  color: var(--text-color-five);
}

.request__example {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 42px 24px;
  border-radius: 8px;
  background-image: linear-gradient(170deg, #f6f7fa 3%, #f8f7ff 96%);
}

@media (min-width: 768px) {
  .request__example {
    padding: 24px;
  }
}

.request__link {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid var(--border-color-primary);
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
  color: var(--text-color-five);
  background-color: #ffffff;
}

.request__link::before {
  content: "";
  width: 16px;
  height: 17px;
  margin-right: 8px;
  background-image: url("~/assets/logo/excel.svg");
}
</style>
