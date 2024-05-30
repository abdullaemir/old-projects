<template>
  <section class="error">
    <h1 class="error__title">
      Why am I Here?
    </h1>

    <p class="error__description">
      Sorry, you flew away from the YallaRx
    </p>

    <RouterLink
      class="error__link"
      :to="{ name: 'index' }"
    >
      Take me back
    </RouterLink>
  </section>
</template>

<script setup>
import { useContext } from "vite-ssr";
import { RouterLink } from "vue-router";

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
  min-height: calc(100vh - 81px);
  padding: 24px 0;
}

@media (min-width: 1170px) {
  .error {
    min-height: calc(100vh - 65px);
  }
}

.error__title {
  margin-bottom: 12px;
  font-weight: 800;
  font-size: 24px;
  text-align: center;
}

@media (min-width: 768px) {
  .error__title {
    font-weight: 600;
    font-size: 44px;
  }
}

.error__description {
  margin-bottom: 24px;
  text-align: center;
}

/* TODO: Заменить на компонент */

.error__link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 40px;
  border-radius: 80px;
  font-weight: 600;
  color: #ffffff;
  background-color: #e80061;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

@media (any-pointer: fine) {
  .error__link:hover,
  .error__link:focus {
    background-color: #d50059;
  }
}

.error__link:active {
  background-color: #c70053;
}
</style>
