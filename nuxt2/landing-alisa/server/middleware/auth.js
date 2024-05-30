
const keys = require("../keys");

module.exports = async function (req, res, next) {
  const authStr = req.headers.authorization ?? null;

  if (req.path.indexOf("/api") === 0) {
    if (authStr !== `Bearer ${keys.token}`) {
      res.status(403).send("Доступ закрыт");

      return;
    }
  }

  next();
};
