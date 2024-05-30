<template>
  <section class="auth">
    <div class="auth__wrapper">
      <slot />
    </div>

    <div class="auth__wrapper">
      <h2 class="auth__subtitle">
        {{ subtitle }}
      </h2>

      <p
        v-if="description"
        class="auth__description"
      >
        {{ description }}
      </p>
      <RouterLink
        class="auth__button-block"
        :to="{ name: routerAction }"
      >
        <BaseButton
          class="auth__button"
          :modifiers="['large', 'round', 'blue']"
          type="button"
        >
          {{ routerText }}
        </BaseButton>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, RouterLink } from "vue-router";

import BaseButton from "~/components/base/BaseButton.vue";

const route = useRoute();

const subtitle = ref(null);
const description = ref(null);
const routerText = ref(null);
const routerAction = ref(null);

switch (route.name) {
  case "login":
    subtitle.value = "Hello, Friend!";
    description.value = "Enter your personal details and start journey with us";
    routerText.value = "Sing up";
    routerAction.value = "registration";

    break;

  case "registration":
    subtitle.value = "Already have an account?";
    description.value = null;
    routerText.value = "Sign in";
    routerAction.value = "login";

    break;

  case "remind":
    subtitle.value = "Hi, friend";
    description.value = "Enter your personal details and start journey with us";
    routerText.value = "Sing up";
    routerAction.value = "login";

    break;

  default:
    subtitle.value = "Hi, friend";
    description.value = "Enter your personal details and start journey with us";
    routerText.value = "Sing up";
    routerAction.value = "login";

    break;
}
</script>

<style scoped>
.auth {
  position: relative;
  max-width: 468px;
  width: 100%;
  margin: 0 auto;
  padding: 12px 0 100px;
}

@media (min-width: 1170px) {
  .auth {
    display: grid;
    grid-template-columns: repeat(2, 596px);
    justify-content: center;
    max-width: none;
    height: calc(100% + 20px);
    margin-top: -20px;
    padding: 0;
  }
}

@media (min-width: 1170px) {
  .auth__wrapper {
    padding: 64px 64px 100px;
  }
}

.auth__wrapper:nth-child(2) {
  display: none;
}

@media (min-width: 1170px) {
  .auth__wrapper:nth-child(2) {
    display: block;
    border-left: 1px solid #dedede;
  }
}

.auth__subtitle {
  margin-bottom: 32px;
  font-weight: 600;
  font-size: 40px;
  text-align: center;
}

.auth__description {
  max-width: 250px;
  width: 100%;
  margin: 0 auto 32px;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
}

.auth__button-block {
  position: relative;
  left: 50%;
  display: inline-block;
  transform: translateX(-50%);
}

.auth__button {
  margin: 0 auto;
  font-size: 16px;
  text-transform: uppercase;
}
</style>
