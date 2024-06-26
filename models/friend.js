"use strict";

module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define("Friend", {
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER,
    isRequestPending: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN,
    isBlocked: DataTypes.BOOLEAN,
  });

  Friend.associate = function (models) {
    models.User.belongsToMany(models.User, {
      through: Friend,
      as: "friend",
      foreignKey: "userId",
      otherKey: "friendId",
      constraints: true,
    });
  };

  return Friend;
};
