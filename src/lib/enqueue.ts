import Queue from "bull";
import { transporter } from "./mail";
import path from "path";
import handlebars, { template } from "handlebars";
import fs from "fs";

interface IJobData {
  email: string;
  subject: string;
  body: string;
}

const userStatusQueue = new Queue("User Status", {
  redis: {
    host: "localhost",
    port: 6378,
  },
});

userStatusQueue.process(({ data }: { data: IJobData }) => {
  const templatePath = path.join(
    __dirname,
    "../templates",
    "register-mail.hbs"
  );
  const templateSource = fs.readFileSync(templatePath, "utf-8");
  const compiledTemplate = handlebars.compile(templateSource);
  const html = compiledTemplate({
    email: data.email,
    subject: data.subject,
    body: data.body,
  });

  transporter.sendMail({
    to: data.email,
    subject: data.subject,
    html,
  });
});

export default userStatusQueue;
