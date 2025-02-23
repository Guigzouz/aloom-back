"use strict";

module.exports = (sequelize, DataTypes) => {
  const Videogame = sequelize.define("Videogame", {
    name: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    presentationImgUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gameLogoUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return Videogame;
};
