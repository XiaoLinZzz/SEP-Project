import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";

export interface Role extends DefaultSchemaConfig {
  name: string;
  description?: string;
  permissions?: Record<string, any>; // TODO: Remove this any
  company: Company["id"];
  Company?: Company;
}

export interface CreateRoleProps {
  name: Role["name"];
  description?: Role["description"];
  permissions?: Role["permissions"];
  company: Role["company"];
}

export interface UpdateRoleProps extends CreateRoleProps {
  id: Role["id"];
}

export interface DeleteRoleProps {
  id: Role["id"];
  company: Role["company"];
}

export interface GetRoleByIdProps extends DeleteRoleProps {}

export interface GetRolesProps extends QueryParams {
  company: Role["company"];
}
