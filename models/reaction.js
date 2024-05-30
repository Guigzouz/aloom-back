"use strict";

module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define("Reaction", {
    reactionName: DataTypes.STRING,
    reactionImgUrl: DataTypes.STRING,
  });

  Reaction.associate = function (models) {
    models.Reaction.belongsToMany(models.UserPost, {
      through: models.UserPostReaction,
      foreignKey: "reactionId",
      otherKey: "postId",
    });
  };
  return Reaction;
};
