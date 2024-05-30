"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    nickname: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    phoneNumber: DataTypes.BIGINT,
    phoneNumberDialCode: DataTypes.INTEGER,
    countryKey: DataTypes.STRING,
    fileAttachmentId: DataTypes.INTEGER,
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
    User.belongsTo(models.FileAttachment, {
      foreignKey: "fileAttachmentId",
      as: "fileAttachment", // Alias for the association
    });
  };

  return User;
};
