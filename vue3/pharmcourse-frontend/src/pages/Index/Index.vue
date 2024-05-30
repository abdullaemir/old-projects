<template>
  <IndexStories />
  <IndexBannerGreeting />
  <IndexPinnedContent />
  <IndexWebinars />
  <IndexCourses />
  <IndexArticles />
  <IndexExcellence />
  <IndexShop />
</template>

<script setup>
import { useHead } from "@vueuse/head";
import { provide } from "vue";

import IndexArticles from "./components/IndexArticles/IndexArticles.vue";
import IndexBannerGreeting from "./components/IndexBannerGreeting.vue";
import IndexCourses from "./components/IndexCourses/IndexCourses.vue";
import IndexExcellence from "./components/IndexExcellence.vue";
import IndexPinnedContent from "./components/IndexPinnedContent.vue";
import IndexShop from "./components/IndexShop/IndexShop.vue";
import IndexStories from "./components/IndexStories.vue";
import IndexWebinars from "./components/IndexWebinars/IndexWebinars.vue";

useHead({
  title: "Index",
});

const textTrim = (title, count) => {
  let limit = 0;

  if (title.length >= count) {
    for (let i = 0; i <= count; i++) {
      if (title[i] === " ") {
        limit = i;
      }
    }

    return `${title.substring(0, limit).replace(/\W\s*$/gmu, "")}...`;
  }

  return title;
};

provide("useTextTrim", textTrim);
</script>
