"use strict";
const app = require("../models/index");

module.exports = {
  async up(queryInterface, Sequelize) {
    await app.Friend.sync();
    await app.Group.sync();
    await app.UserGroup.sync();
  },

  async down(queryInterface, Sequelize) {
    await app.UserGroup.drop();
    await app.Group.drop();
    await app.Friend.drop();
  },
};
