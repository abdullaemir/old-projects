<template>
  <section class="error">
    <h1 class="error__title">
      Error 404: Page not found
    </h1>

    <p class="error__description">
      The address was entered incorrectly, or this page no longer exists on the site
    </p>

    <BaseLink
      class="error__link"
      href="/"
    >
      Go to main page
    </BaseLink>
  </section>
</template>

<script setup>
import { useContext } from "vite-ssr";

import BaseLink from "~/components/base/BaseLink.vue";

const { writeResponse } = useContext();

if (import.meta.env.SSR) {
  writeResponse({
    status: 404,
  });
}
</script>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 16px 100px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 50px rgb(0 89 193 / 0.1);
}

@media (min-width: 1170px) {
  .error {
    padding: 60px 16px 100px;
  }
}

.error__title {
  margin-bottom: 20px;
  font-weight: 800;
  font-size: 18px;
  text-align: center;
}

.error__description {
  margin-bottom: 30px;
  text-align: center;
}

.error__link {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 21px 89px 21px 59px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
  background-color: var(--button-background-color-blue);
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .error__link {
    padding: 21px 70px 21px 40px;
  }
}

.error__link::after {
  content: "";
  position: absolute;
  left: 192px;
  width: 9px;
  height: 20px;
  background-image: url("../assets/icons/arrow.svg");
  background-position: center;
  background-repeat: no-repeat;
  transform: rotate(90deg);
}

@media (min-width: 768px) {
  .error__link::after {
    left: 172px;
  }
}

@media (any-pointer: fine) {
  .error__link:hover,
  .error__link:focus {
    background-color: var(--button-background-color-blue);
  }
}

.error__link:active {
  background-color: var(--button-background-color-blue);
}
</style>
