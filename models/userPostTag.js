"use strict";
// PIVOT TABLE

module.exports = (sequelize, DataTypes) => {
  const UserPostTag = sequelize.define("UserPostTag", {
    tagId: {
      type: DataTypes.INTEGER,
      references: { model: "Tags", key: "id" },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "UserPosts",
        key: "id",
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return UserPostTag;
};
