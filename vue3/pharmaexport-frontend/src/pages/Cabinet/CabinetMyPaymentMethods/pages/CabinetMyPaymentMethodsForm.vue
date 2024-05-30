<template>
  <BaseBreadcrumbs :breadcrumbs="breadcrumbs" />

  <CabinetTitle>My payment methods</CabinetTitle>

  <CabinetForm
    :button-submit-disabled="accountWalletCreateLoading || accountWalletUpdateLoading"
    button-submit-text="Yalla!"
    :comeback-link="routerLink"
    :title="route.params.id ? 'Edit payment methods' : 'Add payment methods'"
    @submit.prevent="createUpdateAccountWallet"
  >
    <BaseFormRow>
      <BaseSelect
        id="payment_method"
        :disabled-options="['card']"
        :filterable="false"
        label="Type of payment"
        name="payment_method"
        :options="options"
        rules="required"
        tag="name"
        value-key="id"
      >
        <template #dropdownItem="slotProps">
          <span class="form__property">
            {{ slotProps.selectItem.name }}
            <span
              v-if="slotProps.selectItem.name === 'Card'"
              class="form__description"
            >
              (Coming soon)
            </span>
          </span>
        </template>
      </BaseSelect>
    </BaseFormRow>

    <BaseFormRow v-if="paymentMethod === 'crypto_wallet'">
      <BaseInput
        id="wallet"
        label="Wallet"
        name="wallet"
        rules="required|min:12"
      />
    </BaseFormRow>

    <template v-if="paymentMethod">
      <CabinetDivider />

      <BaseFormRow>
        <BaseRadioGroup
          :name="radioList.name"
          rules="required"
        >
          <BaseRadio
            v-for="(radioItem, radioItemIndex) in radioList.questions"
            :id="radioList.name + radioItem.id"
            :key="radioList.name + radioItem.id"
            :checked="(route.params.id && radioItem.id === currentAccountWallets.available) || radioItemIndex === 0"
            :label="radioItem.label"
            type-element="checkbox"
            :value="radioItem.id"
          >
            {{ radioItem.label }}
          </BaseRadio>
        </BaseRadioGroup>
      </BaseFormRow>
    </template>
  </CabinetForm>
</template>

<script setup>
import { SetErrorsFields } from "@pg/helpers";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useFieldValue, useForm } from "vee-validate";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import BaseBreadcrumbs from "~/components/base/BaseBreadcrumbs.vue";
import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import { useNotification } from "~/components/base/BaseNotification.vue";
import BaseRadio from "~/components/base/BaseRadio.vue";
import BaseRadioGroup from "~/components/base/BaseRadioGroup.vue";
import BaseSelect from "~/components/base/BaseSelectBox/BaseSelect.vue";

import CabinetDivider from "../../components/CabinetDivider.vue";
import CabinetForm from "../../components/CabinetForm.vue";
import CabinetTitle from "../../components/CabinetTitle.vue";

import AccountWalletCreateSchema from "../api/graphql/mutations/AccountWalletCreate.graphql";
import AccountWalletUpdateSchema from "../api/graphql/mutations/AccountWalletUpdate.graphql";
import AccountWalletsSchema from "../api/graphql/queries/AccountWallets.graphql";

const route = useRoute();
const router = useRouter();

const { handleSubmit, setErrors, setValues } = useForm();

const paymentMethod = useFieldValue("payment_method");

const routerId = route.params.id;
const routerLink = ref({
  name: "cabinetMyPaymentsMethods",
});

const breadcrumbs = [
  {
    name: "My payments methods",
    to: {
      name: "cabinetMyPaymentsMethods",
    },
  },
];

const options = [
  {
    id: "card",
    name: "Card",
  },
  {
    id: "crypto_wallet",
    name: "Crypto wallet",
  },
];

const radioList = {
  name: "available",
  questions: [
    {
      id: "administrator",
      label: "Only Administrator of Account",
    },
    {
      id: "any",
      label: "Any user with permission to My payment methods block",
    },
  ],
};

const { result: accountWalletsResult, onResult: accountWalletsOnResult } = useQuery(AccountWalletsSchema);

const accountWallets = computed(() => accountWalletsResult.value?.accountWallets ?? []);

const currentAccountWallets = computed(() => {
  if (route.params.id) {
    return accountWallets.value?.find((accountWallet) => String(accountWallet.id) === route.params.id);
  }

  return null;
});

if (routerId) {
  routerLink.value = {
    name: "cabinetMyPaymentMethod",
    params: {
      id: routerId,
    },
  };

  setValues({
    available: currentAccountWallets.value?.available,
    payment_method: currentAccountWallets.value?.payment_method,
    wallet: currentAccountWallets.value?.wallet,
  });
}

accountWalletsOnResult(() => {
  setValues({
    available: currentAccountWallets.value?.available,
    payment_method: currentAccountWallets.value?.payment_method,
    wallet: currentAccountWallets.value?.wallet,
  });
});

const {
  loading: accountWalletCreateLoading,
  mutate: accountWalletCreateMutate,
  onDone: accountWalletCreateOnDone,
  onError: accountWalletCreateOnError,
} = useMutation(AccountWalletCreateSchema, {
  awaitRefetchQueries: true,
  refetchQueries: [
    {
      query: AccountWalletsSchema,
    },
  ],
});

const {
  loading: accountWalletUpdateLoading,
  mutate: accountWalletUpdateMutate,
  onDone: accountWalletUpdateOnDone,
  onError: accountWalletUpdateOnError,
} = useMutation(AccountWalletUpdateSchema);

const createUpdateAccountWallet = handleSubmit(async (data) => {
  if (routerId) {
    data.id = Number(routerId);

    await accountWalletUpdateMutate(data);
  } else {
    await accountWalletCreateMutate(data);
  }
});

accountWalletCreateOnDone(async (result) => {
  routerLink.value = {
    name: "cabinetMyPaymentsMethods",
    params: {
      id: result.data.accountWalletCreate.account_wallet.id,
    },
  };

  useNotification.openNotification(result.extensions.accountWalletCreate.message);

  await router.push(routerLink.value);
});

accountWalletUpdateOnDone((result) => {
  useNotification.openNotification(result.extensions.accountWalletUpdate.message);

  router.push(routerLink.value);
});

SetErrorsFields.graphql(setErrors, accountWalletCreateOnError);
SetErrorsFields.graphql(setErrors, accountWalletUpdateOnError);
</script>

<style scoped>
.form__property {
  display: flex;
}

.form__description {
  margin-left: 8px;
  font-size: 12px;
  line-height: 1.8;
  color: var(--text-color-five);
}
</style>
