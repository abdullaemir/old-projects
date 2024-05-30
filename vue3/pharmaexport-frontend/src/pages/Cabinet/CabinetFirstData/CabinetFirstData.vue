<template>
  <section class="firstdata__container">
    <CabinetFirstDataPromo
      :is-loading="isSendMail || firstdataSendMailLoading"
      @send-mail="sendMailMutate"
    />
    <CabinetFirstDataPartner />
    <CabinetFirstDataDeliver />
    <CabinetFirstDataSchema />
    <CabinetFirstDataRequest
      :is-loading="isSendMail || firstdataSendMailLoading"
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

import firstdataSendMail from "~/pages/Cabinet/CabinetFirstData/api/graphql/mutations/firstdataSendMail.graphql";

import CabinetFirstDataDeliver from "./components/CabinetFirstDataDeliver.vue";
import CabinetFirstDataPartner from "./components/CabinetFirstDataPartner.vue";
import CabinetFirstDataPromo from "./components/CabinetFirstDataPromo.vue";
import CabinetFirstDataRequest from "./components/CabinetFirstDataRequest.vue";
import CabinetFirstDataSchema from "./components/CabinetFirstDataSchema/CabinetFirstDataSchema.vue";

const {
  loading: firstdataSendMailLoading,
  mutate: firstdataSendMailMutate,
  onDone: firstdataSendMailOnDone,
} = useMutation(firstdataSendMail);

const isSendMail = ref(false);

const sendMailMutate = () => {
  const userStore = useUserStore();
  const { user } = userStore;

  const data = {
    email: user.email,
    name: user.name,
    phone: user.phone,
  };

  firstdataSendMailMutate(data);
};

firstdataSendMailOnDone(() => {
  UseMetric.sendGoogle("firstdata");
  UseMetric.sendYandex("firstdata");

  isSendMail.value = true;
  useModal.openModal("request-send-success");
});

useHead({
  title: `First Data | ${PROJECT_NAME}`,
});
</script>

<style scoped>
@media (min-width: 1170px) {
  .firstdata__container {
    max-width: 943px;
    width: 100%;
  }
}
</style>
