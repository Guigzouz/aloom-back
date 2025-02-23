"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    phoneNumberDialCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    countryKey: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileAttachmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
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
      as: "fileAttachment",
    });

    // ✅ Add this association to fix the error
    User.belongsToMany(models.Videogame, {
      through: models.UserVideogame,
      foreignKey: "userId",
      otherKey: "videogameId",
      as: "videogames",
    });

    User.hasMany(models.UserVideogame, {
      foreignKey: "userId",
      as: "userVideogames",
    });
  };

  return User;
};
