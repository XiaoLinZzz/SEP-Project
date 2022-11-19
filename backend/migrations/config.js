require("dotenv").config();

const { DATABASE_NAME, DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD } =
  process.env;

module.exports = {
  development: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    port: 5432,
    dialect: "postgres",
  },
  production: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    port: 5432,
    dialect: "postgres",
  },
};
