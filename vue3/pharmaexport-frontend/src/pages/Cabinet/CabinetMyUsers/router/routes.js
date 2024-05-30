export default [
  {
    children: [
      {
        component: () => import("../pages/CabinetMyUsers.vue"),
        name: "cabinetMyUsers",
        path: "",
      },
      {
        component: () => import("../pages/CabinetMyUsersInvite.vue"),
        name: "cabinetMyUsersInvite",
        path: "invite",
      },
    ],
    component: () => import("../CabinetMyUsers.vue"),
    meta: {
      access: "MY_USERS_VIEW",
      layout: "CabinetLayout",
    },
    name: "cabinetMyUsersIndex",
    path: "/cabinet/my-users",
  },
];
