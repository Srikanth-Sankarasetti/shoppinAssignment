const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const productRouter = require("./Routes/ProductRoutes");

app.use(express.json());

const limiter = rateLimit({
  windowms: 60 * 60 * 1000,
  max: 100,
  message: "to many request from this IP , please try after some time",
});

if (process.env.NODE_ENV === "devolopment") {
  app.use(morgan("dev"));
}

app.use("/", limiter);

app.use("/", productRouter);

module.exports = app;