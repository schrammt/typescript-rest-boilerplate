"use strict";
import "reflect-metadata";
import dotenv from "dotenv";
import express, { Request, Response, Express } from "express";
import { userRouter } from "./routes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { ConnectionOptions, createConnection } from "typeorm";
import { User } from "./entity";
import { Database } from "./db/db";

dotenv.config();

const app: Express = express();
const PORT: String | Number = process.env.PORT || 5000;
const swaggerJsdocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
    host: `localhost:${PORT}`, // Host (optional)
    basePath: '/api/v1', // Base path (optional)
    servers: [
        {
          url: `http://localhost:${PORT}/api/v1`,
          description: 'Development server',
        },
      ],
  },

  apis: ["**/*.ts"], // files containing annotations as above
};

const swaggerDocument = swaggerJsdoc(swaggerJsdocOptions);
console.log(swaggerDocument);



(async () => {
  try {
    console.log("RUN");

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.get("/", (req: Request, res: Response) => {
      res.json({ message: `Welcome to the home page!` });
    });

    app.use("/api/v1/user", userRouter);

    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
