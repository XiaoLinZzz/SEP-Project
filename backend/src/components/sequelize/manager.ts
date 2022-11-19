import Sequelize from "sequelize";
import sequelize from "../../config/sequelize";

export interface DefaultSchemaConfig {
  id: string;
  created: Date;
  updated: Date;
}

export interface ParanoidSchemaConfig extends DefaultSchemaConfig {
  deleted?: Date;
}

export class CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  extends Sequelize.Model<ModelAttributes, ModelCreationAttributes>
  implements DefaultSchemaConfig
{
  public id!: DefaultSchemaConfig["id"];
  public readonly created!: DefaultSchemaConfig["created"];
  public readonly updated!: DefaultSchemaConfig["updated"];
  public readonly deleted?: ParanoidSchemaConfig["deleted"];

  public static readOnlyMode?: () => typeof CommonSequelizeModel;

  public toPlainObject() {
    return this.get({
      plain: true,
    });
  }
}

function init(
  name: string,
  model: typeof CommonSequelizeModel,
  attributes: Sequelize.ModelAttributes,
  options: Partial<Sequelize.InitOptions>
) {
  if (!attributes.id) {
    attributes.id = {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    };
  }

  const writeOptions: Sequelize.InitOptions = {
    createdAt: "created",
    updatedAt: "updated",
    deletedAt: "deleted",
    sequelize: sequelize,
    modelName: name,
    ...options,
  };

  model.init(attributes, writeOptions);
}

export default {
  init,
};
