import keys from "../server/keys";

export default function ({ $axios, redirect, store, i18n }) {
  if (process.server) {
    $axios.interceptors.response.eject();
  } else {
    $axios.defaults.baseURL = "/api";
  }

  $axios.interceptors.request.use((request) => {
    console.log(keys);

    const token = keys.token ?? null;

    if (token) {
      request.headers.common.Authorization = `Bearer ${token}`;
    }

    return request;
  });

  $axios.onError((error) => {
    if (error.response?.data) {
      return error.response.data;
    }
  });
}
