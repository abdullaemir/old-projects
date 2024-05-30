import {
  storeToRefs,
} from "pinia";

import useUserStore from "~/stores/user.js";

const userLocaleParams = ({
  redirect, url,
}, to) => {
  const REDIRECT_CODE = 302;

  const userStore = useUserStore();
  const {
    user,
  } = storeToRefs(userStore);

  const firstArgument = to.path.split("/")[1];
  const secondArgument = to.path.split("/")[2];
  const isRegion = firstArgument === user.value.main_region.url;
  const isLanguage = secondArgument === user.value.language.url;

  const userPath = `${url.origin}/${user.value.main_region.url}/${user.value.language.url}`;
  const newPath = (count) => `/${to.path.split("/").slice(count, to.path.split("/").length).join("/")}`;

  if (isRegion && isLanguage) {
    return true;
  }

  if (user.value.language.list.includes(secondArgument)) {
    return redirect(userPath + newPath(3) + url.search + url.hash, REDIRECT_CODE);
  }

  if (user.value.language.list.includes(firstArgument)) {
    return redirect(userPath + newPath(2) + url.search + url.hash, REDIRECT_CODE);
  }

  if (user.value.main_region.list.includes(firstArgument)) {
    return redirect(userPath + newPath(2) + url.search + url.hash, REDIRECT_CODE);
  }

  if (!isRegion && !isLanguage) {
    return redirect(userPath + to.path + url.search + url.hash, REDIRECT_CODE);
  }

  return true;
};

export default userLocaleParams;
