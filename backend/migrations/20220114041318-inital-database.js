"use strict";

const fs = require("fs");
const path = require("path");

const upScript = fs.readFileSync(
  path.join(__dirname, "dumps", "initial_database_up.sql")
);
const downScript = fs.readFileSync(
  path.join(__dirname, "dumps", "initial_database_down.sql")
);

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(String(upScript));
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(String(downScript));
  },
};
