import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Role, CreateRoleProps } from "./role.types";

class RoleModel<
    ModelAttributes = Role,
    ModelCreationAttributes = CreateRoleProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Role
{
  name!: Role["name"];
  description!: Role["description"];
  permissions!: Role["permissions"];
  company!: Role["company"];
  Company: Role["Company"];
}

modelManager.init(
  "Role",
  RoleModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    permissions: {
      type: Sequelize.JSONB,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "roles",
  }
);

export default RoleModel;
