import { init, Vertex } from "./models";

(async () => {
  await init();

  await Vertex.create({
    id: "3_1",
    position_x: 1,
    position_y: 2,
  });

  console.log("Vertex was saved to the database");
})();
