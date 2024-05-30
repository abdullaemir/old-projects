import userLocaleParams from "./userLocaleParams.js";
import useUtm from "./useUtm.js";

const middlewares = (context) => {
  context.router.beforeEach(async (to, _, next) => {
    const nextUrl = null;

    await useUtm(to);

    if (!context.isClient) {
      userLocaleParams(context, to);
    }

    return nextUrl ? next(nextUrl) : next();
  });
};

export default middlewares;
