import express from "express";

import controller from "./company.controller";
import companySchems from "./company.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.put(
  "/",
  canDo("update", "company"),
  companySchems.editMyCompany,
  catchWrap(controller.updateMyCompany)
);

router.get(
  "/",
  // canDo("read", "company"), TODO: Every user need to make a GET request
  catchWrap(controller.getMyCompany)
);

export default router;
