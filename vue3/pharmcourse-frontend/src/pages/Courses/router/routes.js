export default [
  {
    component: () => import("../CourseItem/CourseItem.vue"),
    name: "courseItem",
    path: "/courses/:slug",
  },
];
