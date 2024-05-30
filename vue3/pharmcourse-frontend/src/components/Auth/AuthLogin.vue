<template>
  <TheAuthHeader
    action="login"
    :type="type"
  />
  <form
    novalidate
    @submit.prevent="login"
  >
    <BaseTabs @switch="changeTab">
      <BaseTabItem name="E-mail">
        <BaseInput
          id="email"
          label="E-mail"
          name="email"
          :rules="currentTab === 'E-mail' ? 'required|email' : ''"
          type="email"
        />
      </BaseTabItem>

      <BaseTabItem name="Phone">
        <BaseInputTel
          id="phone"
          label="Phone"
          name="phone"
          :rules="currentTab === 'Phone' ? 'required' : ''"
          type="tel"
          :validation-phone-valid="currentTab === 'Phone'"
        />
      </BaseTabItem>
    </BaseTabs>

    <BaseFormRow>
      <BaseInput
        id="password"
        label="Password"
        name="password"
        placeholder="Password"
        rules="required"
        type="password"
      />
    </BaseFormRow>

    <BaseFormRow>
      <RouterLink
        v-if="type === 'page'"
        class="auth__redirect-link"
        :to="{ name: 'remind' }"
      >
        Forgot your password?
      </RouterLink>

      <BaseButton
        v-else
        class="auth__redirect-link"
        type="button"
        @click="useModal.openModal('remind')"
      >
        Forgot your password?
      </BaseButton>
    </BaseFormRow>

    <BaseFormRow>
      <BaseButton
        class="auth__submit"
        :disabled="isLoading"
        :modifiers="['large', 'round', 'blue']"
        type="submit"
      >
        Sign in
      </BaseButton>
    </BaseFormRow>
  </form>

  <TheAuthSocial scope="login" />
</template>

<script setup>
import { SetErrorsFields } from "@pg/helpers";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { RouterLink } from "vue-router";

import Auth from "~/api/rest/Auth.js";
import TheAuthHeader from "~/components/Auth/components/AuthHeader.vue";
import TheAuthSocial from "~/components/Auth/components/AuthSocial.vue";
import BaseButton from "~/components/base/BaseButton.vue";
import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseInputTel from "~/components/base/BaseInputTel/BaseInputTel.vue";
import { useModal } from "~/components/base/BaseModal.vue";
import { useNotification } from "~/components/base/BaseNotification.vue";
import BaseTabItem from "~/components/base/BaseTabItem.vue";
import BaseTabs from "~/components/base/BaseTabs.vue";

const props = defineProps({
  type: {
    default: "modal",
    type: String,
  },
});
const { handleSubmit, resetForm, setErrors } = useForm();
const isLoading = ref(false);
const currentTab = ref("E-mail");

const changeTab = (tabName) => {
  switch (tabName) {
    case "E-mail": {
      currentTab.value = "E-mail";

      break;
    }

    case "Phone": {
      currentTab.value = "Phone";

      break;
    }

    default: {
      break;
    }
  }
};

const login = handleSubmit(async (data) => {
  isLoading.value = true;

  const result = await Auth.login(data);

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
.auth__redirect-link {
  width: fit-content;
  padding: 0;
  font-weight: 500;
  color: #0066ff;
}

.auth__submit {
  width: fit-content;
  margin: 0 auto;
  font-size: 16px;
  text-transform: uppercase;
}

:deep(.tabs) {
  margin-bottom: 24px;
}

:deep(.tabs__list) {
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 24px;
  border-bottom: 1px solid #e4e4e4;
}

:deep(.tabs__button) {
  position: relative;
  padding: 0 16px 16px;
}

:deep(.tabs__button.active) {
  font-weight: 600;
}

:deep(.tabs__button::after) {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 40px;
  background-color: #0062ff;
  transform: scaleX(0);
  transition-property: transform;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;
}

:deep(.tabs__button.active::after) {
  transform: scale(1);
}
</style>
