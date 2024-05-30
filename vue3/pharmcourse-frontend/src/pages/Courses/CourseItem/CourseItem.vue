<template>
  <ClientOnly>
    <BaseLoading
      v-if="coursesLoading"
      class="course-spinner"
    />

    <!-- TODO: Убрать -->
    <NotFound v-else-if="!coursesLoading && course === null" />
  </ClientOnly>

  <div v-if="!coursesLoading && course !== null">
    <CourseItemPromo
      v-if="course !== null"
      :course="course"
    />

    <CourseItemSpecialties
      v-if="course?.specialties !== null"
      :specialties="course.specialties"
    />

    <CourseItemAdvantages
      v-if="course?.advantages !== null"
      :advantages="course.advantages"
    />

    <CourseItemPartners
      v-if="course?.partners !== null"
      :partners="course.partners"
    />

    <CourseItemCertificates
      v-if="course?.certificate !== null"
      :course="course"
    />

    <CourseItemObjectives
      v-if="course?.objectives !== null"
      :objectives="course.objectives"
    />

    <CourseItemTopics
      v-if="course?.topics !== null"
      :topics="course.topics"
    />

    <CourseItemSpeakers
      v-if="course?.speakers !== null"
      :speakers="course.speakers"
    />

    <CourseItemPayment
      v-if="course !== null"
      id="payment"
      :course="course"
    />

    <CourseItemFAQ
      v-if="course?.faqs !== null"
      :faqs="course.faqs"
    />

    <BaseGoUpButton />
  </div>
</template>

<script setup>
import {
  useQuery,
} from "@vue/apollo-composable";
import {
  useHead,
} from "@vueuse/head";
import {
  storeToRefs,
} from "pinia";
import {
  useContext, ClientOnly,
} from "vite-ssr";
import {
  computed, nextTick, watch,
} from "vue";
import {
  useRoute, useRouter,
} from "vue-router";

import UseMetric from "~/assets/scripts/UseMetric.js";
import useScrollIntoView from "~/assets/scripts/useScrollIntoView.js";
import BaseGoUpButton from "~/components/base/BaseGoUpButton.vue";
import BaseLoading from "~/components/base/BaseLoading.vue";
import {
  useModal,
} from "~/components/base/BaseModal.vue";
import {
  PROJECT_NAME,
} from "~/constants/meta.js";
import NotFound from "~/pages/404NotFound.vue";
import useUserStore from "~/stores/user.js";

import coursesSchema from "../api/graphql/queries/training.graphql";

import CourseItemAdvantages from "./components/CourseItemAdvantages.vue";
import CourseItemCertificates from "./components/CourseItemCertificates.vue";
import CourseItemFAQ from "./components/CourseItemFAQ.vue";
import CourseItemObjectives from "./components/CourseItemObjectives.vue";
import CourseItemPartners from "./components/CourseItemPartners.vue";
import CourseItemPayment from "./components/CourseItemPayment/CourseItemPayment.vue";
import CourseItemPromo from "./components/CourseItemPromo.vue";
import CourseItemSpeakers from "./components/CourseItemSpeakers.vue";
import CourseItemSpecialties from "./components/CourseItemSpecialties.vue";
import CourseItemTopics from "./components/CourseItemTopics.vue";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const {
  user,
} = storeToRefs(userStore);
const {
  isClient,
} = useContext();

const {
  result: coursesResult, loading: coursesLoading,
} = useQuery(coursesSchema, () => ({
  filter: {
    language: user.value.language.url,
    slug: route.params.slug,
  },
}));

const course = computed(() => coursesResult.value?.trainings?.[0] ?? null);

useHead({
  meta: [
    {
      content: computed(() => course.value?.title),
      name: "description",
    },
    {
      content: computed(() => course.value?.title),
      name: "keywords",
    },
    {
      content: "/img/og/logo.png",
      property: "og:image",
    },
    {
      content: "image/png",
      property: "og:image:type",
    },
    {
      content: "1200",
      property: "og:image:width",
    },
    {
      content: "630",
      property: "og:image:height",
    },
    {
      content: computed(() => course.value?.title),
      property: "og:title",
    },
  ],
  title: computed(() => `${course.value?.title} | ${PROJECT_NAME}`),
});

if (isClient) {
  const queryParams = route.query;

  if (queryParams) {
    switch (queryParams.action) {
      case "coursePaid": {
        UseMetric.sendGoogle("buy_the_course", {
          params: {
            User_ID: user.value.id,
            course_name: course.value.title,
          },
        });

        UseMetric.sendYandex("buy_the_course");

        router.replace({
          query: {},
        });

        break;
      }

      case "failed_payment": {
        nextTick(() => {
          useScrollIntoView("payment", {
            behavior: "auto",
            block: "center",
          });

          if (!user?.value?.id) {
            useModal.openModal("login");
          }
        });

        break;
      }

      // No default
    }
  }
}

watch(
  route,
  () => {
    if (route.hash) {
      setTimeout(() => {
        useScrollIntoView(route.hash.replace(/^#/giu, ""), {
          behavior: "auto",
          block: "center",
        });
      }, 0);
    }
  },
  {
    deep: true,
    immediate: true,
  },
);
</script>

<style scoped>
.course-spinner.spinner {
  margin: 40px auto;
}

@media (min-width: 1170px) {
  .course-spinner.spinner {
    margin: 60px auto;
  }
}
</style>
