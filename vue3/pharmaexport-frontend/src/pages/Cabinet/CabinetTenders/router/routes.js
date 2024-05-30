export default [
  {
    children: [
      {
        component: () => import("../pages/CabinetTenders.vue"),
        name: "cabinetTenders",
        path: "",
      },
      {
        component: () => import("../pages/CabinetTender.vue"),
        name: "cabinetTender",
        path: ":number",
      },
      {
        component: () => import("../pages/CabinetTendersStart.vue"),
        meta: {
          access: "TENDERS_VIEW_BUYER",
        },
        name: "cabinetTendersStart",
        path: "start",
      },
      {
        component: () => import("../pages/CabinetTendersUpload.vue"),
        meta: {
          access: "TENDERS_VIEW_SELLER",
        },
        name: "cabinetTendersUpload",
        path: "upload",
      },
    ],
    component: () => import("../CabinetTenders.vue"),
    meta: {
      access: [
        "TENDERS_VIEW_BUYER",
        "TENDERS_VIEW_SELLER",
      ],
      layout: "CabinetLayout",
    },
    path: "/cabinet/tenderx/",
  },
];
