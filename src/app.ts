import "dotenv/config";
import { ROUTE } from "./core/interfaces";
import express from "express";
import mongoose from "mongoose";
import hpp from "hpp";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { Logger } from "./core/utils";
export default class App {
  public app: express.Application;
  public port: string | number;
  public production: boolean;

  constructor(routes: ROUTE[]) {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.production = process.env.NODE_ENV == "production" ? true : false;
    this.initializeRoutes(routes);
    this.connectToDatabase();
    this.initializeMiddleware();
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`Server is listening on port : ${this.port}`);
    });
  }

  private initializeMiddleware() {
    if (this.production) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(morgan("combined"));
      this.app.use(cors({ origin: "youdomain.com", credentials: true }));
    } else {
      this.app.use(morgan("dev"));
      this.app.use(cors({ origin: true, credentials: true }));
    }
  }

  private initializeRoutes(routes: ROUTE[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private connectToDatabase() {
    const connectString = process.env.MONGODB_URI;
    if (!connectString) {
      Logger.error("connectString invalid");
      return;
    } else {
      mongoose
        .connect(connectString, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        })
        .then(() => Logger.info("Database connect successfully! "))
        .catch((err) => Logger.error(err));
    }
  }
}
