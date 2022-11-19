import express from "express";

import controller from "./user.controller";
import userSchems from "./user.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.get("/me", catchWrap(controller.me));

router.post(
  "/forgot-password",
  userSchems.forgotPassword,
  catchWrap(controller.forgotPassword)
);

router.post(
  "/reset-password",
  userSchems.resetPassword,
  catchWrap(controller.resetPassword)
);

router.post(
  "/register",
  userSchems.registerUser,
  catchWrap(controller.registerUser)
);

router.post("/login", userSchems.loginUser, catchWrap(controller.loginUser));

router.post(
  "/",
  canDo("create", "user"),
  userSchems.createUser,
  catchWrap(controller.createUser)
);

router.put(
  "/:userId",
  canDo("update", "user"),
  userSchems.editUser,
  catchWrap(controller.updateUser)
);

// TODO: Currently we do not allow customers to delete a user, we might need this in future
// router.delete(
//   "/:userId",
//   canDo("delete", "user"),
//   userSchems.deleteUser,
//   catchWrap(controller.deleteUser)
// );

router.get(
  "/:userId",
  canDo("read", "user"),
  userSchems.getUserById,
  catchWrap(controller.getuserById)
);

router.get(
  "/",
  canDo("read", "user"),
  userSchems.getUsers,
  catchWrap(controller.getUsers)
);

export default router;
