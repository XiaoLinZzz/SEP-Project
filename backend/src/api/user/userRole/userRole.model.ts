import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import { UserRole, CreateBulkUserRoleProps } from "./userRole.types";

class UserRoleModel<
    ModelAttributes = UserRole,
    ModelCreationAttributes = CreateBulkUserRoleProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements UserRole
{
  user!: UserRole["user"];
  role!: UserRole["role"];
}

modelManager.init(
  "UserRole",
  UserRoleModel,
  {
    user: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    role: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: false, // <-- We are setting to false because of the update functionality of this Model
    tableName: "users_roles",
  }
);

export default UserRoleModel;
