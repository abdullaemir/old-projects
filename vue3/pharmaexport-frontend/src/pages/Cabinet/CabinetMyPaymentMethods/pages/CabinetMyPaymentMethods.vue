<!-- TODO: Добавить лоадинг -->

<template>
  <template v-if="!route.params.id || (route.params.id && currentPayment)">
    <CabinetTitle>My payment methods</CabinetTitle>

    <CabinetMyPaymentMethodsList
      v-if="!paymentsLoading"
      :current-payment="currentPayment"
      :payments="payments"
    />

    <CabinetMyPaymentMethodsPayment
      v-if="!paymentsLoading"
      :current-payment="currentPayment"
    />
  </template>

  <NotFound v-else />
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useCheckIsAdminAccess } from "~/assets/scripts/functions/useCheckAccess.js";
import NotFound from "~/pages/404NotFound.vue";

import CabinetTitle from "../../components/CabinetTitle.vue";
import CabinetMyPaymentMethodsList from "../components/CabinetMyPaymentMethodsList.vue";
import CabinetMyPaymentMethodsPayment from "../components/CabinetMyPaymentMethodsPayment.vue";

import accountWalletsSchema from "../api/graphql/queries/AccountWallets.graphql";

const route = useRoute();
const router = useRouter();

const { loading: paymentsLoading, result: paymentsResult } = useQuery(accountWalletsSchema);
const payments = computed(() => paymentsResult.value?.accountWallets ?? []);

const currentPayment = computed(() => {
  if (route.params.id) {
    return payments.value?.find((paymentItem) => String(paymentItem.id) === route.params.id);
  } else if (payments.value) {
    for (let i = 0; i < payments.value.length; i++) {
      if (useCheckIsAdminAccess(payments.value[i].available)) {
        router.replace({
          name: "cabinetMyPaymentMethod",
          params: {
            id: payments.value[i].id,
          },
        });

        return payments.value[i];
      }
    }
  }

  return null;
});
</script>
