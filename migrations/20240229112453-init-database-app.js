"use strict";
const app = require("../models/index");

module.exports = {
  async up(queryInterface, Sequelize) {
    await app.FileAttachment.sync();
    await app.User.sync();
    await app.Token.sync();
  },

  async down(queryInterface, Sequelize) {
    await app.User.drop();
    await app.Token.drop();
  },
};
