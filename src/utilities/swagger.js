import swaggerJSDoc from "swagger-jsdoc";
import { API } from "../globals.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo-App API",
      version: "1.0.0",
      description: "This is a simple CRUD (Create, Read, Update, Delete) API for Todo's in the Todo App."
    },
    servers: [
      {
        url: `http://localhost:${API.PORT}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
