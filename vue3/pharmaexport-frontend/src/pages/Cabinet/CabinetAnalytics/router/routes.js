export default [
  {
    component: () => import("../CabinetAnalytics.vue"),
    meta: {
      access: [
        "ANALYTICS_VIEW_DISTRIBUTION",
        "ANALYTICS_VIEW_PM",
      ],
      layout: "CabinetLayout",
    },
    name: "cabinetAnalytics",
    path: "/cabinet/analytics",
  },
];
