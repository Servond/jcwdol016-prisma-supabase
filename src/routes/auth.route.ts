import { Router } from "express";
import AuthController from "../controllers/auth.controller";

export default class AuthRoute {
  private router;
  private auth = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post("/register", this.auth.registerController);
  }

  public getRoute() {
    return this.router;
  }
}
