import get from "lodash.get";
import { storeToRefs } from "pinia";

import useUserStore from "~/stores/user.js";

import metricConfig from "../../../metric.config.js";

const useIsADBlock = () => {
  const { body } = document;
  const ads = document.createElement("div");

  ads.id = "adsbygoogle";
  ads.className = "adsbox adsbygoogle banner";
  ads.textContent = "&nbsp;";
  body.appendChild(ads);

  const result = document.getElementById("adsbygoogle").offsetHeight === 0;

  if (result) {
    console.info(
      "%c%s",
      [
        "padding: 20px;",
        "color: #ffffff;",
        "background-color: #ed1e45",
      ].join(""),
      "ADBlock enabled!",
    );
  }

  body.removeChild(ads);

  return result;
};

class UseMetric {
  static style = {
    google: [
      "padding: 20px;",
      "color: #ffffff;",
      "background-color: #41Ad61",
    ],
    pixel: [
      "padding: 20px;",
      "color: #ffffff;",
      "background-color: #48629e;",
    ],
    yandex: [
      "padding: 20px;",
      "color: #ffffff;",
      "background-color: #fb3e2b;",
    ],
  };

  static consoleMessage(type, message) {
    console.info("%c%s", UseMetric.style[type].join(""), message);
  }

  static convertUserParams(user, metric) {
    const userParams = metric.userParams ?? {};

    return Object.keys(userParams).reduce((params, param) => {
      const paramValue = get(user, metric.userParams[param]) ?? null;

      if (paramValue !== null) {
        params[param] = paramValue;
      }

      return params;
    }, {});
  }

  static createScriptElement(src) {
    const { body } = document;
    const script = document.createElement("script");

    script.async = true;
    script.src = src;

    body.appendChild(script);
  }

  static initGoogle(user) {
    const config = (user.main_region ? metricConfig[user.main_region?.url]?.google : metricConfig?.google) ?? [];

    if (!config.length) {
      return;
    }

    if (import.meta.env.MODE === "production") {
      window.dataLayer = window.dataLayer ?? [];

      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };

      window.gtag("js", new Date());

      config.forEach((metric) => {
        UseMetric.createScriptElement(`https://googletagmanager.com/gtag/js?id=${metric.id}`);

        window.gtag("config", metric.id);
      });
    } else {
      UseMetric.consoleMessage("google", "Google Analytics Development Init");
    }
  }

  static initPixel(user) {
    const config = (user.main_region ? metricConfig[user.main_region?.url]?.pixel : metricConfig?.pixel) ?? [];

    if (!config.length) {
      return;
    }

    if (import.meta.env.MODE === "production") {
      window.fbq =
        window.fbq ??
        function init() {
          window.fbq.queue.push(arguments);
        };

      window._fbq = window._fbq ?? window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = "2.0";
      window.fbq.queue = window.fbq.queue ?? [];

      UseMetric.createScriptElement("https://connect.facebook.net/en_US/fbevents.js");

      config.forEach((metric) => {
        window.fbq("init", metric.id);
        window.fbq("track", "PageView");
      });
    } else {
      UseMetric.consoleMessage("pixel", "Meta Pixel Development Init");
    }
  }

  static initYandex(user) {
    const config = (user.main_region ? metricConfig[user.main_region?.url]?.yandex : metricConfig?.yandex) ?? [];

    if (!config.length) {
      return;
    }

    if (import.meta.env.MODE === "production") {
      window.ym =
        window.ym ??
        function init() {
          window.ym.a = window.ym.a ?? [];
          window.ym.a.push(arguments);
          window.ym.l = Number(new Date());
        };

      UseMetric.createScriptElement("https://mc.yandex.ru/metrika/tag.js");

      config.forEach((metric) => {
        const userParams = UseMetric.convertUserParams(user, metric);

        window.ym(metric.id, "init", {
          ...metric.params,
          ...userParams,
        });
      });
    } else {
      UseMetric.consoleMessage("yandex", "Yandex Metrika Development Init");
    }
  }

  static initMetric() {
    if (useIsADBlock()) {
      return;
    }

    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    UseMetric.initGoogle(user.value);
    UseMetric.initPixel(user.value);
    UseMetric.initYandex(user.value);
  }

  static sendGoogle(label, { type = "event", name = null, params = null } = {}) {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const config =
      (user.value.main_region ? metricConfig[user.value.main_region?.url]?.google : metricConfig?.google) ?? [];

    let currentMetric = null;

    if (name) {
      currentMetric = config.find((metric) => metric.name === name);
    } else {
      currentMetric = config.find((metric) => metric.default);
    }

    if (import.meta.env.MODE === "production") {
      if (useIsADBlock()) {
        return;
      }

      if (params) {
        window.gtag(type, label, params);
      } else {
        window.gtag(type, label);
      }
    } else {
      let message = `Google Analytics: ${currentMetric.id}. Goal id: ${label}. Type: ${type}.`;

      if (params) {
        message += ` Params: ${JSON.stringify(params)}.`;
      }

      UseMetric.consoleMessage("google", message);
    }
  }

  static sendYandex(label, { type = "reachGoal", name = null, params = null } = {}) {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const config =
      (user.value.main_region ? metricConfig[user.value.main_region?.url]?.yandex : metricConfig?.yandex) ?? [];

    let currentMetric = null;

    if (name) {
      currentMetric = config.find((metric) => metric.name === name);
    } else {
      currentMetric = config.find((metric) => metric.default);
    }

    if (import.meta.env.MODE === "production") {
      if (useIsADBlock()) {
        return;
      }

      if (params) {
        window.ym(currentMetric.id, type, label, params);
      } else {
        window.ym(currentMetric.id, type, label);
      }
    } else {
      let message = `Yandex Metrika: ${currentMetric.id}. Goal id: ${label}. Type: ${type}.`;

      if (currentMetric.userParams) {
        const userParams = UseMetric.convertUserParams(user.value, currentMetric);

        message += ` User Params: ${JSON.stringify(userParams)}.`;
      }

      if (params) {
        message += ` Params: ${JSON.stringify(params)}.`;
      }

      UseMetric.consoleMessage("yandex", message);
    }
  }

  static sendYandexEcommerce(params) {
    if (import.meta.env.MODE === "production") {
      if (useIsADBlock()) {
        return;
      }

      window.dataLayer = window.dataLayer ?? [];

      window.dataLayer.push({
        ecommerce: params,
      });
    } else {
      const message = `Yandex Metrika Ecommerce: ${JSON.stringify(params)}.`;

      UseMetric.consoleMessage("yandex", message);
    }
  }
}

export default UseMetric;
