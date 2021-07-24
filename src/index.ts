import { env } from "process";
import { load as loadConfig } from "./config";
import { init } from "./models";
import { runServer } from "./server";

(async () => {
  const configPath = env["DRAG_TEST_CONFIG"];
  if (!configPath) {
    throw new Error(`Unable to load config: ${configPath}`);
  }
  const config = loadConfig(configPath);

  await init(config.databasePath);

  console.log("Starting server...");

  runServer(config);
})();
