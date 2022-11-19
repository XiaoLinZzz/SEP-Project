import { Response, Request, NextFunction } from "express";
import { ForbiddenError } from "@casl/ability";

import { CustomError } from "../errors";

type Action = "read" | "create" | "update" | "delete";
type Subject = "user" | "role" | "company";

export const canDo = (action: Action, subject: Subject) => {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.ability) {
      ForbiddenError.from(req.ability).throwUnlessCan(action, subject);
    } else {
      throw new CustomError(401, "INVALID_AUTH_TOKEN");
    }
    next();
  };
};
