import { UseFetch, useTokenStore } from "@pg/helpers";

import {
  CHANGE_FORGOT_PASSWORD_URL,
  CONFIRM_EMAIL_URL,
  CONFIRM_CHANGE_EMAIL_URL,
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  REFRESH_URL,
  REGISTRATION_URL,
  SEND_CONFIRM_EMAIL_URL,
  CHECK_PASSWORD_RESET_TOKEN_URL,
} from "~/constants/urls.js";
import useUserStore from "~/stores/user.js";

class Auth {
  static async registration(userCredential) {
    const userStore = useUserStore();
    const tokenStore = useTokenStore();
    const result = await UseFetch.post(REGISTRATION_URL, userCredential);

    tokenStore.setToken(result);
    await userStore.setUser();

    return result;
  }

  static async login(userCredential) {
    const userStore = useUserStore();
    const tokenStore = useTokenStore();
    const result = await UseFetch.post(LOGIN_URL, userCredential);

    tokenStore.setToken(result);
    await userStore.setUser();

    return result;
  }

  static async logout() {
    const userStore = useUserStore();
    const tokenStore = useTokenStore();
    const refreshToken = tokenStore.getRefreshToken();

    tokenStore.resetStore();
    await userStore.resetStore();

    return UseFetch.delete(REFRESH_URL, {
      refresh_token: refreshToken,
    });
  }

  static confirmEmail(token) {
    return UseFetch.post(CONFIRM_EMAIL_URL, {
      token,
    });
  }

  static confirmChangeEmail(token) {
    return UseFetch.post(CONFIRM_CHANGE_EMAIL_URL, {
      token,
    });
  }

  static checkPasswordResetToken(token) {
    return UseFetch.post(CHECK_PASSWORD_RESET_TOKEN_URL, {
      token,
    });
  }

  static forgotPasswordSendEmail(userCredential) {
    return UseFetch.post(FORGOT_PASSWORD_URL, userCredential);
  }

  static forgotPasswordChange(userCredential) {
    return UseFetch.post(CHANGE_FORGOT_PASSWORD_URL, userCredential);
  }

  static sendConfirmEmail() {
    return UseFetch.post(SEND_CONFIRM_EMAIL_URL);
  }
}

export default Auth;
