const express = require("express");
const helmet = require("helmet");
const multer = require("multer");
const cors = require("cors");
const router = require("./router");
const morgan = require("morgan");
const compression = require("compression");
const { errorHandler } = require("./middlewares");
const app = express();

app.set("trust proxy", true);

//Middlewares
app.use(morgan("dev"));
app.use(multer().any());
app.use(compression());
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(helmet());
app.use(cors());

app.use("/api", router);
app.use(errorHandler);
module.exports = app;
