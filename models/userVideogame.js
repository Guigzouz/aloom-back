"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserVideogame = sequelize.define(
    "UserVideogame",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      videogameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Videogames",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "UserVideogames",
      timestamps: true, // Enables createdAt and updatedAt columns
    }
  );

  UserVideogame.associate = function (models) {
    UserVideogame.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    UserVideogame.belongsTo(models.Videogame, {
      foreignKey: "videogameId",
      as: "videogame",
    });
  };

  return UserVideogame;
};
