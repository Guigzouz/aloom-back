"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserPost = sequelize.define("UserPost", {
    replyToUserPostId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });

  UserPost.associate = function (models) {
    UserPost.belongsTo(models.User, {
      foreignKey: "authorId",
      as: "author",
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

    // **Self-referential association for replies**
    UserPost.hasMany(models.UserPost, {
      foreignKey: "replyToUserPostId",
      as: "replies", // Alias for related posts
    });

    UserPost.belongsTo(models.UserPost, {
      foreignKey: "replyToUserPostId",
      as: "parentPost", // Optional: to get the parent post
    });
  };

  return UserPost;
};
