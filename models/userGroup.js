"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define("UserGroup", {
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "Users", key: "id" },
    },
    groupId: {
      type: DataTypes.STRING,
      references: {
        model: "Groups",
        key: "id",
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return UserGroup;
};
