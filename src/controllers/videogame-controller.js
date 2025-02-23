const { Videogame, User, UserVideogame } = require("../../models");

const getVideogames = async (req, res) => {
  try {
    const videogames = await Videogame.findAll({
      order: [["id", "ASC"]],
    });

    if (!videogames) {
      res.status(400).json({ message: "No videogames found ", request: req });
    }

    res.status(201).json({
      message: "videogames found",
      videogames: videogames,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getVideogamesAvailablePlayers = async (req, res) => {
  try {
    const { videogameId } = req.params;

    if (!videogameId) {
      return res.status(400).json({ message: "Missing videogameId parameter" });
    }

    const players = await User.findAll({
      include: [
        {
          model: UserVideogame,
          as: "userVideogames", // ✅ Matches alias in User.js
          where: { videogameId: videogameId },
          attributes: [],
        },
      ],
      attributes: ["id", "firstName", "lastName", "email", "nickname"],
    });

    if (!players.length) {
      return res
        .status(404)
        .json({ message: "No players found for this game" });
    }

    res.status(200).json({ message: "Players found", players });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  getVideogames,
  getVideogamesAvailablePlayers,
};
