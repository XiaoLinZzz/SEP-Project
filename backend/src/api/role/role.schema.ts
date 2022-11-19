import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createRoleSchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow("", null),
    permissions: Joi.object(),
  }),
});

const editRoleSchema = wrapSchema({
  params: Joi.object().keys({
    roleId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow("", null),
    permissions: Joi.object(),
  }),
});

const deleteRoleSchema = wrapSchema({
  params: Joi.object().keys({
    roleId: requiredUUIDSchema(),
  }),
});

const getRoleByIdSchema = wrapSchema({
  params: Joi.object().keys({
    roleId: requiredUUIDSchema(),
  }),
});

const getRoleSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createRole: joiMiddleware(createRoleSchema),
  editRole: joiMiddleware(editRoleSchema),
  deleteRole: joiMiddleware(deleteRoleSchema),
  getRoleById: joiMiddleware(getRoleByIdSchema),
  getRoles: joiMiddleware(getRoleSchema),
};
