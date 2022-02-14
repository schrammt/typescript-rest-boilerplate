"use strict";
import "reflect-metadata";
import dotenv from "dotenv";
import express, { Request, Response, Express } from "express";
import { userRouter } from "./routes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { logger } from "express-winston";
import winston from "winston";

dotenv.config();

const app: Express = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.cli()
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      expressFormat: true,
}));
const PORT: String | Number = process.env.PORT || 5000;
const swaggerJsdocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Typescript-Rest-Boilerplate",
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

(async () => {
  try {
    console.log("RUN");

    app.get("/", (req: Request, res: Response) => {
      res.json({ message: `Welcome to the home page!` });
    });

    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use("/api/v1/user", userRouter);

    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
