
const keyDev = require("./keys.dev");
const keyProd = require("./keys.prod");

if (process.env.NODE_ENV === "production") {
  module.exports = keyProd;
} else {
  const keys = keyProd;

  for (const i in keyDev) {
    keys[i] = keyDev[i];
  }

  module.exports = keys;
}
