export default [
  {
    component: () => import("../CabinetHR.vue"),
    meta: {
      access: "HR_VIEW",
      layout: "CabinetLayout",
    },
    name: "cabinetHR",
    path: "/cabinet/hr",
  },
  {
    component: () => import("../CabinetHRlistVacancies.vue"),
    meta: {
      access: "HR_VIEW",
      layout: "CabinetLayout",
    },
    name: "cabinetHRvacancies",
    path: "/cabinet/hr/vacancies",
  },
  {
    component: () => import("../CabinetHRCreate.vue"),
    meta: {
      access: "HR_VIEW",
      layout: "CabinetLayout",
    },
    name: "CabinetHRCreate",
    path: "/cabinet/hr/create",
  },
];
