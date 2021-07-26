import { access } from "fs/promises";
import { Sequelize, Model, DataTypes, Optional } from "sequelize";

// Vertex PDS
export interface VertexAttributes {
  id: string;
  position_x: number;
  position_y: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VertexCreationAttributes extends Optional<VertexAttributes, "id"> {}

// Vertex model
export class Vertex extends Model<VertexAttributes, VertexCreationAttributes> implements VertexAttributes {
  public id!: string;
  public position_x!: number;
  public position_y!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// helper function to determine if a file exists
const fileExists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

// initializes the models and underlying database
export const init = async (databasePath: string): Promise<void> => {
  const databaseExisted = await fileExists(databasePath);
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: databasePath,
  });
  Vertex.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      position_x: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      position_y: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "vertex",
    }
  );

  await Vertex.sync();
  if (!databaseExisted) {
    await Vertex.bulkCreate(generateInitialData());
  }
};

const radius = 25;
const diameter = radius * 2;
const margin = radius * 1.5;
const innerNodePadding = radius * 2;

// generates the initial model data
const generateInitialData = (): VertexCreationAttributes[] => {
  const vertices = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const id = `${i * 3 + j + 1}`;
      vertices.push({
        id,
        position_x: margin + i * (diameter + innerNodePadding),
        position_y: margin + j * (diameter + innerNodePadding),
      });
    }
  }

  return vertices;
};
