import { Request } from "express";
import prisma from "../lib/prisma";
import milliseconds from "milliseconds";
import userStatusQueue from "../lib/enqueue";

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

  static async updateExpiredUser() {
    try {
      await prisma.user.updateMany({
        where: {
          expired_date: {
            lte: new Date(),
          },
          status: "pending",
        },
        data: {
          status: "inactive",
        },
      });
    } catch (err) {
      throw err;
    }
  }

  static async register(req: Request) {
    try {
      const { first_name, last_name, email, password } = req.body;

      const isEmail = await this.findUserByEmail(email);

      if (isEmail) throw new Error("Email already exist");

      const t = await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.create({
          data: {
            first_name,
            last_name,
            email,
            password,
            expired_date: new Date(
              new Date().getTime() + milliseconds.minutes(1)
            ),
            status: "pending",
          },
        });

        await userStatusQueue.add(
          {
            email: user.email,
            subject: "Registration",
            body: "Thanks for joining us",
          },
          { delay: milliseconds.seconds(20) }
        );

        return user;
      });

      return t;
    } catch (err) {
      throw err;
    }
  }
}
