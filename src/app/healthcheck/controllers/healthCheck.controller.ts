import express, { Request, Response } from "express";

export class HealthCheckController {
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/healthcheck", this.healthCheck);
  }

  public async healthCheck(req: Request, res: Response): Promise<void> {
    res.status(200).send("OK");
  }
}
