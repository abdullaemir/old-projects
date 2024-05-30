export default [
  {
    children: [
      {
        access: "MY_PROFILE_CHANGE_EMAIL",
        component: () => import("../CabinetProfile.vue"),
        name: "cabinetProfileChangeEmail",
        path: "change-email",
      },
      {
        component: () => import("../CabinetProfile.vue"),
        name: "cabinetProfileChangePassword",
        path: "change-password",
      },
    ],
    component: () => import("../CabinetProfile.vue"),
    meta: {
      access: "MY_PROFILE_VIEW",
      layout: "CabinetLayout",
    },
    name: "cabinetProfile",
    path: "/cabinet/profile/",
  },
];
