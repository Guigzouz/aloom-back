"use strict";
const app = require("../models/index");

module.exports = {
  async up(queryInterface, Sequelize) {
    await app.User.sync();
  },
};
