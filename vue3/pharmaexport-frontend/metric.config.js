const metricConfig = {
  google: [
    {
      default: true,
      id: "G-JY2X3HB06Q",
      name: "Google YallaRx",
    },
  ],
  yandex: [
    {
      default: true,
      id: 89696638,
      name: "Yandex YallaRx",
      params: {
        accurateTrackBounce: true,
        clickmap: true,
        ecommerce: true,
        trackLinks: true,
        webvisor: true,
      },
      userParams: {
        UserID: "id",
      },
    },
  ],
};

export default metricConfig;
