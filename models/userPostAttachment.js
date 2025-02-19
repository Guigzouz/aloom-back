"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserPostAttachment = sequelize.define(
    "UserPostAttachment",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userPostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "UserPosts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      fileAttachmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "FileAttachments",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "UserPostAttachments",
      timestamps: true, // Enables createdAt and updatedAt columns
    }
  );

  UserPostAttachment.associate = function (models) {
    UserPostAttachment.belongsTo(models.UserPost, {
      foreignKey: "userPostId",
      as: "post",
    });

    UserPostAttachment.belongsTo(models.FileAttachment, {
      foreignKey: "fileAttachmentId",
      as: "attachment",
    });
  };

  return UserPostAttachment;
};
