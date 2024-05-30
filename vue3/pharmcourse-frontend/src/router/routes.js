const routes = [];
const routesFiles = import.meta.globEager("./../pages/**/router/routes.js");

for (const route in routesFiles) {
  if (Object.prototype.hasOwnProperty.call(routesFiles, route)) {
    routes.push(...routesFiles[route].default);
  }
}

const setLocaleParamsAliases = (route) => {
  for (const routeParam in route) {
    if (Object.prototype.hasOwnProperty.call(route, routeParam)) {
      if (routeParam === "alias") {
        route[routeParam] = `/:location/:language${route[routeParam]}`;
      } else if (typeof route[routeParam] === "object") {
        setLocaleParamsAliases(route[routeParam]);
      }
    }
  }
};

routes.map((route) => {
  if (route?.path) {
    route.path = route.path.charAt(0) === "/" ? route.path.slice(1) : route.path;
  }

  setLocaleParamsAliases(route);

  return route;
});

export default [
  {
    children: [
      ...routes,
      {
        component: () => import("../pages/404NotFound.vue"),
        name: "notFound",
        path: "/:location/:language/:pathMatch(.*)",
      },
    ],
    path: "/:location/:language/",
  },
  {
    component: () => import("../pages/404NotFound.vue"),
    path: "/:pathMatch(.*)",
  },
];
