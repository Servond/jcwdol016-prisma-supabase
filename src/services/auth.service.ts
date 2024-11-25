import { Request } from "express";
import prisma from "../lib/prisma";

export default class AuthService {
  static async findUserByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      return user;
    } catch (err) {
      throw err;
    }
  }

  static async register(req: Request) {
    try {
      const { first_name, last_name, email, password } = req.body;

      const isEmail = await this.findUserByEmail(email);

      if (isEmail) throw new Error("Email already exist");

      const user = await prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          password,
        },
      });

      return user;
    } catch (err) {
      throw err;
    }
  }
}
