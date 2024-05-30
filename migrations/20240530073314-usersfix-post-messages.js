"use strict";
const app = require("../models/index");

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log("Starting migration...");

    try {
      console.log("Syncing FileAttachment model...");
      await app.FileAttachment.sync();

      console.log("Syncing User model...");
      await app.User.sync({ alter: true });

      console.log("Syncing other models...");
      await app.Reaction.sync();
      await app.Tag.sync();
      await app.UserPost.sync();
      await app.UserPostTag.sync();
      await app.UserPostReaction.sync();

      console.log("Migration completed.");
    } catch (error) {
      console.error("Error during migration:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    console.log("Reverting migration...");
    try {
      await queryInterface.dropAllTables();
      console.log("All tables dropped.");
    } catch (error) {
      console.error("Error during reverting migration:", error);
    }
  },
};
