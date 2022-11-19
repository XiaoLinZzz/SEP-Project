import { RoleModel } from "../../api/role";
import { UserModel } from "../../api/user";
import { CompanyModel } from "../../api/company";

export default {
  initialize() {
    initializeRoleModelAssociations();
    initializeUserModelAssociations();
  },
};

function initializeRoleModelAssociations() {
  RoleModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  RoleModel.belongsToMany(UserModel, {
    through: "users_roles",
    foreignKey: "role",
  });
}

function initializeUserModelAssociations() {
  UserModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  UserModel.belongsToMany(RoleModel, {
    through: "users_roles",
    foreignKey: "user",
  });
}
