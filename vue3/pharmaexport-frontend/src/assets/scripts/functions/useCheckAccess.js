import get from "lodash.get";
import { storeToRefs } from "pinia";

import PERMISSIONS from "~/constants/permissions.js";
import useUserStore from "~/stores/user.js";

const useCheckAccess = (access) => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  if (Array.isArray(access)) {
    for (let i = 0; i < access.length; i++) {
      let isAccess = get(user.value, PERMISSIONS[access[i]]);

      if (typeof isAccess === "undefined") {
        isAccess = false;
      }

      if (isAccess) {
        return true;
      }
    }

    return false;
  }

  let isAccess = get(user.value, PERMISSIONS[access]);

  if (typeof isAccess === "undefined") {
    isAccess = false;
  }

  return isAccess;
};

const useCheckIsAdminAccess = (access) => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  if (access !== "administrator") {
    return true;
  }

  return Boolean(access === "administrator" && user.value.is_admin_account);
};

export { useCheckIsAdminAccess };
export default useCheckAccess;
