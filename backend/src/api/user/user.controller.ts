import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import userService from "./user.service";

class UserController {
  async me(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      id: req.auth.userId,
    };

    const user = await userService.me(props);

    res.status(200).json(user);
  }

  async loginUser(req: Request, res: Response) {
    const props = _pick(req.body, ["email", "password"]);

    const user = await userService.loginUser(props);

    res.status(200).json(user);
  }

  async registerUser(req: Request, res: Response) {
    const props = _pick(req.body, [
      "companyName",
      "firstName",
      "lastName",
      "email",
      "password",
    ]);

    const user = await userService.registerUser(props);

    res.status(200).json(user);
  }

  async forgotPassword(req: Request, res: Response) {
    const props = {
      email: req.body.email,
    };

    const user = await userService.forgotPassword(props);

    res.status(200).json(user);
  }

  async resetPassword(req: Request, res: Response) {
    const props = {
      ...req.body,
    };

    const user = await userService.resetPassword(props);

    res.status(200).json(user);
  }

  async createUser(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const user = await userService.createUser(props);

    res.status(200).json(user);
  }

  async updateUser(req: Request, res: Response) {
    const { userId } = req.params;

    const props = {
      id: userId,
      company: req.auth.companyId,
      ...req.body,
    };

    const user = await userService.updateUser(props);

    res.status(200).json(user);
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req.params;
    const props = {
      id: userId,
      company: req.auth.companyId,
    };

    await userService.deleteUser(props);

    res.status(204).json();
  }

  async getuserById(req: Request, res: Response) {
    const { userId } = req.params;
    const props = {
      id: userId,
      company: req.auth.companyId,
    };

    const user = await userService.getUserById(props);

    res.status(200).json(user);
  }

  async getUsers(req: Request, res: Response) {
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

    const users = await userService.getUsers(props);

    res.status(200).json(users); // TODO: How is .json working on array of objects?
  }
}

export default new UserController();
