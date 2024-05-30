import access from "./access.js";

const middlewares = (context) => {
  context.router.beforeEach(async (to, _, next) => {
    let nextUrl = null;

    if (to.meta.access) {
      nextUrl = await access(to.meta.access);
    }

    return nextUrl ? next(nextUrl) : next();
  });
};

export default middlewares;
