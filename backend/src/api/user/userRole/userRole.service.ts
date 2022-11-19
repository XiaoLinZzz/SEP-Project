import UserRoleModel from "./userRole.model";
import {
  CreateBulkUserRoleProps,
  UpdateBulkUserRoleProps,
  DeleteBulkUserRoleProps,
} from "./userRole.types";

class UserRoleService {
  async createBulkUserRole(props: CreateBulkUserRoleProps) {
    const createProps = props.roles.map((role) => ({
      user: props.user,
      role,
    }));
    const userRole = await UserRoleModel.bulkCreate(createProps);
    return userRole;
  }

  async updateBulkUserRole(props: UpdateBulkUserRoleProps) {
    // Delete all the esiting roles for the given user
    await this.deleteBulkUserRole({ user: props.user });

    // Then assign the new roles to the user
    const userRole = await this.createBulkUserRole(props);
    return userRole;
  }

  async deleteBulkUserRole(props: DeleteBulkUserRoleProps) {
    const { user } = props;
    await UserRoleModel.destroy({
      where: {
        user,
      },
    });
  }
}

export default new UserRoleService();
