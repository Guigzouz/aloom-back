"use strict";
// PIVOT TABLE

module.exports = (sequelize, DataTypes) => {
  const UserPostReaction = sequelize.define("UserPostReaction", {
    reactionId: {
      type: DataTypes.INTEGER,
      references: { model: "Reactions", key: "id" },
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

  return UserPostReaction;
};
