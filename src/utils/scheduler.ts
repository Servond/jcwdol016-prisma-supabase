import cron from "node-cron";
import AuthService from "../services/auth.service";

cron.schedule("* * * * *", async () => {
  await AuthService.updateExpiredUser();
  console.log("Cron run every 1 minute");
});
