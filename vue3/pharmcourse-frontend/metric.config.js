const metricConfig = {
  eu: {
    google: [
      {
        default: true,
        id: "G-YL815Y5JDQ",
        name: "Google EU",
      },
    ],
    pixel: [
      {
        default: true,
        id: 779159299753774,
        name: "Pixel EU",
      },
    ],
    yandex: [
      {
        default: true,
        id: 86863892,
        name: "Yandex EU",
        params: {
          webvisor: true,
        },
        userParams: null,
      },
    ],
  },
  mena: {
    google: [
      {
        default: true,
        id: "G-S65HDD96CZ",
        name: "Google Mena",
      },
    ],
    pixel: [
      {
        default: true,
        id: 246267059770225,
        name: "Pixel Mena",
      },
    ],
    yandex: [
      {
        default: true,
        id: 55454251,
        name: "Yandex Mena",
        params: {
          webvisor: true,
        },
        userParams: null,
      },
    ],
  },
};

export default metricConfig;
