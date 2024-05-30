const consola = require("consola");
const express = require("express");
const { Nuxt, Builder } = require("nuxt");

const config = require("../nuxt.config.js");

const app = require("./app");

config.dev = !(process.env.NODE_ENV === "production");

async function start() {
  const devApi = process.env.DEV_API ?? 0;

  if (devApi == 1) {
    const host = process.env.HOST || "127.0.0.1";
    const port = process.env.PORT || 3000;

    app.listen(port, host, () => {
      consola.ready({
        badge: true,
        message: `Server listening on http://${host}:${port}`,
      });
    });
  } else {
    const nuxt = new Nuxt(config);

    const { host = process.env.HOST || "127.0.0.1",
      port = process.env.PORT || 3000 } = nuxt.options.server;

    if (config.dev) {
      const builder = new Builder(nuxt);

      await builder.build();
    }

    app.use(nuxt.render);

    app.listen(port, host, () => {
      consola.ready({
        badge: true,
        message: `Server listening on http://${host}:${port}`,
      });
    });
  }
}
start();
