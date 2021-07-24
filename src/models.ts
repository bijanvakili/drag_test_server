import { Sequelize, Model, DataTypes, Optional } from "sequelize";

interface VertexAttributes {
  id: string;
  position_x: number;
  position_y: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VertexCreationAttributes extends Optional<VertexAttributes, "id"> {}

export class Vertex extends Model<VertexAttributes, VertexCreationAttributes> implements VertexAttributes {
  public id!: string;
  public position_x!: number;
  public position_y!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const init = async (databasePath: string): Promise<void> => {
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
};
