import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const loginUserSchema = wrapSchema({
  body: Joi.object().keys({
    email: Joi.string().required().trim(),
    password: Joi.string().required(),
  }),
});

const registerUserSchema = wrapSchema({
  body: Joi.object().keys({
    companyName: Joi.string().required().trim(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().trim(),
    password: Joi.string().required(),
  }),
});

const forgotPasswordSchema = wrapSchema({
  body: Joi.object().keys({
    email: Joi.string().required().trim(),
  }),
});

const resetPasswordSchema = wrapSchema({
  body: Joi.object().keys({
    id: Joi.string().required(),
    password: Joi.string().required(),
    resetPasswordToken: Joi.string().required(),
  }),
});

const createUserSchema = wrapSchema({
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().trim(),
    password: Joi.string().required(),
    blocked: Joi.boolean().required(),
    roles: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
  }),
});

const editUserSchema = wrapSchema({
  params: Joi.object().keys({
    userId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().trim(),
    password: Joi.string(),
    blocked: Joi.boolean(),
    roles: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
  }),
});

const deleteUserSchema = wrapSchema({
  params: Joi.object().keys({
    userId: requiredUUIDSchema(),
  }),
});

const getUserByIdSchema = wrapSchema({
  params: Joi.object().keys({
    userId: requiredUUIDSchema(),
  }),
});

const getUserSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  loginUser: joiMiddleware(loginUserSchema),
  registerUser: joiMiddleware(registerUserSchema),
  forgotPassword: joiMiddleware(forgotPasswordSchema),
  resetPassword: joiMiddleware(resetPasswordSchema),
  createUser: joiMiddleware(createUserSchema),
  editUser: joiMiddleware(editUserSchema),
  deleteUser: joiMiddleware(deleteUserSchema),
  getUserById: joiMiddleware(getUserByIdSchema),
  getUsers: joiMiddleware(getUserSchema),
};
