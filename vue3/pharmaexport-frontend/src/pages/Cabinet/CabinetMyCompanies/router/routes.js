export default [
  {
    children: [
      {
        component: () => import("../pages/CabinetMyCompanies.vue"),
        name: "cabinetCompanies",
        path: "",
      },
      {
        component: () => import("../pages/CabinetMyCompanies.vue"),
        name: "cabinetCompany",
        path: ":id",
      },
      {
        component: () => import("../pages/CabinetMyCompaniesForm.vue"),
        name: "cabinetCompanyEdit",
        path: ":id/edit",
      },
      {
        component: () => import("../pages/CabinetMyCompaniesForm.vue"),
        name: "cabinetCompanyCreate",
        path: "create",
      },
    ],
    component: () => import("../CabinetMyCompanies.vue"),
    meta: {
      access: "MY_COMPANIES_VIEW",
      layout: "CabinetLayout",
    },
    path: "/cabinet/my-companies/",
  },
];
