import { Request, Response, NextFunction } from "express";
import Joi, { Schema, ValidationOptions } from "joi";

const defaultJoiOptions = {};

const joiExpressMiddleware =
  (schema: Schema, defaultJoiOptions: ValidationOptions) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error, value: joiReq } = schema.validate(req, defaultJoiOptions);

    if (error) {
      next(error);
      return;
    }

    req.headers = joiReq.headers;
    req.params = joiReq.params;
    req.query = joiReq.query;
    req.cookies = joiReq.cookies;
    req.signedCookies = joiReq.signedCookies;
    req.body = joiReq.body;

    next();
  };

export const joiMiddleware =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    return joiExpressMiddleware(schema, defaultJoiOptions)(req, res, next);
  };

type LoggerCallback = (err: Joi.ValidationError, req: Request) => void;
type ResponseCallback = (
  err: Joi.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const joiErrorLogger = (err: Joi.ValidationError, req: Request) => {
  const { name, message, stack } = err;

  // TODO: Add error logger
  // logger.error(
  //   {
  //     sc: { rquid: req.rquid },
  //     name,
  //     message,
  //     stack,
  //   },
  //   'validation error',
  // );
};

const joiExpressErrorMiddleware =
  (loggerCallback?: LoggerCallback, responseCallback?: ResponseCallback) =>
  (
    err: Joi.ValidationError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (err.name === "ValidationError" && err.isJoi) {
      const { name, message } = err;

      if (loggerCallback instanceof Function) {
        loggerCallback(err, req);
      }
      if (responseCallback instanceof Function) {
        return responseCallback(err, req, res, next);
      }
      res.status(400).send({ statusCode: 400, name, message });
    } else {
      next(err);
    }
  };

export default joiExpressErrorMiddleware(joiErrorLogger);
