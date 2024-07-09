import express, { json } from "express";
import mongoose from "mongoose";
import logger from "./src/utilities/logger";
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./config/swagger.js";
import { API, HTTP_STATUS_CODES } from "./src/globals";

const morgan = require("morgan");

const app = express();

// The name of your app/service
const serviceName = "Todo-App/backend";

// The port which it should listen on
const port = API.PORT;

//Connect to database
mongoose.connect(API.DB_STRING).then(
  () => {
    logger.log("Successfully connected to DB");

    app.use(json());
    app.use(morgan("dev"));

    //Create a session for User Auth
    app.use(
      session({
        secret: API.AUTH_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 30 * 60 * 1000 } // 30 minutes
      })
    );
  
    // Swagger Endpoint
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //Add the Routes
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
