"use strict";
const app = require("../models/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // rm useless relationship
      console.log("Syncing UserPost model...");
      await app.UserPost.sync({ alter: true });

      console.log("Syncing UserPostAttachment model...");
      await app.UserPostAttachment.sync();
    } catch (error) {
      console.error("Error during migration:", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      console.log("Re-adding fileAttachmentId column to UserPosts...");
      await queryInterface.addColumn("UserPosts", "fileAttachmentId", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "FileAttachments",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });

      console.log("Dropping UserPostAttachment table...");
      await queryInterface.dropTable("UserPostAttachments");
    } catch (error) {
      console.error("Error during reverting migration:", error);
      throw error;
    }
  },
};
