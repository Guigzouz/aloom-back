"use strict";

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define("Tag", {
    tagTitle: DataTypes.STRING,
  });

  Tag.associate = function (models) {
    models.Tag.belongsToMany(models.UserPost, {
      through: models.UserPostTag,
      foreignKey: "tagId",
      otherKey: "postId",
    });
  };
  return Tag;
};
