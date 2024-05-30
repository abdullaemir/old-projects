<template>
  <section>
    <ul class="pinned-list">
      <IndexWebinarsItem
        v-if="pinned.webinar"
        class="pinned-item webinar"
        :webinar="pinned.webinar"
      />
      <IndexCoursesItem
        v-if="pinned.course"
        class="course pinned-item"
        :course="pinned.course"
      />
      <IndexArticlesItem
        v-if="pinned.article"
        :article="pinned.article"
        class="article pinned-item"
      />
    </ul>
  </section>
</template>

<script setup>
import IndexArticlesItem from "./IndexArticles/IndexArticlesItem/IndexArticlesItem.vue";
import IndexCoursesItem from "./IndexCourses/IndexCoursesItem/IndexCoursesItem.vue";
import IndexWebinarsItem from "./IndexWebinars/IndexWebinarsItem/IndexWebinarsItem.vue";

const pinned = {
  article: {
    commentCount: 74,
    description: "Infection Prevention and Control Practices Infection Prevention and",
    img: "/src/assets/images/courseExample.png",
    link: "#",
    title: "What the rest of the world can learn from South Korea's COVID-19 response\n",
    userCount: 226,
  },
  course: {
    classesCount: 11,
    date: "Nov 22",
    day: "sat",
    description: "Soft skills education: Learn the Merchandising in pharmacies Soft skills education: Learn the " +
      "Merchandising in pharmacies Soft skills education: Learn the Merchandising in pharmacies " +
      "Soft skills education: " +
      "Learn the Merchandising in pharmacies",
    duration: 2,
    isCPD: true,
    link: "#",
    oldPrice: 100,
    price: 80,
    title: "Merchandising in pharmacies: effective product placement",
    type: "Gift",
  },
  webinar: {
    date: "Nov 22",
    day: "sat",
    isCPD: true,
    link: "#",
    location: "Dubai",
    price: 100,
    signed: true,
    time: "7:00 PM",
    title: "Infection Prevention Control Practices Infection identify hundreds of drug candidates, hello my dear " +
      "favorite aaaa! rockroll friends my dear favorite asd! qwerty name qwe",
    type: "workshop",
    userCount: 226,
  },
};
</script>

<style scoped>
.pinned-list {
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 0 30px;
  padding-left: 0;
  grid-row-gap: 20px;
}

@media (min-width: 768px) {
  .pinned-list {
    grid-template-columns: repeat(auto-fit, minmax(226px, 1fr));
    grid-column-gap: 17px;
  }
}

.article {
  padding: 0;
}

.webinar {
  border: 1px solid var(--border-color-primary);
  border-radius: 8px;
}

@media (min-width: 768px) {
  .pinned-item {
    max-width: 552px;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
