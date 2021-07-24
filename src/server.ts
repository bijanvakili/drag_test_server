import express from "express";
import * as http from "http";
import { ServerConfig } from "./config";

export function runServer(config: ServerConfig): void {
  const app = express();
  const server = http.createServer(app);

  app.use("/", express.static(config.webappAssetsPath));
  server.listen(config.port, () => {
    console.log(`listening on *:${config.port}`);
  });
}
