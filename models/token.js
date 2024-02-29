"use strict";

module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define("Token", {
    userId: DataTypes.INTEGER,
    authToken: DataTypes.STRING,
  });

  Token.associate = function (models) {
    Token.belongsTo(models.User, {
      foreignKey: "userId",
      constraints: true,
      as: "user",
    });
  };

  return Token;
};
