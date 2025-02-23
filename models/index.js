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
const Videogame = require("./videogame")(sequelize, Sequelize.DataTypes);
const UserVideogame = require("./userVideogame")(
  sequelize,
  Sequelize.DataTypes
);
const Token = require("./token")(sequelize, Sequelize.DataTypes);
const Friend = require("./friend")(sequelize, Sequelize.DataTypes);
const Group = require("./group")(sequelize, Sequelize.DataTypes);
const UserGroup = require("./userGroup")(sequelize, Sequelize.DataTypes);
const FileAttachment = require("./fileAttachment")(
  sequelize,
  Sequelize.DataTypes
);

const Reaction = require("./reaction")(sequelize, Sequelize.DataTypes);
const Tag = require("./tag")(sequelize, Sequelize.DataTypes);
const UserPost = require("./userPost")(sequelize, Sequelize.DataTypes);
const UserPostAttachment = require("./userPostAttachment")(
  sequelize,
  Sequelize.DataTypes
);
const UserPostReaction = require("./userPostReaction")(
  sequelize,
  Sequelize.DataTypes
);
console.log("heyey");
const UserPostTag = require("./userPostTag")(sequelize, Sequelize.DataTypes);

const models = {
  User,
  Token,
  Friend,
  Group,
  UserGroup,
  FileAttachment,
  Reaction,
  Tag,
  Videogame,
  UserVideogame,
  UserPost,
  UserPostAttachment,
  UserPostReaction,
  UserPostTag,
};

Object.values(models).map((model) => model.associate?.(models));
module.exports = {
  ...models,
  sequelize,
};
