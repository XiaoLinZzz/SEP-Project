import { omit as _omit } from "lodash";

import RoleModel from "./role.model";
import {
  CreateRoleProps,
  UpdateRoleProps,
  DeleteRoleProps,
  GetRoleByIdProps,
  GetRolesProps,
} from "./role.types";
import { CustomError } from "../../components/errors";
import RoleErrorCode from "./role.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { UserModel } from "../user";
import { getFilters } from "../../components/filters";

class RoleService {
  async createRole(props: CreateRoleProps) {
    // Check if role already exist
    const existingRole = await RoleModel.findOne({
      where: { name: props.name, company: props.company },
    });

    // if the role exists, throw an error
    if (existingRole) {
      throw new CustomError(409, RoleErrorCode.ROLE_ALREADY_EXISTS);
    }

    const role = await RoleModel.create(props);
    return role;
  }

  async updateRole(props: UpdateRoleProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find role by id and company
    const role = await RoleModel.findOne({ where: { id, company } });

    // if role not found, throw an error
    if (!role) {
      throw new CustomError(404, RoleErrorCode.ROLE_NOT_FOUND);
    }

    // Finally, update the role
    const [, [updatedRole]] = await RoleModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    return updatedRole;
  }

  async deleteRole(props: DeleteRoleProps) {
    // Props
    const { id, company } = props;

    // Find and delete the role by id and company
    const role = await RoleModel.destroy({ where: { id, company } });

    // If no role has been deleted, then throw an error
    if (!role) {
      throw new CustomError(404, RoleErrorCode.ROLE_NOT_FOUND);
    }

    return role;
  }

  async getRoleById(props: GetRoleByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the role by id and company
    const role = await RoleModel.findOne({
      where: { id, company },
    });

    // If no role has been found, then throw an error
    if (!role) {
      throw new CustomError(404, RoleErrorCode.ROLE_NOT_FOUND);
    }

    return role;
  }

  async getRoles(props: GetRolesProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    // Count total roles in the given company
    const count = await RoleModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
    });

    // Find all roles for matching props and company
    const data = await RoleModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include: [
        {
          model: UserModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new RoleService();
