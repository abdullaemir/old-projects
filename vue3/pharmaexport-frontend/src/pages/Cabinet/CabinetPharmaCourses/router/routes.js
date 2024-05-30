export default [
  {
    component: () => import("../CabinetPharmaCourses.vue"),
    meta: {
      access: [
        "PHARMACOURSE_VIEW_EDUCATION",
        "PHARMACOURSE_VIEW_PROMO",
      ],
      layout: "CabinetLayout",
    },
    name: "cabinetPharmaCourses",
    path: "/cabinet/pharma-courses/",
  },
];
