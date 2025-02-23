"use strict";

const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../helpers/jwt-helper");
const {
  getVideogames,
  getVideogamesAvailablePlayers,
} = require("../controllers/videogame-controller");

router.get("/", getVideogames);
router.get("/:videogameId/players", getVideogamesAvailablePlayers);

module.exports = router;
