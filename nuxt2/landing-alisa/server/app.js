const bodyParser = require("body-parser");
const express = require("express");

const keys = require("./keys");
const auth = require("./middleware/auth");
const telegaRoutes = require("./routes/telega.routes");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

app.use(auth);

app.use("/api/telega", telegaRoutes);

module.exports = app;
