import { config } from "dotenv";
config({
  path: ".env",
});

export const { PORT, NODEMAILER_EMAIL, NODEMAILER_PASS } = process.env;
