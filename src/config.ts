import * as fs from "fs";

export interface ServerConfig {
  webappAssetsPath: string;
  port: number;
  databasePath: string;
}

export const load = (path: string): ServerConfig => {
  const buffer = fs.readFileSync(path);
  return JSON.parse(buffer.toString()) as ServerConfig;
};
