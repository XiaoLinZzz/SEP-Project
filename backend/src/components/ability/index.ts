import { AbilityBuilder, Ability } from "@casl/ability";
import { Response, Request, NextFunction } from "express";

import { userService, User, UserErrorCode } from "../../api/user";
import { CustomError } from "../errors";

const ACTIONS = ["read", "create", "update", "delete"];

const defineRulesFor = async (userObject: User) => {
  const { can, rules } = new AbilityBuilder(Ability);

  const roles = userObject?.Roles;
  if (roles && roles.length) {
    roles.forEach((role) => {
      if (role.permissions) {
        Object.keys(role.permissions).forEach((subject: any) => {
          ACTIONS.forEach((action) => {
            if (role.permissions && role.permissions[subject].actions[action]) {
              can(action, subject);
            }
          });
        });
      }
    });
  }

  return rules;
};

const defineAbilityFor = async (userObject: User) => {
  const rules = await defineRulesFor(userObject);
  return new Ability(rules);
};

export const provideAbility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the userId and companyId exists
  if (req?.auth?.userId && req?.auth?.companyId) {
    // Props
    const { userId, companyId } = req.auth;
    const props = {
      id: userId,
      company: companyId,
    };

    try {
      // Get user by id and company
      const user = await userService.getUserById(props);

      if (user.blocked) {
        throw new CustomError(401, UserErrorCode.ACCOUNT_IS_INACTIVE);
      }
      const userObject = user.toJSON() as User;

      // Create ability for this user and add it to request
      req.ability = await defineAbilityFor(userObject);
    } catch (err) {
      next(err);
    }
  }

  next();
};
