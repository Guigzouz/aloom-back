"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    countryKey: DataTypes.STRING,
  });

  User.associate = function (models) {
    User.hasMany(models.Token, {
      foreignKey: "userId",
      constraints: true,
      as: "tokens",
    });
    User.belongsToMany(models.Group, {
      through: models.UserGroup,
      foreignKey: "userId",
      otherKey: "groupId",
    });
  };

  return User;
};
