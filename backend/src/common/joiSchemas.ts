import Joi, { Schema, SchemaMap } from "joi";

export const MIN_CHARACTERS = 2;
export const MAX_CHARACTERS = 255;

export const requiredUUIDSchema = () =>
  Joi.string().uuid({ version: "uuidv4" }).required();

export const wrapSchema = (schema: SchemaMap<any>): Schema =>
  Joi.object().keys(schema).unknown();
