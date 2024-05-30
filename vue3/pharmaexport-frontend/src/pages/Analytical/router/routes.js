export default [
  {
    component: () => import("../Analytics.vue"),
    name: "analytics",
    path: "/analytics",
    meta: {
      layout: "AnalyticsLayout"
    }
  },
];
