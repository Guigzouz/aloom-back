const { User } = require("../../models");

const getUserInformations = async (req, res) => {
  try {
    const userInformations = await User.findOne({
      where: { id: req.params.userId },
    });

    if (!userInformations) {
      res
        .status(400)
        .json({ message: "No user found under this id", request: req });
    }

    res.status(201).json({
      message: "user informations found",
      userInformations: userInformations,
    });
    return;
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  getUserInformations,
};
