<template>
  <section class="analytics__container">
    <CabinetTitle class="analytics__title">
      Analytics
    </CabinetTitle>
    <CabinetAnalyticsPromo
      :is-loading="isSendMail || analyticsCreateLoading"
      @send-mail="sendMailMutate"
    />
    <CabinetAnalyticsReports />
    <CabinetAnalyticsTab />
    <CabinetAnalyticsProcess />
    <CabinetAnalyticsOrder
      :is-loading="isSendMail || analyticsCreateLoading"
      @send-mail="sendMailMutate"
    />
  </section>

  <TheModalRequestSendSuccess />
</template>

<script setup>
import { useMutation } from "@vue/apollo-composable";
import { useHead } from "@vueuse/head";
import { ref } from "vue";

import UseMetric from "~/assets/scripts/functions/UseMetric.js";
import { useModal } from "~/components/base/BaseModal.vue";
import TheModalRequestSendSuccess from "~/components/common/TheModalRequestSendSuccess.vue";
import { PROJECT_NAME } from "~/constants/meta.js";
import useUserStore from "~/stores/user.js";

import CabinetTitle from "../components/CabinetTitle.vue";

import CabinetAnalyticsOrder from "./components/CabinetAnalyticsOrder.vue";
import CabinetAnalyticsProcess from "./components/CabinetAnalyticsProcess.vue";
import CabinetAnalyticsPromo from "./components/CabinetAnalyticsPromo.vue";
import CabinetAnalyticsReports from "./components/CabinetAnalyticsReports.vue";
import CabinetAnalyticsTab from "./components/CabinetAnalyticsTab.vue";

import requestAnalyticsCreateSchema from "./api/graphql/mutations/requestAnalyticsCreate.graphql";

const {
  loading: analyticsCreateLoading,
  mutate: analyticsCreateMutate,
  onDone: analyticsCreateOnDone,
} = useMutation(requestAnalyticsCreateSchema);

const isSendMail = ref(false);

const sendMailMutate = () => {
  const userStore = useUserStore();
  const { user } = userStore;

  const data = {
    email: user.email,
    name: user.name,
    phone: user.phone,
  };

  analyticsCreateMutate(data);
};

analyticsCreateOnDone(() => {
  UseMetric.sendGoogle("analytics");
  UseMetric.sendYandex("analytics");

  isSendMail.value = true;
  useModal.openModal("request-send-success");
});

useHead({
  title: `Analytics | ${PROJECT_NAME}`,
});
</script>

<style scoped>
@media (min-width: 1170px) {
  .analytics__container {
    max-width: 943px;
    width: 100%;
  }
}

.analytics__title {
  margin: 0;
  color: var(--pink);
}
</style>
