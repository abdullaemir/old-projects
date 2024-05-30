<template>
  <section class="events">
    <BaseBreadcrumbs :breadcrumbs="breadcrumbs" />

    <h1 class="events__title">
      Event Calendar
      <span class="events__date">{{ UseDate.getCurrentDate() }}</span>
    </h1>

    <EventCalendar />
  </section>
</template>

<script setup>
import { UseDate } from "@pg/helpers";
import { useHead } from "@vueuse/head";

import BaseBreadcrumbs from "~/components/base/BaseBreadcrumbs.vue";
import {PROJECT_NAME} from "~/constants/meta.js"
import EventCalendar from "./components/EventsCalendar.vue";

useHead({
  title: `Event Calendar | ${PROJECT_NAME}`,
});

const breadcrumbs = [
  {
    name: "Main page",
    to: {
      name: "index",
    },
  },
];
</script>

<style scoped>
.events {
  padding: 32px 0 44px;
}

@media (min-width: 768px) {
  .events {
    padding: 60px 0;
  }
}

@media (min-width: 1170px) {
  .events {
    padding-bottom: 102px;
  }
}

.events__title {
  margin-bottom: 28px;
  font-weight: 600;
  font-size: 16px;
}

@media (min-width: 768px) {
  .events__title {
    font-size: 20px;
  }
}

@media (min-width: 1170px) {
  .events__title {
    font-size: 32px;
  }
}

.events__date {
  display: none;
}

@media (min-width: 768px) {
  .events__date {
    display: inline-block;
    margin-left: 12px;
    font-weight: 500;
    font-size: 16px;
    color: var(--text-color-four);
  }
}

@media (min-width: 1170px) {
  .events__date {
    margin-left: 20px;
    font-size: 22px;
  }
}
</style>
