"use strict";

module.exports = (sequelize, DataTypes) => {
  const FileAttachment = sequelize.define("FileAttachment", {
    pathUrl: DataTypes.STRING,
  });

  FileAttachment.associate = function (models) {
    FileAttachment.hasMany(models.User, {
      foreignKey: "fileAttachmentId",
      as: "users", // Alias for the association
    });
  };

  return FileAttachment;
};
