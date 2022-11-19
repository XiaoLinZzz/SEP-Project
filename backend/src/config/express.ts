import { Express } from "express";
import bodyParser from "body-parser";
import compressionMiddleware from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import sequelize from "./sequelize";
import config from "../config/environment";
import router from "../router";
import { handleErrorMiddleware } from "../components/errors";
import modelsAssociations from "../components/sequelize/model.associations";
import joiErrorMiddleware from "../components/joi/middleware";
import rateLimitMiddleware from "../components/rateLimiter";

export default function (app: Express) {
  // TODO: Currently, allowing all CROS requests
  // const allowedHeaders = config.CORS_ORIGIN.split(",");
  // const corsOptions = {
  //   allowedHeaders,
  // };
  const morganConfig = `:method :url (:response-time ms) :status`;

  // Test DB
  sequelize
    .authenticate()
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error: " + err));

  app.use(rateLimitMiddleware);
  app.use(helmet());
  app.use(morgan(morganConfig));
  app.use(compressionMiddleware());
  app.use(cors()); //TODO: Currently, allowing all CROS requests
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: ["json", "+json"] }));

  app.use((req, res, next) => {
    res.header("Cache-Control", "private, no-cache");
    next();
  });

  modelsAssociations.initialize();

  app.use((config.URL_PREFIX || "") + "/", router);

  app.use(joiErrorMiddleware); // <--Always apply this before handleErrorMiddleware
  app.use(handleErrorMiddleware);

  return app;
}
