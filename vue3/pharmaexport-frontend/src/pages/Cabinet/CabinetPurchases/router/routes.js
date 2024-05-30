export default [
  {
    children: [
      {
        children: [
          {
            components: {
              inn: () => import("../pages/CabinetPurchasesInn.vue"),
            },
            name: "cabinetPurchasesInn",
            path: "inn",
          },
          {
            components: {
              ctd: () => import("../pages/CabinetPurchasesCtd.vue"),
            },
            name: "cabinetPurchasesCtd",
            path: "ctd",
          },
          {
            components: {
              api: () => import("../pages/CabinetPurchasesApi.vue"),
            },
            name: "cabinetPurchasesApi",
            path: "api",
          },
        ],
        component: () => import("../pages/CabinetPurchases.vue"),
        name: "cabinetPurchases",
        path: "/cabinet/purchases",
      },
      {
        component: () => import("../pages/CabinetPurchasesUpload.vue"),
        meta: {
          access: ["PURCHASES_VIEW_BUTTON_UPLOAD"],
        },
        name: "CabinetPurchasesUpload",
        path: "upload",
      },
    ],
    component: () => import("../pages/CabinetPurchasesIndex.vue"),
    meta: {
      access: [
        "PURCHASES_VIEW_BUYER",
        "PURCHASES_VIEW_SELLER",
      ],
      layout: "CabinetLayout",
    },
    path: "/cabinet/purchases",
  },
];
