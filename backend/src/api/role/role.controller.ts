import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import roleService from "./role.service";

class RoleController {
  async createRole(req: Request, res: Response) {
    const bodyParams = _pick(req.body, ["name", "description", "permissions"]);
    const props = {
      company: req.auth.companyId,
      ...bodyParams,
    };

    const role = await roleService.createRole(props);

    res.status(200).json(role);
  }

  async updateRole(req: Request, res: Response) {
    const { roleId } = req.params;
    const bodyParams = _pick(req.body, ["name", "description", "permissions"]);
    const props = {
      id: roleId,
      company: req.auth.companyId,
      ...bodyParams,
    };

    const role = await roleService.updateRole(props);

    res.status(200).json(role);
  }

  async deleteRole(req: Request, res: Response) {
    const { roleId } = req.params;
    const props = {
      id: roleId,
      company: req.auth.companyId,
    };

    await roleService.deleteRole(props);

    res.status(204).json();
  }

  async getroleById(req: Request, res: Response) {
    const { roleId } = req.params;
    const props = {
      id: roleId,
      company: req.auth.companyId,
    };

    const role = await roleService.getRoleById(props);

    res.status(200).json(role);
  }

  async getRoles(req: Request, res: Response) {
    const queryParams = _pick(req.query, [
      "page",
      "pageSize",
      "sort",
      "where",
    ]) as any;

    const props = {
      company: req.auth.companyId,
      ...queryParams,
    };

    const roles = await roleService.getRoles(props);

    res.status(200).json(roles);
  }
}

export default new RoleController();
