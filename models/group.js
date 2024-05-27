"use strict";

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
    adminId: DataTypes.INTEGER,
    groupName: DataTypes.STRING,
    groupDescription: DataTypes.TEXT,
    groupImageUrl: DataTypes.STRING,
  });

  Group.associate = function (models) {
    models.Group.belongsToMany(models.User, {
      through: models.UserGroup,
      foreignKey: "groupId",
      otherKey: "userId",
    });
  };

  return Group;
};
