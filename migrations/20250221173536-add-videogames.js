"use strict";
const app = require("../models/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log("Syncing Videogame model...");
      await app.Videogame.sync();

      console.log("Syncing UserVideogame model...");
      await app.UserVideogame.sync();
    } catch (error) {
      console.error("Error during migration:", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      console.log("Dropping UserVideogame table...");
      await queryInterface.dropTable("UserVideogames");

      console.log("Dropping Videogame table...");
      await queryInterface.dropTable("Videogames");
    } catch (error) {
      console.error("Error during rollback:", error);
      throw error;
    }
  },
};
