import express from "express";

import authMiddleware from "../components/auth";
import { provideAbility } from "../components/ability";
import { userRoutes } from "../api/user";
import { roleRoutes } from "../api/role";
import { companyRoutes } from "../api/company";
const router = express.Router();
router.use(authMiddleware); // TODO: may be we can move this to express config file
router.use(provideAbility);

router.use("/user", userRoutes);
router.use("/role", roleRoutes);
router.use("/company", companyRoutes);

export default router;
