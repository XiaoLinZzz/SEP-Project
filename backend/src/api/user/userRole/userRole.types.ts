import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { User } from "../../user";
import { Role } from "../../role";

export interface UserRole extends DefaultSchemaConfig {
  user: User["id"];
  role: Role["id"];
}

export interface CreateBulkUserRoleProps {
  user: UserRole["user"];
  roles: UserRole["role"][];
}

export interface UpdateBulkUserRoleProps extends CreateBulkUserRoleProps {}

export interface DeleteBulkUserRoleProps {
  user: UserRole["user"];
}
