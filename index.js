import mongoose from "mongoose";
import { API, HTTP_STATUS_CODES } from "./src/globals";
import logger from "./src/utilities/logger";
const morgan = require("morgan");
const express = require("express");
const app = express();

// The name of your app/service
const serviceName = "Todo-App/backend";

// The port which it should listen on
const port = API.PORT;

mongoose.connect(API.DB_STRING).then(
  () => {
    logger.log("Successfully connected to DB");

    app.use(express.json());
    app.use(morgan("dev"));

    require("./src/routes")(app);

    // health check at root
    app.get("/", (req, res) => {
      if (mongoose.connection.readyState === 1) {
        return res.send(serviceName);
      }

      res.status(HTTP_STATUS_CODES.SERVER_ERROR).send(serviceName);
    });

    app.listen(port, () =>
      logger.log(`${serviceName} listening on port ${port}!`)
    );
  },
  (err) => logger.log("Error connecting to DB", err)
);
