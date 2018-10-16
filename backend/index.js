require("dotenv").config();

const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bearerToken = require("express-bearer-token");

const port = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(require("./force-ssl"));
app.use("/api", bearerToken());
app.use("/api", cookieParser());
app.use("/api", bodyParser.json());
app.use("/api", require("./context"));
app.use("/api", require("./api"));

app.listen(port, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`> Ready on http://localhost:${port}`);
});

module.exports = app;