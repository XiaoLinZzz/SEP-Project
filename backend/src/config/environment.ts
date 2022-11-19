import { forEach as _forEach } from "lodash";
import dotenv from "dotenv";
import { ProcessDotEnv } from "./environment.types";
import environmentSchema from "./environment.schema";
import environmentConstants from "./environment.constants";

// const logger = logService.getLogger('Environment Variable Initialisation');

dotenv.config();
let typedProcessDotEnv = {};

process.env.NODE_ENV || (process.env.NODE_ENV = "development");

if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "migration") {
  const envVars = process.env;

  //   logger.info('Initialising with environment variables', Object.keys(envVars));

  const envVarJoi = environmentSchema.validate(envVars, {
    allowUnknown: true,
    abortEarly: false,
    stripUnknown: true,
  });

  if (envVarJoi.error) {
    throw new Error(envVarJoi.error.message);
  }

  let { value: validatedVars } = envVarJoi;
  // Add services to env
  _forEach(environmentConstants.services, (value, key) => {
    validatedVars = {
      ...validatedVars,
      [key]: process.argv.includes(`--${value}`),
    };
  });

  //   logger.info('Validated environment variables', Object.keys(validatedVars));

  typedProcessDotEnv = validatedVars;
}

export default typedProcessDotEnv as ProcessDotEnv;
