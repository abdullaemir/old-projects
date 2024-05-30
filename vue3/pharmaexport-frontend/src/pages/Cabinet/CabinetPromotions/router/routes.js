export default [
  {
    component: () => import("../CabinetPromotions.vue"),
    meta: {
      access: [
        "PROMOTIONS_VIEW_BUYER",
        "PROMOTIONS_VIEW_SELLER",
      ],
      layout: "CabinetLayout",
    },
    name: "cabinetPromotions",
    path: "/cabinet/promotions",
  },
];
