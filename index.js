import express, { json } from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import session from "express-session";
import morgan from "morgan";
import logger from "./src/utilities/logger.js";
import swaggerSpec from "./src/utilities/swagger.js";
import { API, HTTP_CODES } from "./src/globals.js";
import routes from "./src/routes/routes.js";

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
        cookie: { maxAge: 60 * 60 * 1000 }, // 30 minutes
      })
    );

    // Swagger Endpoint
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //Add the Routes
    app.use(routes);

    // health check at root
    app.get("/", (req, res) => {
      if (mongoose.connection.readyState === 1) {
        return res.status(200).send(serviceName);
      }

      res.status(HTTP_CODES.SERVER_ERROR).send(serviceName);
    });

    app.listen(port, () =>
      logger.log(`${serviceName} listening on port ${port}`)
    );
  },
  (err) => logger.log("Error connecting to DB", err)
);
