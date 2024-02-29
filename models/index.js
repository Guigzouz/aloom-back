"use strict";

const Sequelize = require("sequelize");
const { app } = require("../config/sequelize-postgres");

const sequelize = new Sequelize(app.url, app);

try {
  sequelize.authenticate();
  console.log("Connection to the database has been established.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const User = require("./user")(sequelize, Sequelize.DataTypes);
const Token = require("./token")(sequelize, Sequelize.DataTypes);

const models = {
  User,
  Token,
};

Object.values(models).map((model) => model.associate?.(models));
module.exports = {
  ...models,
  sequelize,
};
