import useCheckAccess from "~/assets/scripts/functions/useCheckAccess.js";
import useUserStore from "~/stores/user.js";

const access = (currentAccess) => {
  const userStore = useUserStore();
  const { user } = userStore;

  let redirectParams = null;
  let status = 200;

  if (!useCheckAccess(currentAccess)) {
    status = user.id ? 403 : 401;
  }

  switch (status) {
    case 401: {
      redirectParams = {
        name: "index",
        query: {
          modal: "login",
        },
      };

      /*
       * TODO: Не открывается модальное окно авторизации, если это произошло на главной (пример - юзер меню)
       * TODO: Добавить ошибку 401
       *
       */

      break;
    }

    case 403: {
      redirectParams = {
        name: "forbidden",
      };

      break;
    }

    default: {
      break;
    }
  }

  return redirectParams;
};

export default access;
