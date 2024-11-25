import { Request, Response } from "express";
import AuthService from "../services/auth.service";

export default class AuthController {
  public async registerController(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req);

      res.status(200).send({
        message: "OK",
        data: user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "NG",
        detail: err,
      });
    }
  }
}
