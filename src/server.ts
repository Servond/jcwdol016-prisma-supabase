import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { PORT } from "./config/envConfig";
import { createClient } from "redis";
import prisma from "./lib/prisma";

import AuthRoute from "./routes/auth.route";

export default class Server {
  private app: Application;
  private port: number | string;
  private client = createClient();

  constructor() {
    this.app = express();
    this.port = PORT || 8000;
    this.middlewares();
    this.redisServer();
    this.routes();
  }

  private async redisServer() {
    await this.client
      .on("error", (err) => {
        console.log("Error Redis");
      })
      .connect();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
  }

  private routes() {
    this.app.get("/api", async (req: Request, res: Response) => {
      const cache = await this.client.get("user");
      if (cache) {
        res.status(200).send({
          message: "From redis",
          data: JSON.parse(cache),
        });
      } else {
        const data = await prisma.user.findMany();
        await this.client.set("user", JSON.stringify(data), {
          EX: 20,
        });
        res.status(200).send({
          message: "Not Redis",
          data,
        });
      }
    });
    this.app.use("/auth", new AuthRoute().getRoute());
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}
