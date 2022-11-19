import express from "express";

import controller from "./role.controller";
import roleSchems from "./role.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "role"),
  roleSchems.createRole,
  catchWrap(controller.createRole)
);

router.put(
  "/:roleId",
  canDo("update", "role"),
  roleSchems.editRole,
  catchWrap(controller.updateRole)
);

router.delete(
  "/:roleId",
  canDo("delete", "role"),
  roleSchems.deleteRole,
  catchWrap(controller.deleteRole)
);

router.get(
  "/:roleId",
  canDo("read", "role"),
  roleSchems.getRoleById,
  catchWrap(controller.getroleById)
);

router.get(
  "/",
  canDo("read", "role"),
  roleSchems.getRoles,
  catchWrap(controller.getRoles)
);

export default router;
