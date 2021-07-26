import express from "express";
import * as http from "http";
import { Server as IOServer } from "socket.io";

import { ServerConfig } from "./config";
import { Vertex, VertexAttributes } from "./models";

export function runServer(config: ServerConfig): void {
  const app = express();
  const server = http.createServer(app);
  const io = new IOServer(server);

  app.use("/", express.static(config.webappAssetsPath));

  io.on("connection", async (socket) => {
    console.log("a user connected");

    socket.on("vertex_update", async (data: VertexAttributes) => {
      console.log(`saving vertex: ${data.id}`);
      try {
        await Vertex.upsert(data);
      } catch (e) {
        console.error(`Failed to save vertex: ${e}`);
      }
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    // query and send all the known vertices
    const vertices = await Vertex.findAll();
    socket.emit(
      "vertices",
      vertices.map((v) => v.toJSON())
    );
  });

  server.listen(config.port, () => {
    console.log(`listening on *:${config.port}`);
  });
}
