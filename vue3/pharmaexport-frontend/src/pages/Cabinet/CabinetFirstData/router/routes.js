export default [
  {
    component: () => import("../CabinetFirstData.vue"),
    meta: {
      access: "FIRST_DATA_VIEW",
      layout: "CabinetLayout",
    },
    name: "cabinetFirstData",
    path: "/cabinet/first-data",
  },
];
