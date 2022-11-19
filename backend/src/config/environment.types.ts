export interface ProcessDotEnv {
  BASE_URL: string;
  PORT: number;
  URL_PREFIX: string;

  CORS_ORIGIN: string;

  DATABASE_NAME: string;
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;

  TOKEN_KEY: string;
  TOKEN_EXPIRY: string;
}
