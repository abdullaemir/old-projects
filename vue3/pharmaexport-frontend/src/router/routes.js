const routes = [];
const routesFiles = import.meta.globEager("./../pages/**/router/routes.js");

for (const route in routesFiles) {
  if (Object.prototype.hasOwnProperty.call(routesFiles, route)) {
    routes.push(...routesFiles[route].default);
  }
}

export default [
  {
    component: () => import("../pages/404NotFound.vue"),
    name: "notFound",
    path: "/:pathMatch(.*)",
  },
  {
    component: () => import("../pages/403Forbidden.vue"),
    name: "forbidden",
    path: "/forbidden",
  },
  ...routes,
];
