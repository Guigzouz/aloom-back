"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserPost = sequelize.define("UserPost", {
    content: DataTypes.TEXT,
  });

  UserPost.associate = function (models) {
    UserPost.belongsTo(models.User, {
      foreignKey: "authorId",
      as: "author", // Changed 'userPost' to 'author' for clarity
    });

    UserPost.belongsTo(models.FileAttachment, {
      foreignKey: "fileAttachmentId",
      as: "fileAttachment",
    });

    UserPost.belongsToMany(models.Tag, {
      through: models.UserPostTag,
      foreignKey: "postId",
      otherKey: "tagId",
    });

    UserPost.belongsToMany(models.Reaction, {
      through: models.UserPostReaction,
      foreignKey: "postId",
      otherKey: "reactionId",
    });
  };

  return UserPost;
};
