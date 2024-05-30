export default [
  {
    children: [
      {
        component: () => import("../pages/CabinetMyPaymentMethods.vue"),
        name: "cabinetMyPaymentsMethods",
        path: "",
      },
      {
        component: () => import("../pages/CabinetMyPaymentMethods.vue"),
        name: "cabinetMyPaymentMethod",
        path: ":id",
      },
      {
        component: () => import("../pages/CabinetMyPaymentMethodsForm.vue"),
        name: "cabinetMyPaymentMethodEdit",
        path: ":id/edit",
      },
      {
        component: () => import("../pages/CabinetMyPaymentMethodsForm.vue"),
        name: "cabinetMyPaymentMethodCreate",
        path: "create",
      },
    ],
    component: () => import("../CabinetMyPaymentMethods.vue"),
    meta: {
      access: "MY_PAYMENTS_VIEW",
      layout: "CabinetLayout",
    },
    path: "/cabinet/my-payments-methods/",
  },
];
