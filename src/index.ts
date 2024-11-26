import Server from "./server";
import "./utils/scheduler";

function main() {
  const app = new Server();
  app.start();
}

main();
