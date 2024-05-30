const ACCESS_URL = "/api/auth/access-token";
const CHANGE_FORGOT_PASSWORD_URL = "/api/auth/change-password";
const CHECK_PASSWORD_RESET_TOKEN_URL = "/api/auth/check-password-reset-token";
const CONFIRM_EMAIL_URL = "/api/auth/confirm-email";
const CONFIRM_CHANGE_EMAIL_URL = "/api/auth/confirm-change-email";
const FILE_UPLOAD_URL = "/api/file/upload";
const FORGOT_PASSWORD_URL = "/api/auth/remind";
const GET_LOCALE_URL = "/api/locale/get";
const LOGIN_URL = "/api/auth/login";
const REFRESH_URL = "/api/auth/refresh-token";
const REGISTRATION_URL = "/api/auth/registration";
const SEND_CONFIRM_EMAIL_URL = "/api/auth/send-email-confirm";

// TODO: Не нравится, что функция
const BASE_URL = () => import.meta.env.VITE_BASE_URL;
const STORAGE_URL = () => import.meta.env.VITE_STORAGE_URL;

export {
  ACCESS_URL,
  BASE_URL,
  CHANGE_FORGOT_PASSWORD_URL,
  CHECK_PASSWORD_RESET_TOKEN_URL,
  CONFIRM_EMAIL_URL,
  CONFIRM_CHANGE_EMAIL_URL,
  FILE_UPLOAD_URL,
  FORGOT_PASSWORD_URL,
  GET_LOCALE_URL,
  LOGIN_URL,
  REFRESH_URL,
  REGISTRATION_URL,
  SEND_CONFIRM_EMAIL_URL,
  STORAGE_URL,
};
